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
    
    app.post("/api/users", (req, res, next) => {
      // const hash = bcrypt.hashSync(req.body.password, 12);

      users.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
          return res.status(500).json({
            err: err
          });
          
        } else if (user) {
          return res.status(300).json({
            message: "user already exist"
          });

        } else {
          users.insertOne({ email: req.body.email, password: req.body.password }, (err, doc) => {
            if (err) {
              return res.status(500)
            } else {
                 const token = jwt.sign({id: req.body.email}, process.env.SESSION_SECRET)
                 return res.status(200).json({
                  token: token
                });
            }
          });
        }
      });
    }
    );
    
    app.post("/api/login", (req, res) => {
      passport.authenticate('local' ,(err, user, info) => {
      if(err){
        return res.status(500).json({
          err: err
        });
      }
      else{
        const token = jwt.sign({id: req.body.email}, process.env.SESSION_SECRET)
        return res.status(200).json({
          token: token
        });
      }
      })(req, res);
    });

    app.post("/api/NewExpert", (req, res) => {
      experts.findOne({ name: req.body.name }, function (err, expert) {
        if (err) {
          return res.status(500).json({
            err: err
          });
          
        } else if (expert) {
          return res.status(200).json({
            message: "This expert already exist"
          })

        } else {

          experts.insertOne(
            {
              name: req.body.name, descriptions: [req.body.descriptions], twitterLinks: [req.body.twitterLinks], 
              youtubeChannels: [req.body.youtubeChannels], blogs: [req.body.blogs], categories: [req.body.categories]
            }, (err, doc) => {
            if (err) {
              return res.status(500).json({
                err: err
              });
            } else {
              addCategory(req.body.categories.category)
              return res.status(200).json({
                message: "expert has been added"
              })
            }
          });
        }
      });
    });
    

    app.get("/api/expertlist/:category", (req, res) => {
      experts.find({'categories.category': req.params.category}).toArray(function (err, expert) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        else{
          return res.status(200).json(expert);
        }
    });
  });

    app.post("/api/categories", (req, res) => {
      categories.find().toArray(function(err, category) {
        if (err) {
            return res.status(500).json({
              err: err
            });
        }
        else{
          name = []
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
      //Need from frontend: new value to add; id of the expert; name of the category its going to
      // experts.findOneAndUpdate({ _id: new ObjectID(req.body.id)}, {$push: {[req.body.name]: req.body.value}}, {new: true}, function(err, expert){
      // experts.findAndModify({ _id: new ObjectID(req.body.id)},[],{$push: {test: req.body.value}},{},function(err, expert) {
      experts.updateOne({ _id: new ObjectID(req.body.id)}, {$push: {[req.body.name]: req.body.value}}, function(err, expert){
        if (err) {
          return res.status(500).json({
            err: err
          });  
        }
        else{
          return res.status(200).json(expert);
        }
      });
    });
    
    app.post("/api/vote/", (req, res) => {

      info = {
        id: req.body.expert,
        field: req.body.field,
        tag : req.body.tag
      }

      field = info.field.concat(".$.rating");
      subfield = req.body.subfield

      if (req.body.votetype === "") {
        users.updateOne({ _id: new ObjectID(req.body.user)},{
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
              users.updateOne({ _id: new ObjectID(req.body.user)},{
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
        users.updateOne({ _id: new ObjectID(req.body.user)},{
          $pull: {
            "downvotes" : info
          }}, (err,result) => {
          if (result.modifiedCount > 0) {
              counterInc = 2;
          }
          else{
              counterInc = 1;
          }
        });
      }
      else if (req.body.votetype === "downvote") {
        voterType = "downvotes"
        users.updateOne({ _id: new ObjectID(req.body.user)},{
          $pull: {
            "upvotes" : info
          }}, (err,result) => {
          if (result.modifiedCount > 0) {
            counterInc = -2;
          }
          else{
            counterInc = -1;
          }
        });
      }

      if (req.body.votetype !== "") {
        users.updateOne({ _id: new ObjectID(req.body.user)},{
            $addToSet: {
                [voterType]: info
            }}, (err,result) => {
            if (result.modifiedCount > 0){
              experts.updateOne({ _id: new ObjectID(info.id),[subfield] : info.tag},{
                $inc: {
                  [field]: counterInc
                }
             });
            }
        });
      }
    });


      // app.get("/api/checkvote/", (req, res) => {

      //   postid = "5fcc30f5ba4b4c792d2e7d96"
      //   field = "categories"
      //   tag = "photography"
      //   user = "5f9a011e61486d5f83a83367"

      //   // test={
      //   //   id: expert,
      //   //   field: "categories.category",
      //   //   tag : "photography"
      //   // }

      //   users.findOne({ _id: new ObjectID(user)}, function (err, user) {
          
      //     if (user){
      //       console.log(user)
      //       test = user.upvoters.some( expert => expert['id'] === postid && expert['field'] === field && expert['tag'] === tag)
      //       console.log(test)

      //     }
      //   })
      // });


    

   
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