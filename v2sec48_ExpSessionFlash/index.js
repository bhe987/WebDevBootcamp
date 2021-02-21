// Friday February 19, 2021 479. Express Session
const express = require("express");
const app = express();
const session = require("express-session");

const sessionOptions = {secret: "thisisnotagoodsecret", resave: false, saveUninitialized: false};
app.use(session(sessionOptions));

app.get("/viewcount", function(req, res){
    if(req.session.count){
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times.`);
});

app.get("/register", function(req, res){
    const {username = "Anonymous"} = req.query;
    req.session.username = username;
    res.redirect("/greet");
});

app.get("/greet", function(req, res){
    const {username} = req.session;
    res.send(`Welcome back, ${username}`);
});

app.listen(3000, function(){
    console.log("Serving app on port 3000.");
});