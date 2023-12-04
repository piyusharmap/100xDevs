/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
	// NOTE: As JS is synchronous in nature, we can use this property to record the time before and after the loop execution

	// record the start time
	const startTime = new Date();

	// run just an empty loop for the purpose of measuring time
	for (let i = 0; i < n; i++) {}

	// record the end time
	const endTime = new Date();

	// calculate the time difference between the end and start
	const elapsedTime = (endTime - startTime) / 1000;

	return elapsedTime;
}

console.log(calculateTime(100));
console.log(calculateTime(100000));
console.log(calculateTime(1000000000));
