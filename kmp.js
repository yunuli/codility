/*
 * @lc app=leetcode id=28 lang=javascript
 *
 * [28] Implement strStr()
 *
 * https://leetcode.com/problems/implement-strstr/description/
 *
 * algorithms
 * Easy (34.41%)
 * Likes:    1742
 * Dislikes: 1998
 * Total Accepted:    710.3K
 * Total Submissions: 2.1M
 * Testcase Example:  '"hello"\n"ll"'
 *
 * Implement strStr().
 *
 * Return the index of the first occurrence of needle in haystack, or -1 if
 * needle is not part of haystack.
 *
 * Example 1:
 *
 *
 * Input: haystack = "hello", needle = "ll"
 * Output: 2
 *
 *
 * Example 2:
 *
 *
 * Input: haystack = "aaaaa", needle = "bba"
 * Output: -1
 *
 *
 * Clarification:
 *
 * What should we return when needle is an empty string? This is a great
 * question to ask during an interview.
 *
 * For the purpose of this problem, we will return 0 when needle is an empty
 * string. This is consistent to C's strstr() and Java's indexOf().
 *
 *
 * Constraints:
 *
 *
 * haystack and needle consist only of lowercase English characters.
 *
 *
 */

// @lc code=start


function findNext1(needle) {
    let next = new Array(needle.length)

    next[0] = -1
    //count代表前面已经有count个值匹配，下一个要匹配的坐标为count
    let count = -1
    for (let i = 1; i < next.length; i++) {
        while (count > -1 && needle[i - 1] !== needle[count]) {
            count = next[count]
        }
        next[i] = ++count

        if (needle[i] === needle[count]) {
            next[i] = next[count]
        }

    }
    console.log(next);
    // return next
}

function findNext2(needle) {
    let next = new Array(needle.length)

    next[0] = -1

    for (let i = 1; i < next.length; i++) {
        let j = i - 1
        while (next[j] > -1 && needle[i - 1] !== needle[next[j]]) {
            j = next[j]
        }

        next[i] = next[j] + 1;
    }
    for (let i = 1; i < next.length; i++) {
        if (needle[i] === needle[next[i]]) {
            next[i] = next[next[i]]
        }
    }
    console.log(next);
    return next
}

function findNext3(needle) {
    let next = new Array(needle.length)

    next[0] = -1

    let i = 1, k = -1;

    while (i < needle.length) {
        if (k === -1 || next[i - 1] === next[k]) {
            i++;
            k++;

            next[i] = k;
        } else {
            k = next[k]
        }
    }
}


/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {

};
// newf('ababaca')
console.log('------')
// findNext('ababaca')
console.log('------')
// newf('xyxyyxyxyxx')
console.log('------')
findNext1('xyxyyxyxyxx')
findNext2('xyxyyxyxyxx')
findNext3('xyxyyxyxyxx')
console.log('------')
findNext('abcdabcee')
console.log('------')
// findNext('abcabd')
// findNext('abcdeft')
// findNext('abcabdeeabcabd')
// findNext('abcabdabc')
// @lc code=end

