function getGcd(n, m) {
    if (n < m) [n, m] = [m, n]
    let modulo;
    while (m !== 0) {
        modulo = n % m;
        n = m, m = modulo;
    }
    return n;
}
"use strict"
var rotate = function (nums, k) {
    const length = nums.length;
    if (k >= length) k %= length;
    if (k === 0) return nums;
    const remain = length % k,
        gcd = getGcd(k, remain),
        round = k / gcd;

    for (let i = 0; i < gcd; i++) {
        let j = 0, temp,
            prevValue = nums[i],
            next = i + k;
        while (j < round) { // we can also use next != i
            while (next < length) {
                temp = nums[next];
                nums[next] = prevValue;
                prevValue = temp;
                next = next + k;
            }
            j++;
            next = next - length;
        }
        nums[next] = temp;
    }
    return nums;
};

let tf = require("./testFrame");

let testcases = [
    [[1, 2, 3, 4, 5, 6, 7, 8], 8],
    [[1, 2, 3, 4, 5, 6, 7, 8], 4],
    [[-1, -100, 3, 99], 3],
    [[-1, -100, 3, 99], 0],
    [[1], 0],
    [[1], 1],
    [[1], 2],
];
tf.run(rotate, testcases);
