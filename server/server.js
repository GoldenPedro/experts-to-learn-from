require('dotenv').config()
const express = require("express");
const app = express(); // create express app
const path = require("path");
const http = require('http');
// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
var cors = require('cors')

const URI = process.env.MONGO_URI;


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


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

  data(async (client) => {
    const myDataBase = await client.db('mydatabase').collection('users');


    app.post("/api/users", (req, res) => {
      console.log(req.body)
    
      myDataBase.insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("1 user inserted");
        })
      
    });
    
    app.post("/api/login", (req, res) => {
      console.log(req.body)
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