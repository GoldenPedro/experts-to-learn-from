require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const http = require('http');
// const mongoose = require('mongoose');
const { MongoClient, ObjectID } = require('mongodb');
var cors = require('cors')
// const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const { info } = require('console');


const URI = process.env.MONGO_URI;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(passport.initialize());


async function data(callback){
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

      try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await callback(client);

      } catch (e) {
        // Catch any errors
        console.error(e);
        throw new Error('Unable to Connect to Database')
      }
    }

  data(async (client) => {
    const users = await client.db('mydatabase').collection('users');
    const experts = await client.db('mydatabase').collection('experts');
    const categories = await client.db('mydatabase').collection('categories');
    const details = await client.db('mydatabase').collection('details');

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
      users.findOne({ _id: new ObjectID(id) }, (err, doc) => {
        if (err) return console.log(err);
        done(null, doc);
      });
    });

    passport.use(new LocalStrategy({
      usernameField: 'email',   
      passwordField: 'password'
    },
      function (username, password, done) {
        users.findOne({ email: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (password !== user.password) { return done(null, false); }
          return done(null, user);
        });
      }
    ));


    function addCategory(category) {
      categories.findOne({ name: category }, function (err, key) {
        if (err) {
          return;
        } else if (key) {
          return; 
        } else {
          categories.insertOne({name: category}, (err, doc) => {
              return;
          });
        }
      });
    }

    // function automaticUpvote(body, expert) {
    //    for (var [key, value] of Object.entries(body)) {
    //       if (key !== "name" && key !== "user" ) {
  
    //         var info = {
    //           id: expert,
    //           field: key,
    //           tag : Object.values(value)[0]
    //         }
            
    //         field = info.field.concat(".$.rating");
    //         subfield = Object.keys(value)[0]
  
    //         users.updateOne({ _id: new ObjectID(body.user)},{
    //           $addToSet: {
    //               ["upvotes"]: info
    //           }}, (err,result) => {
    //           if (err) {
    //             experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
    //               $inc: {
    //                 [field]: -1
    //               }
    //             })
    //           }
    //         });
    //       }
    //     }
    //   }
    
    app.post("/api/users", (req, res, next) => {
      // const hash = bcrypt.hashSync(req.body.password, 12);
      users.findOne({ email: req.body.email }, function (err, email) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        } else if (email) {
          return res.status(300).json({
            message: "email already exist"
          });
        } else {
          users.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
              return res.status(500).json({
                err: err
              });
            } else if (user) {
              return res.status(300).json({
                message: "user already exist"
              });
            } else {
              users.insertOne({ email: req.body.email, username: req.body.username, password: req.body.password }, (err, doc) => {
                if (err) {
                  return res.status(500).json({
                    err: err
                  });
                } else {
                     const token = jwt.sign({id: req.body.email}, process.env.SESSION_SECRET)
                     return res.status(200).json({
                      token: token,
                      id: doc["ops"][0]["_id"],
                      user: doc["ops"][0]["username"]
                    });
                }
              });
            }
          });
        }
      });
    });
    
    app.post("/api/login", (req, res) => {
      passport.authenticate('local' ,(err, user, info) => {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        else{
          if (user) {
            const token = jwt.sign({id: req.body.email}, process.env.SESSION_SECRET)
            return res.status(200).json({
              token: token,
              id: user._id,
              user: user.username
            });
          }
          else{
            return res.status(200).json({
              user: req.body.email
            });
          }
        }
      })(req, res);
    });

    app.post("/api/NewExpert", (req, res) => {
      // experts.findOne({ name: req.body.name }, function (err, expert) {
      //   if (err) {
      //     return res.status(500).json({
      //       err: err
      //     });
          
      //   } else if (expert) {
      //     return res.status(200).json({
      //       message: "This expert already exist"
      //     })

      //   } else {

      for (var [key, value] of Object.entries(req.body)) {
        if (key == "descriptions" || key == "twitterLinks" || key == "youtubeChannels"  || key == "blogs" ) {
          details.insertOne(value, (err,doc)=>{
            // if (err) {
            //   return res.status(500).json({
            //     err: err
            //   });
            value["_id"] = doc["ops"][0]["_id"].toString()
          })
        }
      }

          experts.insertOne(
            {
              name: req.body.name, descriptions: [req.body.descriptions], twitterLinks: [req.body.twitterLinks], 
              youtubeChannels: [req.body.youtubeChannels], blogs: [req.body.blogs], articles: [], bookRecommendations: [], tweets: [], videos: [],
              quotes: [], categories: [req.body.categories]
            }, (err, doc) => {
            if (err) {
              return res.status(500).json({
                err: err
              });
            } else {
              addCategory(req.body.categories.category)

              for (var [key, value] of Object.entries(req.body)) {

                if (key !== "name" && key !== "user" ) {
                  

                  if (key == "categories") {
                    var info = {
                      id: doc["ops"][0]["_id"].toString(),
                      field: key,
                      tag : Object.values(value)[0]
                    }
                  }
                  else{
                    var info = {
                      id: doc["ops"][0]["_id"].toString(),
                      field: key,
                      tag : Object.values(value)[0],
                      expertdetailid: Object.values(value)[2].toString()
                    }
                  }
                     
                  field = info.field.concat(".$.rating");
                  subfield = info.field.concat("." + Object.keys(value)[0])

                  users.updateOne({ _id: new ObjectID(req.body.user)},{
                    $addToSet: {
                        ["upvotes"]: info
                    }}, (err,result) => {
                    if (err) {
                      //TODO update this to use id
                      experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                        $inc: {
                          [field]: -1
                        }
                      })
                    }
                  });
                }
              }

              return res.status(200).json({
                message: "expert has been added"
              })
            }
          });
      //   }
      // });
    });
    

    app.get("/api/expertlist/:category", (req, res) => {
      experts.find({'categories.category': req.params.category}).sort({"categories.rating": -1}).toArray(function(err, expert) {  
        if (err) {
          return res.status(500).json({
            err: err
          });  
        }
        else{
          return res.status(200).json(expert);
        }
      })
  });

    app.post("/api/categories", (req, res) => {
      categories.find().toArray(function(err, category) {
        if (err) {
            return res.status(500).json({
              err: err
            });
        }
        else{
          var name = []
          category.forEach(element => {
            if (element.name.startsWith(req.body.category.toLowerCase())){
              name.push(element.name)
            }
         });
          return res.status(200).json(name);
        }
      });
    });


    app.get("/api/getexpert/:id", (req, res) => {
      try {
        experts.findOne({ _id: new ObjectID(req.params.id)}, function (err, expert) {
          if (err) {
            return res.status(500).json({
              err: err
            });  
          }
          else{
            return res.status(200).json(expert);
          }
        });
      }
      catch(err) {
        return res.status(500).json({
          err: err
        });  
      } 
    });


    app.post("/api/addexpertdetails/", (req, res) => {

      details.insertOne(req.body.value, (err,doc)=>{
        // if (err) {
        //   return res.status(500).json({
        //     err: err
        //   });
        req.body.value["_id"] = doc["ops"][0]["_id"].toString()
      })
  
      experts.updateOne({ _id: new ObjectID(req.body.id)}, {$push: {[req.body.name]: req.body.value}}, function(err, expert){
        if (err) {
          return res.status(500).json({
            err: err
          });  
        }
        else{

          
          // if (req.body.name == "categories") {
          //   var info = {
          //     id: req.body.id,
          //     field: req.body.name,
          //     tag :  Object.values(req.body.value)[0]
          //   }
          // }
          // else{
          //   var info = {
          //     id: req.body.id,
          //     field: req.body.name,
          //     tag :  Object.values(req.body.value)[0],
          //     expertdetailid: Object.values(req.body.value)[2].toString()
          //   }
          // }

          var info = {
            id: req.body.id,
            field: req.body.name,
            tag :  Object.values(req.body.value)[0]
          }
          
          field = info.field.concat(".$.rating");
          subfield = info.field.concat("." + Object.keys(req.body.value)[0])

          users.updateOne({ _id: new ObjectID(req.body.userid)},{
            $addToSet: {
                ["upvotes"]: info
            }}, (err,result) => {
            if (err) {
              experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                $inc: {
                  [field]: -1
                }
              })
            }
          });

          return res.status(200).json(expert);
        }
      });
    });
    
    app.post("/api/vote/", (req, res) => {
      
      // if (req.body.field == "categories") {
      //   var info = {
      //     id: req.body.expertid,
      //     field: req.body.field,
      //     tag: req.body.tag
      //   }
      // }
      // else{
      //   var info = {
      //     id: req.body.expertid,
      //     field: req.body.field,
      //     tag: req.body.tag,
      //     expertdetailid: req.body.expertdetailid
      //   }
      // }

      var info = {
        id: req.body.expertid,
        field: req.body.field,
        tag : req.body.tag
      }

      field = info.field.concat(".$.rating");
      subfield = info.field.concat("." + req.body.subfield)
      

      if (req.body.votetype === "") {
        users.updateOne({ _id: new ObjectID(req.body.userid)},{
          $pull: {
            "downvotes" : info
          }}, (err,result) => {
            if (result.modifiedCount > 0) {
              experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                $inc: {
                    [field]: 1
                }
              });
            }
            else{
              users.updateOne({ _id: new ObjectID(req.body.userid)},{
                $pull: {
                  "upvotes": info
                }}, (err, result) => {
                  if (result.modifiedCount > 0) {
                    experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                      $inc: {
                        [field]: -1
                      }
                    });
                  }
                });
            }
         });
      }

      counterInc = 0; 
      voterType = "";

      if (req.body.votetype === "upvote") {
        voterType = "upvotes"
        users.updateOne({ _id: new ObjectID(req.body.userid)},{
          $pull: {
            "downvotes" : info
          }}, (err,result) => {

          // if (result.modifiedCount > 0) {
          //     counterInc = 2;
          // }
          // else{
              counterInc = 1;
          // }
        });
      }
      else if (req.body.votetype === "downvote") {
        voterType = "downvotes"
        users.updateOne({ _id: new ObjectID(req.body.userid)},{
          $pull: {
            "upvotes" : info
          }}, (err,result) => {
          // if (result.modifiedCount > 0) {
          //   counterInc = -2;
          // }
          // else{
            counterInc = -1;
          // }
        });
      }
 
      if (req.body.votetype !== "") {
        users.updateOne({ _id: new ObjectID(req.body.userid)},{
            $addToSet: {
                [voterType]: info
            }}, (err,result) => {
            if (result.modifiedCount > 0) {

              // if (req.body.field == "categories") {
              //   experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
              //     $inc: {
              //       [field]: counterInc
              //     }
              //  });
              // }
              // else{
              //   experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.expertdetailid},{
              //     $inc: {
              //       [field]: counterInc
              //     }
              //  });
              // }

              experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                $inc: {
                  [field]: counterInc
                }
             });
            }
        });
      }
    });

    app.get("/api/getrankedexpert/", (req, res) => {
      experts.find().sort({"categories.rating": -1}).toArray(function(err, expert) {  
        if (err) {
          return res.status(500).json({
            err: err
          });  
        }
        else{
          return res.status(200).json(expert);
        }
      })
    });

    app.use((req, res, next) => {
      res.sendFile(path.join(__dirname, "..", "build", "index.html"));
    });
    
    
  }).catch((e) => {
    app.get("/")
  });
    

const httpServer = http.createServer(app);

// start express server on port 3000
httpServer.listen(3000, () => {
  console.log("server started on port 3000");
});