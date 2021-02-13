// starting on Tuesday Jan 19, 2021
// starting with 395. Creating Our Model
const mongoose = require("mongoose");
const {Schema} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ["fruit", "vegetable", "dairy"]
    },
    farm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm"
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;//now we can import this file and
// and use this model somewhere else