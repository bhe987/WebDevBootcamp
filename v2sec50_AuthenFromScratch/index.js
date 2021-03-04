// Saturday Feb 27, 2021  start with 496. Auth Demo: Setup
// 
const express = require("express");
const app = express();
const User = require("./models/user.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

mongoose.connect('mongodb://localhost:27017/loginDemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo Connection Open!");
    })
    .catch(err => {
        console.log("Oh no, Mongo Connection error!");
        console.log(err);
    })

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({extended: true})); //allows parsing of req.body
app.use(session({secret: "notagoodsecret"}));

const requireLogin = function(req, res, next){
    if (!req.session.user_id) {
        return res.redirect("/login");
        // if the code after res.redirect() is not in an else{} block, add a return
        //  to prevent a "cannot set headers after response sent" error
    }
    next();
}

app.get("/", (req, res) => {
    res.send("This is the home page.");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async function(req, res){
    const {password, username} = req.body;
    // const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username: username,
        password: password 
        //password: hash
    });
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", async function(req, res){
    const {username, password} = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect("/secret");
    } else {
        res.redirect("/login");
    }
});

app.post("/logout", function(req, res){
    req.session.user_id = null;
    res.redirect("/login");
});

app.get("/secret", requireLogin, function(req, res){
    res.render("secret");
});

app.get("/topsecret", requireLogin, function(req, res){
    res.send("Top secret!!!");
});

app.listen(3000, () => {
    console.log("Serving your app on Port 3000!");
})