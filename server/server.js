require('dotenv').config()
const express = require("express");
const app = express(); // create express app
const path = require("path");
const http = require('http');
// const mongoose = require('mongoose');
const { MongoClient, ObjectID } = require('mongodb');
var cors = require('cors')
// const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');


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
    
    app.post("/api/users", (req, res, next) => {
      // const hash = bcrypt.hashSync(req.body.password, 12);

      users.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
          return res.status(500).json({
            err: err
          });
          
        } else if (user) {
          return res.status(300);

        } else {
          users.insertOne({ email: req.body.email, password: req.body.password }, (err, doc) => {
            if (err) {
              return res.status(500)
            } else {
                //  next(null, doc.ops[0]);
                 const token = jwt.sign({id: req.body.email}, process.env.SESSION_SECRET)
                 return res.status(200).json({
                  token: token
                });
            }
          });
        }
      });
    }
    // ,
    // passport.authenticate('local',(err, user, info) =>{
    //   if(err){
    //     console.log(err)
    //   }
    //   if(info != undefined){
    //     console.log(info.message);
    //     //maybe send the info
    //   }
    //   else{

    //   console.log(user)
    //   }
    // }),(req, res, next) => {
    // }
    );
    
    app.post("/api/login", (req, res) => {
      passport.authenticate('local' ,(err, user, info) => {
      if(err){
        return res.status(500).json({
          err: err
        });
      }
      if(info != undefined){
        console.log(info.message);
        //maybe send the info
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

      var newdata = {}
      var newcategory

      for (var key in req.body) {
  
        if (key !== "categories") {
          newdata[key] = req.body[key]
        } else {
          newcategory = req.body[key]
        }
      }


      experts.updateOne({name: req.body.name}, {$set: newdata, $push: {categories: newcategory}}, {upsert:true}, function (err, result) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        } else {
          return res.status(200)
        }
      });

      // experts.findOne({ name: req.body.name }, function (err, expert) {
      //   if (err) {
      //     return res.status(500).json({
      //       err: err
      //     });
          
      //   } else if (expert) {

      //     var newdata = {}
      //     var newcategory

      //     for(var key in req.body) {
      //       if(key !== "categories"){
      //        newdata[key] = req.body[key]
      //       }
      //       else{
      //         newcategory = req.body[key]
      //       }
      //     }


      //   experts.updateOne(
      //     {_id: new ObjectID(expert._id)},

      //     {$push: {categories: newcategory},
      //     $set: newdata}
        
      //     );

      //   return res.status(200)

      //   } else {
      //     experts.insertOne(
      //       {
      //         name: req.body.name, description: req.body.description, twitterLink: req.body.twitterLink, 
      //         youtubeChannel: req.body.youtubeChannel, blog: req.body.blog, categories: [req.body.categories]
      //       }, (err, doc) => {
      //       if (err) {
      //         return res.status(500).json({
      //           err: err
      //         });
      //       } else {
      //         return res.status(200)
      //       }
      //     });
      //   }
      // });
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