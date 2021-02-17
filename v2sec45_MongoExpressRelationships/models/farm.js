// Wednesday Feb 10, 2021
// 455. Defining Our Farm & Product Models
const mongoose = require("mongoose");
const Product = require("./product");
const {Schema} = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, "Farm must have a name!"]
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email required"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

// This Mongoose middleware is triggered after findByIdAndDelete() called
farmSchema.post("fineOneAndDelete", async function(farm){
    if(farm.products.length){
        const res = await Product.deleteMany({_id : {$in: farm.products}})
        console.log(res);
    }
});

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;