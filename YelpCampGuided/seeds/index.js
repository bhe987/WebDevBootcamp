// Started on Monday Jan 25, 2021
// start 407. Seeding Campgrounds
const mongoose = require("mongoose");
const cities = require("./cities");
const {descriptors, places} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async function(){
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const newCampground = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem Ipsum Cupcake ipsum dolor sit amet caramels I love. Powder brownie macaroon soufflé candy. Pastry cupcake I love jujubes gummi bears dessert gingerbread ice cream.",
            price
        });
        await newCampground.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
})