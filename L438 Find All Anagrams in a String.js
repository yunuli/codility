/*
 * @lc app=leetcode id=438 lang=javascript
 *
 * [438] Find All Anagrams in a String
 *
 * https://leetcode.com/problems/find-all-anagrams-in-a-string/description/
 *
 * algorithms
 * Medium (46.48%)
 * Likes:    8032
 * Dislikes: 263
 * Total Accepted:    566.7K
 * Total Submissions: 1.2M
 * Testcase Example:  '"cbaebabacd"\n"abc"'
 *
 * Given two strings s and p, return an array of all the start indices of p's
 * anagrams in s. You may return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a
 * different word or phrase, typically using all the original letters exactly
 * once.
 *
 *
 * Example 1:
 *
 *
 * Input: s = "cbaebabacd", p = "abc"
 * Output: [0,6]
 * Explanation:
 * The substring with start index = 0 is "cba", which is an anagram of "abc".
 * The substring with start index = 6 is "bac", which is an anagram of "abc".
 *
 *
 * Example 2:
 *
 *
 * Input: s = "abab", p = "ab"
 * Output: [0,1,2]
 * Explanation:
 * The substring with start index = 0 is "ab", which is an anagram of "ab".
 * The substring with start index = 1 is "ba", which is an anagram of "ab".
 * The substring with start index = 2 is "ab", which is an anagram of "ab".
 *
 *
 *
 * Constraints:
 *
 *
 * 1 <= s.length, p.length <= 3 * 10^4
 * s and p consist of lowercase English letters.
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
let findAnagrams = function(s, p) {

};
// @lc code=end

const tf = require("./testFrame");
let testcases = [
    ['abab', 'ab'],//[0,1,2]
    ['cbaebabacd', 'abc'],//[0,6]
    ['a','b'],//[]
    ['a','a'],//[0]
    ['aaaaaa','a'],//[0,1,2,3,4,5]
]
tf.run(sort, testcases);
