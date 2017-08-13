/**
 You are given a non-empty zero-indexed array A consisting of N integers.

 For each number A[i] such that 0 ≤ i < N, we want to count the number of elements of the array that are not the divisors of A[i]. We say that these elements are non-divisors.

 For example, consider integer N = 5 and array A such that:

 A[0] = 3
 A[1] = 1
 A[2] = 2
 A[3] = 3
 A[4] = 6
 For the following elements:

 A[0] = 3, the non-divisors are: 2, 6,
 A[1] = 1, the non-divisors are: 3, 2, 3, 6,
 A[2] = 2, the non-divisors are: 3, 3, 6,
 A[3] = 3, the non-divisors are: 2, 6,
 A[4] = 6, there aren't any non-divisors.
 Write a function:

 function solution(A);
 that, given a non-empty zero-indexed array A consisting of N integers, returns a sequence of integers representing the amount of non-divisors.

 The sequence should be returned as:

 a structure Results (in C), or
 a vector of integers (in C++), or
 a record Results (in Pascal), or
 an array of integers (in any other programming language).
 For example, given:

 A[0] = 3
 A[1] = 1
 A[2] = 2
 A[3] = 3
 A[4] = 6
 the function should return [2, 4, 3, 2, 0], as explained above.

 Assume that:

 N is an integer within the range [1..50,000];
 each element of array A is an integer within the range [1..2 * N].
 **/

let tester=require('./testFrame');

function solution(A){
    let E = {}, R = {},len = A.length;
    for(let i = 0; i < len; i++){
        E[A[i]] = ~~E[A[i]] + 1;
    }
    for(let i in E){
        i = parseInt(i);
        for(let j = i; j <= 2*len; j+=i){
            if(E[j])
                R[j] = E[i] + ~~R[j];
        }
    }
    // console.log(R);
    
    let results = [];
    for (let i = 0; i < len; i++) {
        results.push(len - ~~R[A[i]]);

    }
    return results;
}

let testcases=[
    [[3,1,2,3,6]],
    [[2,3,5,7,11]],
    [[4,4,4,4,4,4]],
];

tester.run(solution, testcases);