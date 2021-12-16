/*
 * @lc app=leetcode id=852 lang=javascript
 *
 * [852] Peak Index in a Mountain Array
 *
 * https://leetcode.com/problems/peak-index-in-a-mountain-array/description/
 *
 * algorithms
 * Easy (71.37%)
 * Likes:    1798
 * Dislikes: 1531
 * Total Accepted:    291.4K
 * Total Submissions: 408.2K
 * Testcase Example:  '[0,1,0]'
 *
 * Let's call an array arr a mountain if the following properties hold:
 * 
 * 
 * arr.length >= 3
 * There exists some i with 0 < i < arr.length - 1 such that:
 * 
 * arr[0] < arr[1] < ... arr[i-1] < arr[i] 
 * arr[i] > arr[i+1] > ... > arr[arr.length - 1]
 * 
 * 
 * 
 * 
 * Given an integer array arr that is guaranteed to be a mountain, return any i
 * such that arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... >
 * arr[arr.length - 1].
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: arr = [0,1,0]
 * Output: 1
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: arr = [0,2,1,0]
 * Output: 1
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: arr = [0,10,5,2]
 * Output: 1
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 3 <= arr.length <= 10^4
 * 0 <= arr[i] <= 10^6
 * arr is guaranteed to be a mountain array.
 * 
 * 
 * 
 * Follow up: Finding the O(n) is straightforward, could you find an O(log(n))
 * solution?
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
console.enableLog = true
var peakIndexInMountainArray = function (arr) {
    let left = 0, right = arr.length - 1
    while (left < right) {
        let mid = (left + right) >> 1
        if (arr[mid] > arr[mid + 1]) {
            right = mid
        } else {
            if (arr[mid] > arr[mid + 1]) {
                return mid
            }
            left = mid + 1
        }
    }
    return right

};
// @lc code=end

let tf = require("./testFrame");

let testcases = [
    [[0, 1, 0]],
    [[0, 2, 1, 0]],
    [[0, 10, 5, 2]],
    [[0, 1, 10, 5, 2]],
];
tf.run(peakIndexInMountainArray, testcases);

