// Monday March 8, 2021 506 and 507. Register Form and Route Logic
const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const {campgroundSchema} = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");

router.get("/register", function(req, res){
    res.render("users/register");
});

router.post("/register", catchAsync(async function(req, res, next){
    try{
        const {username, email, password} = req.body;
        const newUser = new User({email: email, username: username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, function(err){
            //await not supported, so a callback required
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to YelpCamp!");
            res.redirect("/campgrounds");
        });
        
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
}));

router.get("/login", function(req, res){
    res.render("users/login");
});

router.post("/login", passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";//if returnTo is undef, then "/campgrounds" is set
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
});

module.exports = router;