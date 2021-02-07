// Started on Monday Jan 25, 2021
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const {campgroundSchema} = require("./schemas.js");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Database connected");
});

const app = express();


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));//needed so Express can parse req.body
app.use(methodOverride("_method"));

const validateCampground = function (req, res, next) {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else { //need to call next to make it into the actual route handler function
        next();
    }
}

app.get("/", function(req, res){
    res.render("home");
});

app.get("/campgrounds", catchAsync(async function(req, res){
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds})
}));

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.post("/campgrounds", validateCampground, catchAsync(async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError("Invalid Campground Data", 400);
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
}));

app.get("/campgrounds/:id", catchAsync(async function(req, res){
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/show", {campground});
}));

app.get("/campgrounds/:id/edit", catchAsync(async function(req, res){
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", {campground});
}));

app.put("/campgrounds/:id", validateCampground, catchAsync(async function(req, res){
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    // in the above line, we spread the req.body.campground object into the object 
    //    used to update
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}));

app.all("*", function(req, res, next){
    next(new ExpressError("Page Not Found!", 404));
});

app.use(function(err, req, res, next){
    const {statusCode = 500} = err;
    if (!err.message) err.message = "Oh no, something went wrong!";
    res.status(statusCode).render("error", {err});
});

app.listen(3000, function(){
    console.log("Server started and listening on Port 3000.");
})