/*
 * @lc app=leetcode id=818 lang=javascript
 *
 * [818] Race Car
 *
 * https://leetcode.com/problems/race-car/description/
 *
 * algorithms
 * Hard (41.35%)
 * Likes:    757
 * Dislikes: 81
 * Total Accepted:    28.7K
 * Total Submissions: 69.3K
 * Testcase Example:  '3'
 *
 * Your car starts at position 0 and speed +1 on an infinite number line. Your
 * car can go into negative positions. Your car drives automatically according
 * to a sequence of instructions 'A' (accelerate) and 'R' (reverse):
 * 
 * 
 * When you get an instruction 'A', your car does the following:
 * 
 * 
 * position += speed
 * speed *= 2
 * 
 * 
 * When you get an instruction 'R', your car does the following:
 * 
 * If your speed is positive then speed = -1
 * otherwise speed = 1
 * 
 * Your position stays the same.
 * 
 * 
 * For example, after commands "AAR", your car goes to positions 0 --> 1 --> 3
 * --> 3, and your speed goes to 1 --> 2 --> 4 --> -1.
 * 
 * Given a target position target, return the length of the shortest sequence
 * of instructions to get there.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: target = 3
 * Output: 2
 * Explanation: 
 * The shortest instruction sequence is "AA".
 * Your position goes from 0 --> 1 --> 3.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: target = 6
 * Output: 5
 * Explanation: 
 * The shortest instruction sequence is "AAARA".
 * Your position goes from 0 --> 1 --> 3 --> 7 --> 7 --> 6.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= target <= 10^4
 * 
 * 
 */

// @lc code=start
const tf = require("./testFrame");
/**
 * @param {number} target
 * @return {number}
 */
let resultMap = {0: 0, 1: 1};
let racecar = function (target) {
    let absTarget = Math.abs(target);
    if (resultMap[target] !== undefined) return resultMap[target];
    let n = 1, step = 1;
    while (n < absTarget) {
        n += 1 << step;
        step++;
    }
    if (n === absTarget) {
        if (n === -target) step++;
        resultMap[target] = step;
        return step;
    }

    let prev = n >> 1;
    let remainderLeft = Math.abs(target) - prev, reminderRight = n - absTarget;

    step += Math.min(racecar(remainderLeft) + 1,
        racecar(-remainderLeft), racecar(reminderRight) + 1)
    resultMap[target] = step;
    return step;


};
 racecar = (target) => {
    let q = [[0, 1]];
    let visit = new Set(['0 1', '0 -1']);
    let res = 0;
    while (q.length) {
        let t = q.length;
        while (t--) {
            let cur = q.shift();
            let [pos, speed] = cur;
            let pos1 = pos + speed, speed1 = speed * 2;
            if (pos1 == target) return res + 1;
            if (pos1 > 0 && pos1 < 2 * target) {
                q.push([pos1, speed1]);
                visit.add(pos1 + " " + speed1);
            }
            let speed2 = speed > 0 ? -1 : 1;
            let key2 = pos + " " + speed2;
            if (!visit.has(key2)) {
                q.push([pos, speed2]);
                visit.add(key2);
            }
        }
        res++;
        console.info(q)
    }
    return res;
};
let testcases = [
    [11],//10          ,
    // [1],//1          ,
    // [2],//4
    // [3],//2 
    // [4],//5
    // [5],//7
    // [6],//5
    // [7],//3
    // [15],//4
    // [-1],//2          ,
    // [-2],//4
    // [-3],//3
    // [-4],//5
    // [-5],//8
    // [-6],//5
    // [-7],//4
    // [-15],//5
]
tf.run(racecar, testcases);
// @lc code=end

