// Wedn Jan 27, 2021
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));

app.use(function(req, res, next){
    req.requestTime = Date.now();//decorating the request object
    console.log(req.method.toUpperCase(), req.path);
    next();
})

const verifyPassword = function(req, res, next){
    const {password} = req.query;
    if(password === "chickennugget"){
        next();
    }
    res.send("Sorry you need a password!");
}

// app.use(function(req, res, next){
//     console.log("This is my first middleware!");
//     next(); //if this next() is omitted, then this would be
//     // the end of the chain, and no response will be sent
// })
// app.use(function(req, res, next){
//     console.log("This is my second middleware!");
//     next();
// })

app.get("/", (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send("Home Page!");
})

app.get("/dogs", function(req, res){
    console.log(`Request Date: ${req.requestTime}`);
    res.send("Woof Woof!");
});

app.get("/secret", verifyPassword, function(req, res){
    res.send("My secret is: Sometimes I wear headphones in public so I don't have to talk to anyone");
});

app.listen(3000, function(){
    console.log("App is running on localhost:3000");
});