'use strict';

const express = require("express");
const https = require("https");
//const serverless = require('serverless-http');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.listen(process.env.PORT | 3000);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})
//module.exports.handler = serverless(app);
