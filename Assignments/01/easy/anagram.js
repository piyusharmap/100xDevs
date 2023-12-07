/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
	// first check if their length is same or not
	// if not return false
	if (str1.length !== str2.length) {
		return false;
	}

	// convert the strings to lower case to handle cases with irregularities in casing
	str1 = str1.toLowerCase();
	str2 = str2.toLowerCase();

	// keep check of the letters along with their frequency for both the strings
	const letterCount1 = {};
	const letterCount2 = {};

	// loop over the string and if it's a letter store it in the object
	for (let char of str1) {
		if (char !== " ") {
			letterCount1[char] = (letterCount1[char] || 0) + 1;
		}
	}

	for (let char of str2) {
		if (char !== " ") {
			letterCount2[char] = (letterCount2[char] || 0) + 1;
		}
	}

	// now compare both the frequency maps
	for (let char in letterCount1) {
		if (letterCount2[char] !== letterCount1[char]) {
			return false;
		}
	}

	return true;
}

module.exports = isAnagram;
