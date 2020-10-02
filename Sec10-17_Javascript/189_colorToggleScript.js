// Thursday August 27, 2020
var body = document.getElementsByTagName("body")[0];
var button = document.querySelector("button");
// button.addEventListener("click", function(){
// 	if (body.style.backgroundColor == "white"){
// 		body.style.backgroundColor = "purple";
// 	}
// 	else {
// 		body.style.backgroundColor = "white";
// 	}
// });

// here is an even shorter solution!
button.addEventListener("click", function(){
	body.classList.toggle("purple");
});