/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
	// remove everything expect the letters from the string because we are not concerned with all those things
	str = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

	const strLength = str.length;

	// now iterate only up to half the string length to check palindrome
	for (let i = 0; i < strLength / 2; ++i) {
		// compare the characters from the front and the back
		if (str[i] !== str[strLength - i - 1]) {
			// if the characters don't match return false
			return false;
		}
	}

	return true;
}

module.exports = isPalindrome;
