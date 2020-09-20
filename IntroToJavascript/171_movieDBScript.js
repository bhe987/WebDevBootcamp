// Tuesday August 11, 2020
console.log("ratings are from IMDb");
movies = new Array();
movies.push({title: "How to Train Your Dragon 3",
			 rating: 7.5,
			 hasWatched: false});
movies.push({
	title: "Crazy Rich Asians",
	rating: 6.9,
	hasWatched: false
});
movies.push({
	title: "Avengers: Endgame",
	rating: 8.4,
	hasWatched: true
});

movies.forEach(function(movie){
	var printOut = "";
	movie.hasWatched ? 
		printOut=("You have watched \"" + movie.title + "\" - " + movie.rating + "/10") : 
		printOut=("You have not seen \"" + movie.title + "\" - " + movie.rating + "/10");
	console.log(printOut);
});
// another way to print the watched statements is below
// var printOut = "You have ";
// if (movie.hasWatched){
//	  printOut += "watched ";
// }
// else {
//		printOut += "not seen ";
// }
// printOut += "\"" + movie.title + "\" - " + movie.rating + "/10";
//
// To clean all the logic up some more, you can define a function that takes a movie object
//   and build the string in that function then return the built string.