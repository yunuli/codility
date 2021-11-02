/***
 *Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.



 Example 1:

 Input: nums = [1,1,1], k = 2
 Output: 2
 Example 2:

 Input: nums = [1,2,3], k = 3
 Output: 2


 Constraints:

 1 <= nums.length <= 2 * 104
 -1000 <= nums[i] <= 1000
 -107 <= k <= 107
 */

/**
 * @param {array<int>} nums
 * @param {int} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    let sum = 0, hashmap = {0: 1}, cnt = 0;
    for (let num of nums) {
        sum += num
        console.log(sum)
        if (hashmap[sum - k] !== undefined) {

            cnt += hashmap[sum - k]
            console.log(cnt)
        }

        hashmap[sum] = hashmap[sum] ? (hashmap[sum] + 1) : 1
        console.log(hashmap)

    }
    return cnt
};


let kk = subarraySum([1, 1, 1], 2)
console.log(kk)
// @lc code=end

