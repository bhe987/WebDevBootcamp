// 406. Campground Model Basics
const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user")
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
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