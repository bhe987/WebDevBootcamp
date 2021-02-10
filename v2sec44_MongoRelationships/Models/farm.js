// Monday Feb 8, 2021
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/relationshipsDemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected!");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["Spring", "Summer", "Fall", "Winter"]
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref: "Product"}]
})

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//     {name: "Goddess Melon", price: 4.99, season: "Summer"},
//     {name: "Sugar Baby Watermelon", price: 4.99, season: "Summer"},
//     {name: "Asparagus", price: 3.99, season: "Spring"}
// ]);
// const makeFarm = async function(){
//     const farm = new Farm({name: "Full Belly Farms", city: "Guinda, CA"});
//     const melon = await Product.findOne({name: "Goddess Melon"});
//     farm.products.push(melon);
//     console.log(farm);
// }
// makeFarm();

const addProduct = async function(){
    const farm = await Farm.findOne({name: "Full Belly Farms"});
    const watermelon = await Product.findOne({name: "Sugar Baby Watermelon"});
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
}

Farm.findOne({name: "Full Belly Farms"})
.populate("products")
.then(farm => console.log(farm));

addProduct();