/*
 * @lc app=leetcode id=540 lang=javascript
 *
 * [540] Single Element in a Sorted Array
 *
 * https://leetcode.com/problems/single-element-in-a-sorted-array/description/
 *
 * algorithms
 * Medium (58.07%)
 * Likes:    4271
 * Dislikes: 102
 * Total Accepted:    256.1K
 * Total Submissions: 436.3K
 * Testcase Example:  '[1,1,2,3,3,4,4,8,8]'
 *
 * You are given a sorted array consisting of only integers where every element
 * appears exactly twice, except for one element which appears exactly once.
 * 
 * Return the single element that appears only once.
 * 
 * Your solution must run in O(log n) time and O(1) space.
 * 
 * 
 * Example 1:
 * Input: nums = [1,1,2,3,3,4,4,8,8]
 * Output: 2
 * Example 2:
 * Input: nums = [3,3,7,7,10,11,11]
 * Output: 10
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums.length <= 10^5
 * 0 <= nums[i] <= 10^5
 * 
 * 
 */

// @lc code=start
const ft = require("./testFrame");
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
    let n = nums.length, left = 0, right = n;
    while (left < right) {
        let mid = (left + right) >> 1;
        // console.log(left, right, mid)
        if (nums[mid] === nums[mid - 1]) {
            mid & 1 ? left = mid + 1 : right = mid - 1;
            continue;
        }
        if (nums[mid] === nums[mid + 1]) {
            mid & 1 ? right = mid : left = mid + 2;
            continue;
        }
        return mid;

    }
};
let testcases = [
    [[1, 1, 3, 3, 4, 4, 7, 8, 8]],
    [[1, 1, 2, 3, 3, 4, 4, 8, 8]],
    [[3, 3, 5, 7, 7, 11, 11]],
    [[3, 3, 7, 7, 10, 11, 11]],
    [[1]],
    [[1, 1, 2]],
    [[1, 2, 2]]

]
const tf = require('./testFrame');
tf.run(singleNonDuplicate, testcases);
// @lc code=end

