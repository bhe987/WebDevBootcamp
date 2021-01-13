// Tuesday December 29, 2020
// Lesson 339, 
const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", function(req, res){
    res.render("home.ejs"); //.ejs extension not needed here btw; Express assumes .ejs files
});

app.get("/cats", function(req, res){
    const cats = [
        "Blue", "Rocket", "Monty", "Stephanie", "Winston"
    ];
    res.render("cats.ejs", {cats});
});

app.get("/r/:subreddit", function(req, res){
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    if (data){
        res.render("subreddit.ejs", {...data});//... will spread the properties into their vars
    } else{
        res.render("notfound", {subreddit});
    }
});

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render("random.ejs", {rand: num});//we can use "rand" in the template with this
});

app.listen(3000, function(){
    console.log("Listening on port 3000.")
});