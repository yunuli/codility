/*
 * @lc app=leetcode id=45 lang=javascript
 *
 * [45] Jump Game II
 *
 * https://leetcode.com/problems/jump-game-ii/description/
 *
 * algorithms
 * Hard (27.63%)
 * Likes:    1234
 * Dislikes: 66
 * Total Accepted:    175.1K
 * Total Submissions: 619.9K
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * Given an array of non-negative integers, you are initially positioned at the
 * first index of the array.
 *
 * Each element in the array represents your maximum jump length at that
 * position.
 *
 * Your goal is to reach the last index in the minimum number of jumps.
 *
 * Example:
 *
 *
 * Input: [2,3,1,1,4]
 * Output: 2
 * Explanation: The minimum number of jumps to reach the last index is 2.
 * ⁠   Jump 1 step from index 0 to 1, then 3 steps to the last index.
 *
 * Note:
 *
 * You can assume that you can always reach the last index.
 *
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
let tester = require('./testFrame');
let solution1 = function (nums) {

    let len = nums.length,
        curMax = -1,
        nextMax = 0,
        step = -1;
    for (let i = 0; i < len; i++) {

        if (nextMax >= len - 1) return step + 1;
        if (i > curMax) {
            curMax = nextMax;
            step++;
        }


        if (nextMax < nums[i] + i) {
            nextMax = nums[i] + i;
        }

    }
    return step
};
let solution2 = function (nums) {

    let len = nums.length,
        stepRightBoundary = -1,//right most distance current stepCount can reach
        currentRightMostDistance = 0,//right most distance we can reach currently
        stepCount = 0;
    for (let i = 0; i < len; i++) {

        if (currentRightMostDistance >= len - 1) return stepCount;
        if (i > stepRightBoundary) {
            stepRightBoundary = currentRightMostDistance;
            stepCount++;
        }

        if (currentRightMostDistance < nums[i] + i) {
            currentRightMostDistance = nums[i] + i;
        }


    }
}

let testcases = [
    [[2,3,1,1,4]],
    [[0]],
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

tester.run(solution2, testcases);
