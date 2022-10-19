/***
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 *
 * Notice that the solution set must not contain duplicate triplets.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 * Explanation:
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
 * The distinct triplets are [-1,0,1] and [-1,-1,2].
 * Notice that the order of the output and the order of the triplets does not matter.
 * Example 2:
 *
 * Input: nums = [0,1,1]
 * Output: []
 * Explanation: The only possible triplet does not sum up to 0.
 * Example 3:
 *
 * Input: nums = [0,0,0]
 * Output: [[0,0,0]]
 * Explanation: The only possible triplet sums up to 0.
 * @param nums
 */


var threeSum = function (nums) {
    const signature = new Set();
    let results = [];
    for (let i = 0; i < nums.length; i++) {
        let twoSumResult = twoSum(nums, 0 - nums[i], i + 1, nums.length);

        if (twoSumResult.length) {
            twoSumResult = twoSumResult.map(item => item.concat(nums[i]));
            twoSumResult = twoSumResult.filter(item => {
                const s = getSignature(item);
                if (signature.has(s)) return false;
                signature.add(s);
                return true;
            })
            results = results.concat(twoSumResult)
        }
    }
    return results
};

function getSignature(nums3) {
    nums3.sort((a, b) => (a - b));
    return nums3.toString();
}

function twoSum(nums, target, s, e) {
    const result = [];
    const map = {}
    for (let i = s; i < e; i++) {
        const n = nums[i];
        map[n] = map[n] ? map[n] + 1 : 1;
    }

    for (let i = s; i < e; i++) {
        const n = nums[i], complement = target - n;
        if ((n === complement && map[n] > 1) ||
            (n !== complement && map[complement])) {
            result.push([n, complement])
            delete map[n];
            delete map[complement];
        }
    }
    return result
}

const tf = require('./testFrame');
const testCases = [
    [[-1, 0, 1, 2, -1, -4,-1, 0, 1, 2, -1, -4,-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4,-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4-1, 0, 1, 2, -1, -4]],
    // [[0, 1, 1]],
    // [[0, 0, 0]]
    // [[1, 2], [3, 4, 5, 6]],
    // [[1, 2], [-1, 3]],
]

tf.run(threeSum, testCases);
