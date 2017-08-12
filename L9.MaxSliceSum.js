let tester = require('./testFrame');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
    // write your code in JavaScript (Node.js 6.4.0)
    let tmpSum = 0, maxSum = A[0];
    for(let i = 0; i < A.length; i++){
        tmpSum += A[i];
        maxSum = tmpSum > maxSum ? tmpSum : maxSum;
        tmpSum = tmpSum > 0 ? tmpSum : 0;
    }
    return maxSum;
}




let testcases = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

tester.run(solution,testcases);