require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const http = require('http');
// const mongoose = require('mongoose');
const { MongoClient, ObjectID } = require('mongodb');
var cors = require('cors')
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const { info, timeStamp } = require('console');


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
          // if (!bcrypt.compareSync(password, user.password)) {return done(null, false); }
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
 

    app.post("/api/users", (req, res, next) => {
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
              //const hash = bcrypt.hashSync(req.body.password, 12);
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
            return res.status(401).json({
              user: req.body.email,
              message: "User doesn't exist"
            });
          }
        }
      })(req, res);
    });

    app.post("/api/NewExpert", (req, res) => {

      users.findOne({ _id: new ObjectID(req.body.user)}, function (err, user) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        } 
        if (!user) {
          return res.status(401).json({
            message: "User doesn't exist"
          });
        }
        else{
          const timeStamp = new Date()

          for (var [key, value] of Object.entries(req.body)) {
            req.body[key].submitted = user.username
            req.body[key].createdAt = timeStamp
            if (key == "descriptions" || key == "twitterLinks" || key == "youtubeChannels"  || key == "blogs" ) {
              details.insertOne(value, (err,doc)=>{
                // if (err) {
                //   return res.status(500).json({
                //     err: err
                //   });
                // value["_id"] = doc["ops"][0]["_id"].toString()
              })
            }
          }


          experts.insertOne(
            {
              name: req.body.name, descriptions: [req.body.descriptions], twitterLinks: [req.body.twitterLinks], 
              youtubeChannels: [req.body.youtubeChannels], blogs: [req.body.blogs], articles: [], bookRecommendations: [], tweets: [], videos: [],
              quotes: [], otherLinks: [], categories: [req.body.categories], submitted: user.username, createdAt: timeStamp, updatedAt: timeStamp
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
                      expertdetailid: new ObjectID(Object.values(value)[4].toString())
                    }
                    subid = info.field.concat("._id");
                  } 
                    
                  field = info.field.concat(".$.rating");
                  subfield = info.field.concat("." + Object.keys(value)[0])

                  users.updateOne({ _id: new ObjectID(req.body.user)},{
                    $addToSet: {
                        ["upvotes"]: info
                    }}, (err,result) => {
                    if (err) {

                      if (info.field == "categories") {
                        experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                          $inc: {
                            [field]: -1
                          }
                      });
                      }
                      else{
                        experts.updateOne({ _id: new ObjectID(info.id),[subid] : info.expertdetailid},{
                          $inc: {
                            [field]: -1
                          }
                      });
                      } 
                    }
                  });
                  
                }
              }

              return res.status(200).json({
                message: "expert has been added"
              })
            }
          });
        }
      }); 
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
      categories.find().sort({"name": 1}).toArray(function(err, category) {
        if (err) {
            return res.status(500).json({
              err: err
            });
        }
        else{
          var name = []
          category.forEach(element => {
            if (name.length == 10){
              return;
            }
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
            for (var [key, value] of Object.entries(expert)) {
              if (Array.isArray(value)) {
                value.sort((a, b) => b.rating - a.rating)
              }
            }

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

    app.get("/api/getexpert/:id/recent", (req, res) => {
      try {
        experts.findOne({ _id: new ObjectID(req.params.id)}, function (err, expert) {
          if (err) {
            return res.status(500).json({
              err: err
            });  
          }
          else{
            for (var [key, value] of Object.entries(expert)) {
              if (Array.isArray(value)) {
                value.sort((a, b) => b.creatdAt - a.creatdAt)
              }
            }

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

      users.findOne({ _id: new ObjectID(req.body.userid)}, function (err, user) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        } 
        if (!user) {
           return res.status(401).json({
             message: "User does not exist"
           });
         } 
        else{
          const timeStamp = new Date()
          req.body.value.submitted = user.username;
          req.body.value.createdAt = timeStamp
          details.insertOne(req.body.value, (err,doc)=>{
            // if (err) {
            //   return res.status(500).json({
            //     err: err
            //   });
            // req.body.value["_id"] = doc["ops"][0]["_id"].toString()
          })

          experts.updateOne({ _id: new ObjectID(req.body.id)}, {$set: {updatedAt: timeStamp }, $push: {[req.body.name]: req.body.value}}, function(err, expert){
            if (err) {
              return res.status(500).json({
                err: err
              });  
            }
            else{

              if (req.body.name == "categories") {
                var info = {
                  id: req.body.id,
                  field: req.body.name,
                  tag :  Object.values(req.body.value)[0]
                }
              }
              else{
                var info = {
                  id: req.body.id,
                  field: req.body.name,
                  tag :  Object.values(req.body.value)[0],
                  expertdetailid: new ObjectID(Object.values(req.body.value)[4].toString())
                }

                subid = info.field.concat("._id");
              }

              

              
              field = info.field.concat(".$.rating");
              subfield = info.field.concat("." + Object.keys(req.body.value)[0])

              users.updateOne({ _id: new ObjectID(req.body.userid)},{
                $addToSet: {
                    ["upvotes"]: info
                }}, (err,result) => {
                if (err) {

                  if (info.field == "categories") {
                    experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                      $inc: {
                        [field]: -1
                      }
                    });
                  }
                  else{
                    experts.updateOne({ _id: new ObjectID(info.id),[subid] : info.expertdetailid},{
                      $inc: {
                        [field]: -1
                      }
                    });
                  }
                }
              });

              return res.status(200).json(expert);
            }
          });
        }
      });
    });

    
    app.post("/api/vote/", (req, res) => {

      users.findOne({ _id: new ObjectID(req.body.userid)}, function (err, user) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        } 
        if (!user) {
           return res.status(401).json({
             message: "User does not exist"
           });
         } 
        else{

          if (req.body.field == "categories") {
            var info = {
              id: req.body.expertid,
              field: req.body.field,
              tag: req.body.tag
            }
          }
          else{
            var info = {
              id: req.body.expertid,
              field: req.body.field,
              tag: req.body.tag,
              expertdetailid: new ObjectID(req.body.expertdetailid)
            }
            subid = info.field.concat("._id");
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
            counterInc = 1;
            users.updateOne({ _id: new ObjectID(req.body.userid)},{
              $pull: {
                "downvotes" : info
              }}, (err,result) => {
              // if (err){
              //   console.log(err)
              // }
              // if (result.modifiedCount > 0) {
              //     counterInc = 2;
              // }
              // else{
                  // counterInc = 1;
              // }
            });
          }
          else if (req.body.votetype === "downvote") {
            // check bug here count was zero for someone reason
            voterType = "downvotes"
            counterInc = -1;

            users.updateOne({ _id: new ObjectID(req.body.userid)},{
              $pull: {
                "upvotes" : info
              }}, (err,result) => {
                // if (err){
                //   console.log(err)
                // }
              // if (result.modifiedCount > 0) {
              //   counterInc = -2;
              // }
              // else{
                 // counterInc = -1;
              // }
            });
          }
  
          if (req.body.votetype !== "") {
            users.updateOne({ _id: new ObjectID(req.body.userid)},{
                $addToSet: {
                    [voterType]: info
                }}, (err,result) => {
                if (result.modifiedCount > 0) {

                  if (req.body.field == "categories") {
                    experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                      $inc: {
                        [field]: counterInc
                      }
                  });
                  }
                  else{
                    console.log(subid)
                    console.log(counterInc)
                    console.log(info.expertdetailid)

                    experts.updateOne({ _id: new ObjectID(info.id),[subid] : info.expertdetailid},{
                      $inc: {
                        [field]: counterInc
                      }
                  });
                  }
                }
            });
          }
        }
      });
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

    app.get("/api/getrecentexpert/", (req, res) => {
      experts.find().sort({"categories.createdAt": -1}).toArray(function(err, expert) {  
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