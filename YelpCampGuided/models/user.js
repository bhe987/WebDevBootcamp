// Thursday March 4, 2021 504. Creating Our User Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }

});

//this will add on a username and password field to our schema, make them required,
// and unique, and give us more methods to use
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);