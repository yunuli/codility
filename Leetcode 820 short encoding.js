/*
 * @lc app=leetcode id=820 lang=javascript
 *
 * [820] Short Encoding of Words
 *
 * https://leetcode.com/problems/short-encoding-of-words/description/
 *
 * algorithms
 * Medium (49.13%)
 * Likes:    196
 * Dislikes: 51
 * Total Accepted:    11.1K
 * Total Submissions: 22.6K
 * Testcase Example:  '["time", "me", "bell"]'
 *
 * Given a list of words, we may encode it by writing a reference string S and
 * a list of indexes A.
 *
 * For example, if the list of words is ["time", "me", "bell"], we can write it
 * as S = "time#bell#" and indexes = [0, 2, 5].
 *
 * Then for each index, we will recover the word by reading from the reference
 * string from that index until we reach a "#" character.
 *
 * What is the length of the shortest reference string S possible that encodes
 * the given words?
 *
 * Example:
 *
 *
 * Input: words = ["time", "me", "bell"]
 * Output: 10
 * Explanation: S = "time#bell#" and indexes = [0, 2, 5].
 *
 *
 *
 *
 * Note:
 *
 *
 * 1 <= words.length <= 2000.
 * 1 <= words[i].length <= 7.
 * Each word has only lowercase letters.
 *
 *
 */

// @lc code=start
'use strict'
/**
 * @param {string[]} words
 * @return {number}
 */
let minimumLengthEncodingGetDictString = function (words) {
    let reversedWords = words.map((word, index) => {
        word = word.split('').reverse().join('');
        return {word, index}
    })
    let current = '', slice, resultString = '';

    reversedWords.sort((a, b) => (b.word - a.word)).forEach((item, index) => {
        if (current.indexOf(item.word) === 0) {

        }
    })
};

let minimumLengthEncoding = function (words) {
    let prev = '', finalLength = 0;
    words.map((word) => {
        return word.split('').reverse().join('');
    }).sort((a, b) => (b - a))
        .forEach((word) => {

        if (prev.indexOf(word) === 0) return;

        finalLength += (word.length + 1);
        prev = word;
    })
    return finalLength;
}
// @lc code=end
test('run', () => {
    expect(minimumLengthEncoding(["time", "me", "bell"])).toEqual(10);
    // expect(minimumLengthEncoding([5, 4, 3, 2, 1])).toBe(0);
})
