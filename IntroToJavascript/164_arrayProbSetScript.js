// Tuesday August 4, 2020
function printReverse(arr){
	for(var i = arr.length-1; i >= 0; i--){
		console.log(arr[i]);
	}
}
function isUniform(arr){
	for(var i = 0; i < arr.length - 1; i++){
		if (arr[i] !== arr[i+1]){
			return false;
		}		
	}
	return true;
}
function sumArray(nums){
	var sum = 0;
	for(var i = 0; i < nums.length; i++){
		sum += nums[i];
	}
	return sum;
}
function max(nums){
	var max = nums[0];
	for (var i = 0; i < nums.length; i++){
		if (nums[i] > max){
			max = nums[i];
		}
	}
	return max;
}