// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
//
//
//
//     Example 1:
//
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// Example 2:
//
// Input: nums = [0,1]
// Output: [[0,1],[1,0]]
// Example 3:
//
// Input: nums = [1]
// Output: [[1]]
//
//
// Constraints:
//
//     1 <= nums.length <= 6
//     -10 <= nums[i] <= 10
// All the integers of nums are unique.
//     Accepted
// 957,882
// Submissions
// 1,371,799

let results = [], nums = [1, 2, 3], end = nums.length;

function perm(start) {
    
    if (start === end - 1) {
        console.log('get one:', nums)
        results.push([].concat(nums))
        return
    }
    // perm(start + 1)
    for (let i = start; i < end; i++) {
        [nums[i], nums[start]] = [nums[start], nums[i]]
        console.log('perm before',start, nums)
        perm(start + 1);
        [nums[i], nums[start]] = [nums[start], nums[i]]
        console.log('perm after ',start, nums);
    }

}

perm(0);