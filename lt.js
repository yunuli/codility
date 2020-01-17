let tester = require('./testFrame');
/*
 * @lc app=leetcode id=994 lang=javascript
 *
 * [994] Rotting Oranges
 *
 * https://leetcode.com/problems/rotting-oranges/description/
 *
 * algorithms
 * Easy (46.39%)
 * Likes:    257
 * Dislikes: 14
 * Total Accepted:    13.1K
 * Total Submissions: 28.2K
 * Testcase Example:  '[[2,1,1],[1,1,0],[0,1,1]]'
 *
 * In a given grid, each cell can have one of three values:
 *
 *
 * the value 0 representing an empty cell;
 * the value 1 representing a fresh orange;
 * the value 2 representing a rotten orange.
 *
 *
 * Every minute, any fresh orange that is adjacent (4-directionally) to a
 * rotten orange becomes rotten.
 *
 * Return the minimum number of minutes that must elapse until no cell has a
 * fresh orange.  If this is impossible, return -1 instead.
 *
 *
 *
 *
 * Example 1:
 *
 *
 *
 *
 * Input: [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 *
 *
 *
 * Example 2:
 *
 *
 * Input: [[2,1,1],[0,1,1],[1,0,1]]
 * Output: -1
 * Explanation:  The orange in the bottom left corner (row 2, column 0) is
 * never rotten, because rotting only happens 4-directionally.
 *
 *
 *
 * Example 3:
 *
 *
 * Input: [[0,2]]
 * Output: 0
 * Explanation:  Since there are already no fresh oranges at minute 0, the
 * answer is just 0.
 *
 *
 *
 *
 * Note:
 *
 *
 * 1 <= grid.length <= 10
 * 1 <= grid[0].length <= 10
 * grid[i][j] is only 0, 1, or 2.
 *
 *
 *
 *
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
"use strict"

var  plusOne = function(digits) {
    let carry = 1
    for (let i = digits.length - 1; carry === 1 && i > -1; i--) {
        if (digits[i] === 9) {
            digits[i] = 0
        } else {
            carry = 0
            digits[i]++
        }
    }
    if (carry) {
            console.log(digits.length + 1)
        for (let i = 1; i < digits.length + 1; i++) {
            digits[i] = 0
        }
        digits[0] = 1
    }
    return digits;

};
plusOne([9])

let testcases = [
    [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]],
    [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]],
    // [6, [3, 4, 5, 5, 2]],
    // [5, [1, 1, 2, 2, 3, 3]],
    // ,
    // [10, [1, 1, 1, 1, 1, 1, 1, 1]],
    // [10, [1, 2, 3, 4, 5, 6, 7]]
    // ,
    // [10,function(){
    //     let a = [];
    //     for (let i = 0; i < 10; i++) {
    //         a[i] = Math.random();
    //     }
    //     return a;
    // }()]
    // // ,
    // [[]],
    // [[]]
];

tester.run(solution, testcases);
