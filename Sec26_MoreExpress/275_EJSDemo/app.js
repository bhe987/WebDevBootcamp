// Saturday October 3, 2020
var express = require("express");
var app = express();

app.use(express.static("public")); //tells express to serve the files in public dir too
app.set("view engine", "ejs"); //tells express to expect .ejs file type in the render statements

app.get("/", function(req, res){
	res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});
});
app.get("/posts", function(req, res){
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "My adorable pet bunny", author: "Charlie"},
		{title: "Can you believe this pomsky?", author: "Colt"},
	];
	
	res.render("posts", {posts: posts});
});

app.listen(3000, function(){
	console.log("Server started and listening on port 3000");
});