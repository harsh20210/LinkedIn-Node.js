const express = require('express');
const mongo = require('mongoose');
const cores = require('cors');
const app = express();
const auth = require("./Route/Auth/auth");
const cookiesParse = require("cookie-parser");
const logout = require("./Route/Logout");
const appForRegistration = require("./Route/registrationApi");
const {appLogin} = require('./Route/Login');
const appForPost = require("./Route/Post");
const getApiForPost = require("./Route/getApiForPost");
const deletePost = require("./Route/deletePost");

// mongo.connect("mongodb+srv://root:root@cluster0.bskwx7s.mongodb.net/?retryWrites=true&w=majority")

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb' , extended: true }));

app.use(cookiesParse());

mongo.connect("mongodb://localhost:27017/LinkedIn")
.then( () => console.log("Connection Established......") )
.catch( (e) => console.log("Error In Connecting ===>> " , err) );

app.use(cores())
// app.use(auth);
app.use("/api/registration" , appForRegistration  );
app.use("/api/Post" , appForPost);
app.use("/getApi/Post" , getApiForPost);
app.use("/api/login" , appLogin);
app.use("/api/logout" , logout);
app.use("/api/delete" , deletePost);
app.listen(5001 , () => {
    console.log("Listening in port 5001");
})