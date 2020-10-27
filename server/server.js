require('dotenv').config()
const express = require("express");
const app = express(); // create express app
const path = require("path");
const http = require('http');
// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
var cors = require('cors')
// const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');

const URI = process.env.MONGO_URI;


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true },function(err, client){
//   if(err) console.log(err);
//   console.log("connection successful");
//   const test = client.db('mydatabase').collection('users');

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

  // function ensureAuthenticated(req, res, next) {
  //     if (req.isAuthenticated()) {
  //       return next();
  //     }
  //     res.redirect('/');
  //   }

  data(async (client) => {
    const users = await client.db('mydatabase').collection('users');
    // const experts = await client.db('mydatabase').collection('experts');


    app.post("/api/users", (req, res, next) => {
      // console.log(req.body)

      // const hash = bcrypt.hashSync(req.body.password, 12);
      users.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
          next(err);
        } else if (user) {
       
          // return res.status(200).json({
          //   success: true,
          //   redirectUrl: '/'
          // });

          return res.json({
            success: true,
            redirectUrl: '/'
          });
        } else {
          users.insertOne({ email: req.body.email, password: req.body.password }, (err, doc) => {
            if (err) {
      
            } else {
              next(null, doc.ops[0]);
            }
          });
        }
      });
    
      // users.insertOne(req.body, function(err, res) {
      //     if (err) throw err;
      //     console.log("1 user inserted");
      //   })
      
    });
    
    app.post("/api/login", (req, res) => {
      console.log(req.body)
    });

    
    // app.post("/api/login", (req, res) => {
    //   passport.authenticate('local', { failureRedirect: '/' }), (req, res) => { 
    //   }});

   
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