// Thursday March 18, 2021 520. Refactoring to Campgrounds Controller
const Campground = require("../models/campground");
const {cloudinary} = require("../cloudinary");

module.exports.index = async function(req, res){
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds})
};

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError("Invalid Campground Data", 400);
    const newCampground = new Campground(req.body.campground);
    newCampground.images = req.files.map(f => ({url: f.path, filename: f.filename})); //implicit return
    //if we uploaded 2 files, this line should make us an array containing these simple objects
    // which contain url and filenamez
    newCampground.author = req.user._id;
    await newCampground.save();
    console.log(newCampground);
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${newCampground._id}`);
};

module.exports.showCampground = async function(req, res){
    const {id} = req.params;
    const campground = await Campground.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if(!campground) { //if Mongoose didn't find a campground with the id
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {campground});
};

module.exports.renderEditForm = async function(req, res){
    const {id} = req.params;
    const campground = await Campground.findById(req.params.id);
    if(!campground) { //if Mongoose didn't find a campground with the id
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", {campground});
};

module.exports.updateCampground = async function(req, res){
    const {id} = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    // in the above line, we spread the req.body.campground object into the object 
    //    used to update
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));//implicit return
    campground.images.push(...imgs); //spread the data in imgs and send each one to push() as
        // separate arguments
    await campground.save();
    if(req.body.deleteImages){
        for (let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }// this will delete the images on cloudinary
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }//the pull operator is how we pull elements out of an array
        // we want to pull out of the images array where the filename of the image is $in 
        // req.body.deleteImages.
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted review.");
    res.redirect("/campgrounds");
};