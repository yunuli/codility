let tester = require('./testFrame');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');



// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
    // write your code in JavaScript (Node.js 6.4.0)
    let toLeft = new Array(A.length), toRight = new Array(A.length);
    let tmpSum = 0;
    A[0]=A[A.length-1]=0;
    for(let i = 0; i < A.length; i++){
        tmpSum = tmpSum + A[i];
        tmpSum = toLeft[i] = tmpSum > 0 ? tmpSum : 0;
    }
    // console.log(toLeft);
    tmpSum = 0;;
    for(let i = A.length-1; i >= 0; i--){
        tmpSum = tmpSum + A[i];
        tmpSum = toRight[i] = tmpSum > 0 ? tmpSum : 0;
    }
    // console.log(toRight);
    let max = 0;
    for(let i = 1; i < A.length -1; i++){
        let tmp = toLeft[i-1] + toRight[i+1];
        max = max > tmp ? max : tmp;
    }
    return max;
}




let testcases = [
    [0, 10, -5, -2, 0],
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