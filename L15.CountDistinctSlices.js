/**
 An integer M and a non-empty zero-indexed array A consisting of N non-negative integers are given. All integers in array A are less than or equal to M.

 A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The slice consists of the elements A[P], A[P + 1], ..., A[Q]. A distinct slice is a slice consisting of only unique numbers. That is, no individual number occurs more than once in the slice.

 For example, consider integer M = 6 and array A such that:

 A[0] = 3
 A[1] = 4
 A[2] = 5
 A[3] = 5
 A[4] = 2
 There are exactly nine distinct slices: (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2), (3, 3), (3, 4) and (4, 4).

 The goal is to calculate the number of distinct slices.

 Write a function:

 function solution(M, A);
 that, given an integer M and a non-empty zero-indexed array A consisting of N integers, returns the number of distinct slices.

 If the number of distinct slices is greater than 1,000,000,000, the function should return 1,000,000,000.

 For example, given integer M = 6 and array A such that:

 A[0] = 3
 A[1] = 4
 A[2] = 5
 A[3] = 5
 A[4] = 2
 the function should return 9, as explained above.

 Assume that:

 N is an integer within the range [1..100,000];
 M is an integer within the range [0..100,000];
 each element of array A is an integer within the range [0..M].
 */
let tester = require('./testFrame');

function factorial(n) {
    let product = 1;
    for (let i = 1; i <= n; i++) {
        product *= i;
    }
    return product;
}

//todo . it takes me a long time to get it correct. need practice more.
function solution(M, A) {

    let position = new Array(M + 1), len = A.length, count = 0;
    for (let i = 0; i < position.length; i++) {
        position[i] = -1;
    }

    let left = 0, right;

    for ( right = 0; right < len; right++) {
        let number = A[right], prevPosition = position[number];
        if(prevPosition >= left){
            count += (right - left) * (right - left + 1) / 2;
            left = prevPosition + 1;
            count -= (right - left) * (right - left + 1) / 2;
        }
        position[number] = right;
    }
    count += (right - left) * (right - left + 1) / 2;
    return count;
}


let testcases = [
    [10000, [1, 3, 4, 1, 2, 1, 3, 2, 1]],
    [5, [3, 4, 5, 5, 2]],
    [6, [3, 4, 5, 5, 2]],
    [5, [1, 1, 2, 2, 3, 3]],
    // ,
    [10, [1, 1, 1, 1, 1, 1, 1, 1]],
    [10, [1, 2, 3, 4, 5, 6, 7]]
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