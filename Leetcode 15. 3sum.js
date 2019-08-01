let ft = require('./testFrame');

/*
 * @lc app=leetcode id=15 lang=javascript
 *
 * [15] 3Sum
 *
 * https://leetcode.com/problems/3sum/description/
 *
 * algorithms
 * Medium (24.22%)
 * Likes:    3992
 * Dislikes: 456
 * Total Accepted:    577.9K
 * Total Submissions: 2.4M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * Given an array nums of n integers, are there elements a, b, c in nums such
 * that a + b + c = 0? Find all unique triplets in the array which gives the
 * sum of zero.
 *
 * Note:
 *
 * The solution set must not contain duplicate triplets.
 *
 * Example:
 *
 *
 * Given array nums = [-1, 0, 1, 2, -1, -4],
 *
 * A solution set is:
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 *
 *
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 *
 *
 */

function* range(n) {
    let i = 0;
    while (i < n) {
        yield i++;
    }
}

let threeSum = function (nums) {
    console.time('threesum');
    for (let i of range(1000)) {
        for (let j of range(1000)) {
            for (let k of range(1000)) {
                (i+j+k);

            }
        }
    }
    console.timeEnd('threesum')
}


let testcases = [
    [[-1, 0, 1, 2, -1, -4]],
    // [[3, 1]],
    // [[1,2,3,4,8,100, 70]],
    // [[3]]
];

ft.run(threeSum, testcases);

