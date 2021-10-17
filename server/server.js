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
// const { info, timeStamp } = require('console');
const crypto = require('crypto');

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

    const salt = process.env.SALT; 

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
          if (crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`) !== user.password) {return done(null, false); }
          // if (password !== user.password) { return done(null, false); }
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
              // const hash = bcrypt.hashSync(req.body.password, 12);
              const hash = crypto.pbkdf2Sync(req.body.password, salt, 100, 64, `sha512`).toString(`hex`); 
              users.insertOne({ email: req.body.email, username: req.body.username, password: hash}, (err, doc) => {
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

            if (key == "descriptions" || key == "twitterLinks" || key == "youtubeChannels"  || key == "blogs" ) {

              if (Object.values(value)[0] !== "") {
                req.body[key].submitted = user.username
                req.body[key].createdAt = timeStamp

                details.insertOne(value, (err, doc)=>{
                  if (err) {
                    return res.status(500).json({
                      err: err
                    });
                  }
                  // value["_id"] = doc["ops"][0]["_id"].toString()
                })
              }
              else{
                req.body[key] =  null
              }
            }
          }


          experts.insertOne(
            {
              name: req.body.name, descriptions: [req.body.descriptions], 
              twitterLinks: (req.body.twitterLinks === null) ? []  : [req.body.twitterLinks], 
              youtubeChannels: (req.body.youtubeChannels === null) ? []  : [req.body.youtubeChannels], 
              blogs: (req.body.blogs === null) ? []  : [req.body.blogs], 
              articles: [], bookRecommendations: [], tweets: [], videos: [], quotes: [], otherLinks: [], categories: [req.body.categories], submitted: user.username, createdAt: timeStamp, updatedAt: timeStamp
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
                  else if (value === null){
                    continue;
                  }
                  else{
                  var info = {
                      id: doc["ops"][0]["_id"].toString(),
                      field: key,
                      tag : Object.values(value)[0],
                      expertdetailid: new ObjectID(value["_id"].toString())
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

                      return res.status(500).json({
                        err: err
                      });  
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

    app.get("/api/expertlist/:category/lowest", (req, res) => {
      experts.find({'categories.category': req.params.category}).sort({"categories.rating": 1}).toArray(function(err, expert) {  
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


    app.get("/api/expertlist/:category/newest", (req, res) => {
      experts.find({'categories.category': req.params.category}).sort({"createdAt": -1}).toArray(function(err, expert) {  
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

    app.get("/api/expertlist/:category/latest", (req, res) => {
      experts.find({'categories.category': req.params.category}).sort({"updatedAt": -1}).toArray(function(err, expert) {  
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

    app.get("/api/expertlist/", (req, res) => {
      experts.find()
      .sort({"categories.rating": -1})
      .limit(50)
      .toArray(function(err, expert) {  
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
      const searched = req.body.category.toLowerCase()

      if (searched === "") {
        categories.find()
        .sort({"name": 1})
        .toArray(function(err, category) {
          if (err) {
              return res.status(500).json({
                err: err
              });
          }
          else{
            return res.status(200).json(category.map(function(element) {return element.name}));
          }
        })
      }
      else{
        categories.find( {name:{'$regex' : '^' + searched}})
        .sort({"name": 1})
        .limit(10)
        .toArray(function(err, category) {
          if (err) {
              return res.status(500).json({
                err: err
              });
          }
          else{
            return res.status(200).json(category.map(function(element) {return element.name}));
          }
        })
      }
    });

    app.get("/api/randomcategory", (req, res) => {
      categories.aggregate([{ $sample: { size: 1 } }]).toArray(function(err, category) {  
        if (err) {
          return res.status(500).json({
            err: err
          });  
        }
        else{
          return res.status(200).json(category[0].name);
        }
      })
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
      }}
    );

    app.get("/api/getexpert/:id/newest", (req, res) => {
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
      }}
    );


    app.post("/api/addexpertdetails/", (req, res) => {

      // if (Object.values(req.body.value)[0] == "") {
      //   return res.status(200).json({message: "value is empty"});
      // }

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
          // console.log(Object.values(req.body.value))
          const timeStamp = new Date()
          req.body.value.submitted = user.username;
          req.body.value.createdAt = timeStamp
          details.insertOne(req.body.value, (err,doc)=>{
            if (err) {
              return res.status(500).json({
                err: err
              });
            }
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
                  expertdetailid: new ObjectID(req.body.value["_id"].toString())
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

                  return res.status(500).json({
                    err: err
                  }); 
                }
              });

              return res.status(200).json(expert);
            }
          });
        }
      });
    });


    // app.post("/api/deleteexpertdetails/", (req, res) => {
    //   users.findOne({ _id: new ObjectID(req.body.user)}, function (err, user) {
    //     if (err) {
    //       return res.status(500).json({
    //         err: err
    //       });
    //     } 
    //     if (!user) {
    //       return res.status(401).json({
    //         message: "User doesn't exist"
    //       });
    //     }
    //     else{

    //       experts.update({ _id: new ObjectID(req.body.id)}, {$pull: {[req.body.name]: { _id: new ObjectID(req.body.detail)}}}, function(err, expert){
    //         return res.status(200).json(expert);
    //       })
    //     }
    //   })  
    // })
    
    
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

          async function upvote(){
            try {
              const result = await users.updateOne({ _id: new ObjectID(req.body.userid)},{$pull: {"downvotes" : info}})
          
              if (result.modifiedCount > 0) {
                counterInc =  2;
              }
              else{
                counterInc =  1;
              }

              voting()
              // console.log("test" + counterInc )
              } catch (err) {
                return res.status(500).json({
                  err: err
                });
              }
          }
          
          async function downvote(){
            try {
              const result = await users.updateOne({ _id: new ObjectID(req.body.userid)},{$pull: {"upvotes" : info}})

          
              if (result.modifiedCount > 0) {
                counterInc =  -2;
              }
              else{
                counterInc =  -1;
              }

              voting()
              // console.log("test" + counterInc )
              } catch (err) {
                return res.status(500).json({
                  err: err
                });
              }
          }

          async function voting(){
            try {
              const result = await users.updateOne({ _id: new ObjectID(req.body.userid)},{$addToSet: {[voterType]: info}})

              if (result.modifiedCount > 0) {

                // console.log(counterInc)

                if (req.body.field == "categories") {

                    await experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                    $inc: {
                      [field]: counterInc
                    }
                  });
                }
                else{

                  await experts.updateOne({ _id: new ObjectID(info.id),[subid] : info.expertdetailid},{
                    $inc: {
                      [field]: counterInc
                    }
                });
                }
              }
              } catch (err) {
                  return res.status(500).json({
                    err: err
                  });
              }
          }

          if (req.body.votetype === "upvote") {
            voterType = "upvotes"
          }
          else if (req.body.votetype === "downvote") {
            voterType = "downvotes"
          }
  
          if (req.body.votetype !== "") {
            voterType ==="downvotes" ? downvote() : upvote()
          }
        }
      });
    });

    app.get("/api/uservotes/:id", (req, res) => {
      try {
        users.findOne({ _id: new ObjectID(req.params.id)}, { projection: {
          _id: false,
          upvotes: true,
          downvotes: true
        }}, function (err, user) {
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
            user.upvotes.forEach(function(obj) {
              if (obj.expertdetailid) {
                obj.id = obj.expertdetailid;
                delete obj.expertdetailid;
              }
            });

            user.downvotes.forEach(function(obj) {
              if (obj.expertdetailid) {
                obj.id = obj.expertdetailid;
                delete obj.expertdetailid;
              }
            });

            return res.status(200).json(user);
          }
        })
        }
        catch(err) {
          return res.status(500).json({
            err: err
          });  
        }
    });

    // app.get("/api/getrankedexpert/", (req, res) => {
    //   experts.find().sort({"categories.rating": -1}).toArray(function(err, expert) {  
    //     if (err) {
    //       return res.status(500).json({
    //         err: err
    //       });  
    //     }
    //     else{
    //       return res.status(200).json(expert);
    //     }
    //   })
    // });

    // app.get("/api/getnewestexpert/", (req, res) => {
    //   experts.find().sort({"createdAt": -1}).toArray(function(err, expert) {  
    //     if (err) {
    //       return res.status(500).json({
    //         err: err
    //       });  
    //     }
    //     else{
    //       return res.status(200).json(expert);
    //     }
    //   })
    // });

    // app.get("/api/getlatestexpert/", (req, res) => {
    //   experts.find().sort({"updatedAt": -1}).toArray(function(err, expert) {  
    //     if (err) {
    //       return res.status(500).json({
    //         err: err
    //       });  
    //     }
    //     else{
    //       return res.status(200).json(expert);
    //     }
    //   })
    // });

    // app.use((req, res, next) => {
    //   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
    // });
    
    
  }).catch((e) => {
    app.get("/")
  });
    

const httpServer = http.createServer(app);

// start express server on port 3000
httpServer.listen(3000, () => {
  console.log("server started on port 3000");
});