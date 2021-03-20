// Thursday March 18, 2021 521. Adding a Reviews Controller
const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async function(req, res){
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created new review!");
    res.redirect(`/campgrounds/${req.params.id}`);
};

module.exports.deleteReview = async function(req, res){
    const {id, reviewId} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId} });
    const review = await Review.findById(reviewId);
    req.flash("success", "Successfully deleted review.");
    res.redirect(`/campgrounds/${id}`);
};