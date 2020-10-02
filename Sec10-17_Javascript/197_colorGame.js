// Sunday August 30, 2020
var numSquares = 6;
var colors  = []/*= generateRandomColors(numSquares)*/;
var pickedColor/* = pickColor()*/;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var diffModeButtons = document.querySelectorAll(".diffMode");

initialize();

function initialize(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	//mode buttons event listeners
	for (var i = 0; i < diffModeButtons.length; i++) {
		diffModeButtons[i].addEventListener("click", function(){
			diffModeButtons[0].classList.remove("selected");
			diffModeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//figure out how many colors to show
			// if (this.textContent === "Easy"){
			// 	numSquares = 3;
			// }
			// else {
			// 	numSquares = 6;
			// } using ternary operator here
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
			//pick new colors
			//pick a new pickedColor
			//update page to reflect changes
		});
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++){
		//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to picked color
			if (clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(pickedColor);
				h1.style.backgroundColor = clickedColor;
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from the array
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	//change the colors of squares on the page
	for (var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}		
	}
	//reset the background color of the h1 if there was a win before
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});

//colorDisplay.textContent = pickedColor;

function changeColors(color) {
	//loop through all squares
	for (var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}

}
function pickColor(){
	// pick a random number from 0 to (number of colors - 1)
	var randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}
function generateRandomColors(num) {
	//make an array
	arr = [];
	//add num random colors to array. repeat num times
	for (var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	//return the array
	return arr;
}
function randomColor(){
	//pick a "red" from 0 to 255 inclusive
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 to 255 inclusive
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 to 255 inclusive
	var b = Math.floor(Math.random() * 256);
	//"rgb(r, g, b)"
	return "rgb(" + r + ", " + g + ", " + b + ")";
}