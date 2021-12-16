/*
 * @lc app=leetcode id=870 lang=javascript
 *
 * [870] Advantage Shuffle
 *
 * https://leetcode.com/problems/advantage-shuffle/description/
 *
 * algorithms
 * Medium (50.95%)
 * Likes:    1149
 * Dislikes: 72
 * Total Accepted:    50.1K
 * Total Submissions: 98.2K
 * Testcase Example:  '[2,7,11,15]\n[1,10,4,11]'
 *
 * You are given two integer arrays nums1 and nums2 both of the same length.
 * The advantage of nums1 with respect to nums2 is the number of indices i for
 * which nums1[i] > nums2[i].
 * 
 * Return any permutation of nums1 that maximizes its advantage with respect to
 * nums2.
 * 
 * 
 * Example 1:
 * Input: nums1 = [2,7,11,15], nums2 = [1,10,4,11]
 * Output: [2,11,7,15]
 * Example 2:
 * Input: nums1 = [12,24,8,32], nums2 = [13,25,32,11]
 * Output: [24,32,8,12]
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= nums1.length <= 10^5
 * nums2.length == nums1.length
 * 0 <= nums1[i], nums2[i] <= 10^9
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function sortNumber(a, b) {
    return a - b
}

var advantageCount = function (nums1, nums2) {
    let nums1Sorted = nums1.sort(sortNumber), nums2Sorted = [...nums2].sort(sortNumber);
    let assigned = new Map(), reminds = [];
    let i2 = 0;
    nums2Sorted.forEach(num => {
        assigned.set(num, [])
    })
    nums1Sorted.forEach(num => {
        console.log(num, nums2Sorted[i2])
        if (num > nums2Sorted[i2]) {
            assigned.get(nums2Sorted[i2]).push(num)
            i2++;
        } else {
            reminds.push(num)
        }
    })

    let result = Array(nums1.length)
    nums2.forEach((num, index) => {
        let assignedArray = assigned.get(num)
        result[index] = assignedArray.length > 0 ? assignedArray.pop() : reminds.pop()
    })
    return result;

}
// @lc code=end

let tf = require("./testFrame");

/* Input: nums1 = [2,7,11,15], nums2 = [1,10,4,11]
    * Output: [2,11,7,15]
* Example 2:
* Input: nums1 = [12,24,8,32], nums2 = [13,25,32,11]
    * Output: [24,32,8,12]
 */
let testcases = [
    [[2, 7, 11, 15], [1, 10, 4, 11]],
    [[12, 24, 8, 32], [13, 25, 32, 11]],
];
tf.run(advantageCount, testcases);

