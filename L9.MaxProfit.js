let tester = require('./testFrame');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
    // write your code in JavaScript (Node.js 6.4.0)
    let profit = 0, max = A[0], min = max;
    for(let i = 1; i < A.length; i++){
        if(A[i] > max){
            max = A[i];
            profit = max - min > profit ? max - min : profit;
        }else if(A[i] < min){
            max = min = A[i];
        }
    }
    return profit;

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