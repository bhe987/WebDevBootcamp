// starting on Wednesday Feb 10, 2021
// starting with 455. Defining Our Farm & Product Models
// originally copied from 394. Express and Mongoose Basic Setup
// from section 38. Mongoose and Express
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");
const Farm = require("./models/farm");

mongoose.connect('mongodb://localhost:27017/farmStandTake2', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo Connection Open!");
    })
    .catch(err => {
        console.log("Oh no, Mongo Connection error!");
        console.log(err);
    })

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// FARM ROUTES

app.get("/farms", async (req, res) => {
    const farms = await Farm.find({});
    res.render("farms/index", {farms});
})

app.get("/farms/new", function(req, res){
    res.render("farms/new");
})

app.get("/farms/:id", async function(req, res){
    const farm = await Farm.findById(req.params.id).populate("products");
    res.render("farms/show", {farm});
});

app.delete("/farms/:id", async function(req, res){
    const {id} = req.params;
    const farm = await Farm.findByIdAndDelete(id);
    res.redirect("/farms");
})

app.post("/farms", async function(req, res){
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect("/farms");
})

app.get("/farms/:id/products/new", async (req, res) => {
    const id = req.params.id;
    const farm = await Farm.findById(id);
    res.render("products/new", {categories, farm});
})

app.post("/farms/:id/products", async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    const product = new Product(req.body);
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
})

// PRODUCT ROUTES

const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async function(req, res){
    const {category} = req.query;
    if(category){
        const products = await Product.find({category});//{category: category} is full object in find
        res.render("products/index", { products, category });
    } else {
        const products = await Product.find({})
        res.render("products/index", { products, category: "All" });
    }
    // the find() takes a while and is then-able
    // but we prefer making it an async handler and awaiting
    // we will do this all the time
    // console.log(products);
});

app.get("/products/new", (req, res) => {
    res.render("products/new", {categories});
});

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async function(req, res){
    const {id} = req.params;
    const product = await Product.findById(id).populate("farm", "name");
    res.render("products/show", {product});
});

app.get("/products/:id/edit", async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", {product, categories});
});

app.put("/products/:id", async function(req, res){
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async function(req, res){
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
});

app.listen(3000, function(){
    console.log("App is listening on Port 3000!");
})