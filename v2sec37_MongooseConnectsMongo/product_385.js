// 385. Mongoose Schema Validations, 386. Additional Schema Val
// Friday Jan 15 2021
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected!");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // if we omit the name property, then we'll get a validation error
        maxLength: 20
    },
    price: {
        type: Number, // if we pass in something that can be cast to a number, this'll pass validation
        required: true,
        min: [0, "Price must be positive ya dodo!"]
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ["S", "M", "L"]
    }
});

productSchema.methods.addCategory = function(newCat){
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: "Mountain Bike"});
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
}

Product.fireSale().then(res => console.log(res));

const bike = new Product({name: "Tire Pump", price: 24.50});
bike.save()
    .then(data => {
        console.log("It worked!");
        console.log(data);
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })