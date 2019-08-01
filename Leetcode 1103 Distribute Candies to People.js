/*
 * @lc app=leetcode id=1103 lang=javascript
 *
 * [1103] Distribute Candies to People
 *
 * https://leetcode.com/problems/distribute-candies-to-people/description/
 *
 * algorithms
 * Easy (63.21%)
 * Likes:    42
 * Dislikes: 5
 * Total Accepted:    4.7K
 * Total Submissions: 7.4K
 * Testcase Example:  '7\n4'
 *
 * We distribute some number of candies, to a row of n = num_people people in
 * the following way:
 *
 * We then give 1 candy to the first person, 2 candies to the second person,
 * and so on until we give n candies to the last person.
 *
 * Then, we go back to the start of the row, giving n + 1 candies to the first
 * person, n + 2 candies to the second person, and so on until we give 2 * n
 * candies to the last person.
 *
 * This process repeats (with us giving one more candy each time, and moving to
 * the start of the row after we reach the end) until we run out of candies.
 * The last person will receive all of our remaining candies (not necessarily
 * one more than the previous gift).
 *
 * Return an array (of length num_people and sum candies) that represents the
 * final distribution of candies.
 *
 *
 * Example 1:
 *
 *
 * Input: candies = 7, num_people = 4
 * Output: [1,2,3,1]
 * Explanation:
 * On the first turn, ans[0] += 1, and the array is [1,0,0,0].
 * On the second turn, ans[1] += 2, and the array is [1,2,0,0].
 * On the third turn, ans[2] += 3, and the array is [1,2,3,0].
 * On the fourth turn, ans[3] += 1 (because there is only one candy left), and
 * the final array is [1,2,3,1].
 *
 *
 * Example 2:
 *
 *
 * Input: candies = 10, num_people = 3
 * Output: [5,2,3]
 * Explanation:
 * On the first turn, ans[0] += 1, and the array is [1,0,0].
 * On the second turn, ans[1] += 2, and the array is [1,2,0].
 * On the third turn, ans[2] += 3, and the array is [1,2,3].
 * On the fourth turn, ans[0] += 4, and the final array is [5,2,3].
 *
 *
 *
 * Constraints:
 *
 *
 * 1 <= candies <= 10^9
 * 1 <= num_people <= 1000
 *
 */
/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
let tester = require('./testFrame');

var solution = function (candies, num_people) {
    const baseCount = (1 + num_people) * num_people / 2
    let round = 0,
        result = new Array(num_people),
        remainder = candies
    while (remainder > 0) {
        remainder -= baseCount + round * num_people ** 2
        round++
    }

    remainder = candies

    for (let i = 0, base = (round - 1) * (round - 2) * num_people / 2; i < num_people; i++) {
        result[i] = base + (round - 1) * (i + 1)
        remainder -= result[i]
    }

    let i = 0, base
    for (let t = (round - 1) * num_people; i < num_people && remainder > 0; i++) {
        base = t + i + 1
        result[i] += base
        remainder -= base
    }

    if (remainder < 0) {
        result[i - 1] += remainder
    }

    return result

};

let testcases = [
    [10, 4],
    [12, 4],
    [7, 4],
    [60, 4],//[15,18,15,12]
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
