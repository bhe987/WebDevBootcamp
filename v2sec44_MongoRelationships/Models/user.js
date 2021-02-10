// Monday Feb 8, 2021
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/relationshipsDemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected!");
    })
    .catch(err => {
        console.log("Oh no, error!");
        console.log(err);
    })

const userschema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            street: Street,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model("User", userSchema);

const makeUser = async function(){
    const u = new User({
        first: "Harry",
        last: "Potter"
    })
    u.addresses.push({
        street: "123 Sesame St.",
        city: "New York",
        state: "NY",
        country: "USA"
    })
    const res = await u.save();
    console.log(res);
}

makeUser();