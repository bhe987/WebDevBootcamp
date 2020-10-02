// Thursday July 16, 2020
// var areWeThereYet = prompt("Are We There Yet?");

// while(areWeThereYet !== "yes" && areWeThereYet !== "yeah"){
// 	areWeThereYet = prompt("are we there yet?");
// }

// alert("YAY, we made it!");

// Version 2

var areWeThereYet = prompt("Are We There Yet?");

while(areWeThereYet.indexOf("yes") == -1 && areWeThereYet.indexOf("yeah") == -1){
	areWeThereYet = prompt("are we there yet?");
}

alert("YAY, we made it!");