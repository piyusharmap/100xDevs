/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
	// if the numbers array is empty return undefined
	if (numbers.length === 0) {
		return undefined;
	}

	// consider the first element of the array as the largest
	let largestNum = numbers[0];

	// now iterate over the array and check if the present element is greater or equal to the largest element or not
	// if it is -> assign present element to the largest element
	for (let num of numbers) {
		if (num >= largestNum) {
			largestNum = num;
		}
	}

	return largestNum;
}

module.exports = findLargestElement;
