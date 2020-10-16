require('dotenv').config()
const express = require("express");
const app = express(); // create express app
const path = require("path");
const http = require('http');
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true },function(err){
  if(err) console.log(err);
  console.log("connection successful");
});


app.use(express.static(path.join(__dirname, "..", "build")));

// app.get("/", (req, res) => {
//   res.send("This is from express.js");
// });

app.use(express.static("public"));


app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});


// app.use((req, res, next) => {
//     res.status(404).type('text').send('Not Found');
//   });

const httpServer = http.createServer(app);

// start express server on port 3000
httpServer.listen(3000, () => {
  console.log("server started on port 3000");
});