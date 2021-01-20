// 391. Mongoose Virtuals, 392. Mongosoe Middleware
// Mon Jan 18, 2021
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected!");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual("fullName").get(function(){
    return `${this.first} ${this.last}`;
})

personSchema.pre("save", async function(){
    // this.first = "YO";
    // this.last = "MAMA"; we can access the individual instance's properties here
    console.log("About to save!");
})
personSchema.post("save", async function(){
    console.log("Just saved!");
})

const Person = mongoose.model("Person", personSchema);

