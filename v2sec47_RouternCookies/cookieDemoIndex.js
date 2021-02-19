// Thur Feb 18, 2021 start 473. Sending Cookies
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser("thisismysecret"));

app.get("/greet", (req, res)=>{
    const {name = "no name"} = req.cookies;
    res.send(`Hey there, ${name}!`);
});

app.get("/setname", function(req, res){
    res.cookie("name", "stevie chicks");
    res.cookie("animal", "harlequin shrimp");
    res.send("Ok, sent you a cookie!");
});

app.get("/getsignedcookie", function(req, res){
    res.cookie("fruit", "grape", {signed: true});
    res.send("Ok, signed your fruit cookie!");
})

app.get("/verifyfruit", (req, res)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
});

app.listen(3000, function(){
    console.log("Serving app on port 3000.");
});