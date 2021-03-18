// Monday February 22, 2021 start with 483. Breaking Out Campground Routes
const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const {isLoggedIn, validateCampground, isAuthor} = require("../middleware");

router.get("/", catchAsync(async function(req, res){
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds})
}));

router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.post("/", isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError("Invalid Campground Data", 400);
    const newCampground = new Campground(req.body.campground);
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${newCampground._id}`);
}));

router.get("/:id", catchAsync(async function(req, res){
    const {id} = req.params;
    const campground = await Campground.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    console.log(campground);
    if(!campground) { //if Mongoose didn't find a campground with the id
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {campground});
}));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(async function(req, res){
    const {id} = req.params;
    const campground = await Campground.findById(req.params.id);
    if(!campground) { //if Mongoose didn't find a campground with the id
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", {campground});
}));

router.put("/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(async function(req, res){
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    // in the above line, we spread the req.body.campground object into the object 
    //    used to update
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted review.");
    res.redirect("/campgrounds");
}));

module.exports = router;