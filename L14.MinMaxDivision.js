/**
 You are given integers K, M and a non-empty zero-indexed array A consisting of N integers. Every element of the array is not greater than M.

 You should divide this array into K blocks of consecutive elements. The size of the block is any integer between 0 and N. Every element of the array should belong to some block.

 The sum of the block from X to Y equals A[X] + A[X + 1] + ... + A[Y]. The sum of empty block equals 0.

 The large sum is the maximal sum of any block.

 For example, you are given integers K = 3, M = 5 and array A such that:

 A[0] = 2
 A[1] = 1
 A[2] = 5
 A[3] = 1
 A[4] = 2
 A[5] = 2
 A[6] = 2
 The array can be divided, for example, into the following blocks:

 [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
 [2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
 [2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
 [2, 1], [5, 1], [2, 2, 2] with a large sum of 6.
 The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

 Write a function:

 function solution(K, M, A);
 that, given integers K, M and a non-empty zero-indexed array A consisting of N integers, returns the minimal large sum.

 For example, given K = 3, M = 5 and array A such that:

 A[0] = 2
 A[1] = 1
 A[2] = 5
 A[3] = 1
 A[4] = 2
 A[5] = 2
 A[6] = 2
 the function should return 6, as explained above.

 Assume that:

 N and K are integers within the range [1..100,000];
 M is an integer within the range [0..10,000];
 each element of array A is an integer within the range [0..M].
 */

let tester = require('./testFrame');

let tester = require('./testFrame');

//todo . it takes me a long time to get it correct. need practice more. 
function check(A, K, value) {
    let count = 1, len = A.length, sum = 0;
    for (let i = 0; i < len; i++) {
        sum += A[i];
        if (sum > value) {
            sum = A[i];
            count++;
        }
        if (count > K) return false;
    }
    return true;
}

function solution(K, M, A) {
    let mean = A.reduce((pre, cur) => pre + cur) / K;
    let max = A[0];
    A.forEach(item => max = item > max ? item : max);
    let begin = Math.max(max, Math.ceil(mean)), end = mean + M, result = -1;
    while (begin <= end) {
        let mid = ~~((begin + end) / 2);
        console.log(mid, begin, end);
        if (check(A, K, mid)) {
            end = mid - 1;
            result = mid;
        } else {
            begin = mid + 1;
        }
    }
    return result;
}

let testcases = [[3, 5, [2, 1, 5, 1, 2, 2, 2]], [10, 10, [10, 10, 10, 10, 10, 10, 10]], [10, 10, [10]], [1, 10, [1]], [1, 10, [10]], [2, 10, [10, 5]], [1, 10, [10, 5]], [3, 10, [10, 5]] 
    //r //  , //  [], //  [], //  [], //  [415633212 ,234332], //  [ //    1000000000 ,1000000000 
    //  ]
     ]; 
tester.run(solution, testcases);
// 100111010000000011100101000110101010001011001000
//                                             1101
//                 11100101000110101010001011000101