// Wednesday July 15, 2020
console.log("1. Print all numbers between -10 and 9.");
var a = -10
while (a <= 9) {
	console.log(a);
	a++;
}

console.log("2. Print all even numbers between 10 and 40.");
a = 10;
while(a < 41){
	if (a % 2 == 0){
		console.log(a);
	}
	a++;
}

console.log("3. Print all odd numbers between 300 and 333.");
a = 300;
while (a <= 333) {
	if (a % 2 === 1){
		console.log(a);
	}
	a++;
}

console.log("4. Print all numbers divisible by 5 AND 3 between 5 and 50.");
a = 5;
while (a < 51) {
	if (a % 3 == 0 && a % 5 == 0){
		console.log(a);
	}
	a++;
}