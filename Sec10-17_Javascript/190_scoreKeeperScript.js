var player1btn = document.getElementById("p1");
var player2btn = document.getElementById("p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.getElementById("p2Display");
var resetBtn = document.getElementById("reset");
var numInput = document.querySelector("input");
var p = document.querySelector("p");
var winningScoreDisplay = document.querySelector("p span")
var player1Score = 0;
var player2Score = 0;
var gameOver = false;
var winningScore = 5;

player1btn.addEventListener("click", function(){
	if(!gameOver){
		player1Score++;
		if(player1Score == winningScore){
			p1Display.classList.add("winner");
			gameOver = true;
		}
		p1Display.textContent = player1Score;
	}

});

player2btn.addEventListener("click", function(){
	if(!gameOver){
		player2Score++;
		if (player2Score == winningScore){
			p2Display.classList.add("winner");
			gameOver = true;
		}
		p2Display.textContent = player2Score;
	}
});

resetBtn.addEventListener("click", function(){
	reset();
});

numInput.addEventListener("change", function(){
	winningScoreDisplay.textContent = numInput.value;
	winningScore = Number(numInput.value);
	//you can also use this.value.
	reset();
});

function reset(){
	player1Score = 0;
	player2Score = 0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	gameOver = false;
}