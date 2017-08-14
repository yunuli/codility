/**
 A zero-indexed array A consisting of N integers is given. A triplet (P, Q, R) is triangular if it is possible to build a triangle with sides of lengths A[P], A[Q] and A[R]. In other words, triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:

 A[P] + A[Q] > A[R],
 A[Q] + A[R] > A[P],
 A[R] + A[P] > A[Q].
 For example, consider array A such that:

 A[0] = 10    A[1] = 2    A[2] = 5
 A[3] = 1     A[4] = 8    A[5] = 12
 There are four triangular triplets that can be constructed from elements of this array, namely (0, 2, 4), (0, 2, 5), (0, 4, 5), and (2, 4, 5).

 Write a function:

 function solution(A);
 that, given a zero-indexed array A consisting of N integers, returns the number of triangular triplets in this array.

 For example, given array A such that:

 A[0] = 10    A[1] = 2    A[2] = 5
 A[3] = 1     A[4] = 8    A[5] = 12
 the function should return 4, as explained above.

 Assume that:

 N is an integer within the range [0..1,000];
 each element of array A is an integer within the range [1..1,000,000,000].

 */
/**
 * Complexity:

 expected worst-case time complexity is O(N2);
 expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
 */
let tester = require('./testFrame');
function solution(A){
    let len = A.length;
    if(len < 3) return 0;
    A.sort((a,b) => a-b);
    // console.log(A);
    let maxStride = new Array(len);
    console.time('loop');
    let count = 0,lp=0;
    maxStride[1]=2;
    for(let side1 = 0; side1 < len-2; side1++){
        let side2=side1+1;
        // let side3=side1+2;
        // todo remember :using maxStride when big N( > 5000) helps, small N(1-100) does not
        let side3=maxStride[side2];
        for(; side2 < len-1; side2++){
            while(side3 < len && A[side1]+A[side2] > A[side3]){
                side3++;
                lp++;
            }
            maxStride[side2] = side3;
            count += (side3 - side2 -1);
        }
    }
    console.timeEnd('loop');
    console.log('lp',lp);
    
    return count;
}

let testcases = [
    [[10,2,5,1,8,12]],
    [function(){
        let a = [];
        for (let i = 1; i <= 5000; i++) {
            a.push(i);
        }
        return a;
    }()]
    // [[]],
    // [[]],
    ];
tester.run(solution, testcases);