// Sunday October 11, 2020
// 308. Making API Requests with Node
// var request = require("request");
// request("http://www.google.com", function(error, response, body){
// 	if (!error && response.statusCode == 200){
// 		console.log(body);
// 	}
// });

var request = require("request");
request("http://www.reddit.com", function(error, response, body){
	if (error){
		console.log("SOMETHING WENT WRONG!");
		console.log(error);
	}
	else {
		if (response.statusCode == 200){
			//things worked!
			console.log(body);
		}
	}
});