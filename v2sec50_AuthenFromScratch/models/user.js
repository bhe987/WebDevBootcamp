const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username cannot be blank"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"]
    }
});

userSchema.statics.findAndValidate = async function(username, password){
    const foundUser = await this.findOne({username: username}); //this refers to this particular model, User
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
};

userSchema.pre("save", async function(next){
    //this refers to this particular instance of the model
    if (!this.isModified("password")) return next(); // if password is same, don't rehash
    // the password isn't passed into the callback, but we can access it through "this"
    // from that instance of User
    this.password = await bcrypt.hash(this.password, 12);
    next(); //next() is save()
});

module.exports = mongoose.model("User", userSchema);