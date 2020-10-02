// Sunday July 12, 2020
var age = prompt("How old are you?");
if (age < 0) {
	console.log("Error: Age not valid.");
}
if (age % 2 == 1) {
	console.log("Your age is odd!");
}
if (age < 18) {
	console.log("Unfortunately, you cannot enter this venue");
}
if (age == 4 || age == 9 || age == 25 || age == 36||age==49||age==64||age==81){
	console.log("Perfect Square!");
}
else if (age < 21) {
	console.log("You may enter, but you cannot drink alcohol.");
}
else if (age == 21) {
	console.log("Happy 21st birthday! Welcome!");
}
else {
	console.log("Welcome. Enjoy the event.");
}