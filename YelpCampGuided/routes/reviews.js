// Monday Feb 22, 2021 Start w 484. Breaking Out Review Routes
const express = require("express");
const router = express.Router({mergeParams: true});

const Campground = require("../models/campground");
const Review = require("../models/review");

const {reviewSchema} = require("../schemas.js");

const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(async function(req, res){
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created new review!");
    res.redirect(`/campgrounds/${req.params.id}`);
}));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(async function(req, res){
    const {id, reviewId} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId} });
    const review = await Review.findById(reviewId);
    req.flash("success", "Successfully deleted review.");
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;