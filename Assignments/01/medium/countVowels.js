/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
	// make a list which contains all the vowels in lowercase
	const vowelsList = ["a", "e", "i", "o", "u"];

	// set the initial counter to 0
	let vowelCount = 0;

	// iterate over the string, if the character encountered is present in the vowel list, increment the counter
	for (let char of str) {
		if (vowelsList.includes(char.toLowerCase())) {
			vowelCount++;
		}
	}

	return vowelCount;
}

module.exports = countVowels;
