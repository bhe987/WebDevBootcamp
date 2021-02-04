// Tuesday Feb 2, 2021 start with 431. Express's Built-in Error Handler
const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

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
    // res.send("Sorry you need a password!");
    throw new AppError("Password required!", 401);
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

app.get("/error", (req, res) => {
    chicken.fly();
});

app.get("/dogs", function(req, res){
    console.log(`Request Date: ${req.requestTime}`);
    res.send("Woof Woof!");
});

app.get("/secret", verifyPassword, function(req, res){
    res.send("My secret is: Sometimes I wear headphones in public so I don't have to talk to anyone");
});

app.get("/admin", (req, res) => {
    throw new AppError("You are not an admin!", 403);
});

// app.use(function(err, req, res, next){
//     console.log("***************************************");
//     console.log("*****************ERROR*****************");
//     console.log("***************************************");
//     next(err);
// });

app.use(function(err, req, res, next){
    const {status = 500, message = "Something went wrong"} = err;
    res.status(status).send(message);
});

app.listen(3000, function(){
    console.log("App is running on localhost:3000");
});