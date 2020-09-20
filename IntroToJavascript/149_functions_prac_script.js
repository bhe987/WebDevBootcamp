// Monday July 20, 2020
function isEven(num){
	if (num % 2 === 0) {
		return true;
	}
	return false;
	//can be refactored to a simple return num % 2 === 0;
}
function factorial(num){
	var product = 1;
	if (num === 0){
		return product;
	}

	for (var i = num; i > 0; i--){
		product *= i;
	}
	return product;
}
function kebabToSnake(statement){
	// for(var i = 0; i < statement.length; i++){
	// 	if (statement[i] == "-"){
	// 		statement[i] = '_';
	// 	}
	// }
	var newStatement = statement.replace(/-/g, "_");
	return newStatement;
}
console.log(factorial(5));
console.log(kebabToSnake("hello-world-there"));