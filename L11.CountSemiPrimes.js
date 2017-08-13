/**
 A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

 A semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

 You are given two non-empty zero-indexed arrays P and Q, each consisting of M integers. These arrays represent queries about the number of semiprimes within specified ranges.

 Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

 For example, consider an integer N = 26 and arrays P, Q such that:

 P[0] = 1    Q[0] = 26
 P[1] = 4    Q[1] = 10
 P[2] = 16   Q[2] = 20
 The number of semiprimes within each of these ranges is as follows:

 (1, 26) is 10,
 (4, 10) is 4,
 (16, 20) is 0.
 Write a function:

 function solution(N, P, Q);
 that, given an integer N and two non-empty zero-indexed arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

 For example, given an integer N = 26 and arrays P, Q such that:

 P[0] = 1    Q[0] = 26
 P[1] = 4    Q[1] = 10
 P[2] = 16   Q[2] = 20
 the function should return the values [10, 4, 0], as explained above.

 Assume that:

 N is an integer within the range [1..50,000];
 M is an integer within the range [1..30,000];
 each element of arrays P, Q is an integer within the range [1..N];
 P[i] ≤ Q[i]

 **/
/**
 * Complexity:

 expected worst-case time complexity is O(N*log(log(N))+M);
 expected worst-case space complexity is O(N+M), beyond input storage (not counting the storage required for input arguments).

 */
let tester= require('./testFrame');

function solution(N, P, Q){
    let A = new Array(N + 1);
    for(let i = 2; i <=N; i++){
        if(A[i] === undefined) {
            A[i] = 1;
            if(i*i <=N) A[i*i] = 1;
        }
        let j = i*2;
        while(j <= N){
            if(A[j] === undefined){
                A[j] = A[i];
            }else{
                A[j]+=A[i];
            }
            j+= i;
        }

    }
    A[0] = A[1] = 0;
    console.log(A);

    for(let i = 2; i <= N; i++){
        if(A[i] == 2){
            A[i] = A[i-1] + 1;
        }else{
            A[i] = A[i-1];
        }
    }
    console.log(A);
    let results = new Array(P.length);
    //results[0]=0;
    for(let i = 0; i<P.length; i++){
        results[i] = A[Q[i]] - A[P[i]-1];
    }
    return results;
}

let testcases=[
    [26,[1,4,16,1,16,20],[26,10,20,1,16,21]]
];

tester.run(solution,testcases);