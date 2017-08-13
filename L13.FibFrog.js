/**
 The Fibonacci sequence is defined using the following recursive formula:

 F(0) = 0
 F(1) = 1
 F(M) = F(M - 1) + F(M - 2) if M >= 2
 A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (position −1) and wants to get to the other bank (position N). The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position N.

 The leaves on the river are represented in a zero-indexed array A consisting of N integers. Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river. Array A contains only 0s and/or 1s:

 0 represents a position without a leaf;
 1 represents a position containing a leaf.
 The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from position −1 to position N). The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

 For example, consider array A such that:

 A[0] = 0
 A[1] = 0
 A[2] = 0
 A[3] = 1
 A[4] = 1
 A[5] = 0
 A[6] = 1
 A[7] = 0
 A[8] = 0
 A[9] = 0
 A[10] = 0
 The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

 Write a function:

 function solution(A);
 that, given a zero-indexed array A consisting of N integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

 For example, given:

 A[0] = 0
 A[1] = 0
 A[2] = 0
 A[3] = 1
 A[4] = 1
 A[5] = 0
 A[6] = 1
 A[7] = 0
 A[8] = 0
 A[9] = 0
 A[10] = 0
 the function should return 3, as explained above.

 Assume that:

 N is an integer within the range [0..100,000];
 each element of array A is an integer that can have one of the following values: 0, 1.
 */
//todo remember 1:fib can be find in O(log(N)) time (using matrix production) or constant time (by formula);
// todo 2: for(prop in obj) is much slower than for(; ;)
let tester = require('./testFrame');

function fibonacci(){

    let cache = [0,1];
    this.get = function fib(N){
        if(cache[N]) return cache[N];
        for(let i = cache.length; i <= N; i++){
            cache[i] = (cache[i-1] + cache[i-2]);
        }
        return cache;
    };
    this.fibs = cache;
}


function solution (A){
    // //console.log(A.slice(0,100), B.slice(0,100));
    // console.log('case is :%j',A);
    A.push(1);

    let len = A.length;
    let fn = new fibonacci();
    fn.get(25);
    let fibs = fn.fibs;

    let stepRecords = new Array(len+1), steps = [], maxstep = fibs[fibs.length-1];
    stepRecords[0] = 0;

    for(let i = 2; i < fibs.length && fibs[i] <= len; i++){
        steps.push(fibs[i]);
    }
    // console.log(steps);
    
    // console.time('inner');
    for(let i = 1; i < len+1; i++){
        // let possible = true;
        // console.log(i-1,'-r------');
        if(A[i-1]){
            // possible = false;
            let min = i;
            for(let s = 0; s < steps.length; s++){
                let comefrom = i - steps[s];
                // console.log(fibstep,comefrom, stepRecords[comefrom]);
                if(comefrom >= 0){
                    let tmp = stepRecords[comefrom];
                    if( tmp !== undefined && tmp < min)
                        min = tmp;
                }
            }
            if(min != i){
                stepRecords[i] = min + 1;
            }
        }


        // if(!possible) return -1;
    }

    // console.timeEnd('inner');
        // console.log(stepRecords.slice(-100,-1));

    return stepRecords[len] ? stepRecords[len]:-1;
}


let testcases = [
    [
        function(){
        // let b = [0,1,0,1,0,1,0,1,0,1];
        let b = [1,1,1,1,1,1,1,1,1,1];
        // let b = [0,0,0,0,0,0,0,0,0,0,0];
        // let b = [0,1,0,0,1,0,0,0,0,1];
        for (var i = 0; i < 13; i++) {
            b = b.concat(b);
        }
        return b;
    }()]
    ,
    [[0,0,0,1,1,0,1,0,0,0,0]],//3
    [[]],//1
    [[1,1,1,1,1]],//2
    [[0,0,0,0,1]],//2
    [[0,0,0,1,0]],//-1
    [[0,0,1,0,0]],//2
    [[0,1,0,1,0]],//3
    [[1,0,0,0,0]],//2
    [[0,0,0]],//-1
    [[0,0]],//1
    [[0]],//1
    [[1,1,1]],//2
    [[1,1]],//1
    [[1]]//1
];

// let a = new fibonacci();
// let b = [];
// for(let i = 0; i< 100; i++){
//     let temp1 = a.get(i);
//     let temp2 = b[i] = a.get(i) % 2048;
//     //console.log(i,temp1, temp2);
// }
// //console.log(b);

tester.run(solution, testcases);