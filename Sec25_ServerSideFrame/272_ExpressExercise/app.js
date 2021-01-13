// Friday October 2, 2020
var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
	var animal = req.params.animal.toLowerCase();
	var sound = animalSounds[animal];
	res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:word/:num", function(req, res){
	var word = req.params.word;
	var num = parseInt(req.params.num);
	var displayText = "";
	for (var i = 0; i < num; i++){
		displayText = displayText + word + " ";
	}
	res.send(displayText);
});

app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with your life?")
});

var animalSounds = {
	"pig": "Oink",
	"cow": "Moo",
	"dog": "Woof Woof!",
	"cat": "Meow",
	"sheep": "baa"
};

app.listen(3000, function(){
	console.log("server started!");
});