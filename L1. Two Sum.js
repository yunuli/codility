/***

 Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

 You may assume that each input would have exactly one solution, and you may not use the same element twice.

 You can return the answer in any order.



 Example 1:

 Input: nums = [2,7,11,15], target = 9
 Output: [0,1]
 Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 Example 2:

 Input: nums = [3,2,4], target = 6
 Output: [1,2]
 Example 3:

 Input: nums = [3,3], target = 6
 Output: [0,1]


 Constraints:

 2 <= nums.length <= 104
 -109 <= nums[i] <= 109
 -109 <= target <= 109
 Only one valid answer exists.


 Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

 *
 */
const tf = require('./testFrame');
const testCases = [[[2, 7, 11, 15], 9], [[3, 2, 4], 6], [[3, 3], 6]]

function ts(ns, t) {
    const m = new Map();
    for (let i = 0; i < ns.length; i++) {
        const e = ns[i], pair = t - e, pairIndex = m.get(pair);
        if (pairIndex !== undefined) {
            return [pairIndex, i]
        }
        m.set(e, i);

    }
    return []
}

tf.run(ts, testCases);
