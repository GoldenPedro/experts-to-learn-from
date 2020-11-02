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
    // const experts = await client.db('mydatabase').collection('experts');

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
          // console.log('User '+ user +' attempted to log in.');
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


    // app.route("/api/login").post(passport.authenticate('local'), (req, res) => {
    //     const token = jwt.sign({id: req.body.email}, process.env.SESSION_SECRET)
    //     console.log(token);
    //     return res.json({
    //       auth: true,
    //       token: token
    //     });
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