// 406. Campground Model Basics
const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user")
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual("thumbnail").get(function(){
    return this.url.replace("/upload", "/upload/w_200"); //this refers to the particular image
}); //on every image, set up a thumbnail
//recall from the Mongo Mongoose virual properties lesson
// we use this virtual because the transformed url is derived from base image url
// no need to store extra urls in the database.

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

// 468. this middleware passes the campground document object that got deleted into the
//   callback function. So you can access its data fields in the function.
CampgroundSchema.post("findOneAndDelete", async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model("Campground", CampgroundSchema);