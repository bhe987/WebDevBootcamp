// Tuesday Feb 9, 2021 452. One to "Bajillions"
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

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    }
})

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async function(){
    const user = new User({username: "chickenfan99", age: 61});
    const tweet1 = new Tweet({text: "Omg I love my chicken family!", likes: 0});
    tweet1.user = user;
    // we can set the entire property equal to the user object. because we defined
    // the user property as an ObjectId earlier, Mongoose will only save the _id.
    await user.save();
    await tweet1.save();
}
makeTweets();

const findTweet = async function(){
    const t = await Tweet.findOne({}).populate("user", "username");
    // above, we query the database for a tweet, and initially, the tweet object returned
    // only has an id value in the "user" field. by chaining on the .populate("user"),
    // Mongoose will populate the "user" field in the tweet object with the actual
    // user object the id refers to.
    // Adding the "username" second argument selects only the "username" field from the
    // user object to be populated into the "user" field of the tweet object returned.
    console.log(t);
}