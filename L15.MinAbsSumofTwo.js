/**
 Let A be a non-empty zero-indexed array consisting of N integers.

 The abs sum of two for a pair of indices (P, Q) is the absolute value |A[P] + A[Q]|, for 0 ≤ P ≤ Q < N.

 For example, the following array A:

 A[0] =  1
 A[1] =  4
 A[2] = -3
 has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2).
 The abs sum of two for the pair (0, 0) is A[0] + A[0] = |1 + 1| = 2.
 The abs sum of two for the pair (0, 1) is A[0] + A[1] = |1 + 4| = 5.
 The abs sum of two for the pair (0, 2) is A[0] + A[2] = |1 + (−3)| = 2.
 The abs sum of two for the pair (1, 1) is A[1] + A[1] = |4 + 4| = 8.
 The abs sum of two for the pair (1, 2) is A[1] + A[2] = |4 + (−3)| = 1.
 The abs sum of two for the pair (2, 2) is A[2] + A[2] = |(−3) + (−3)| = 6.
 Write a function:

 function solution(A);
 that, given a non-empty zero-indexed array A consisting of N integers, returns the minimal abs sum of two for any pair of indices in this array.

 For example, given the following array A:

 A[0] =  1
 A[1] =  4
 A[2] = -3
 the function should return 1, as explained above.

 Given array A:

 A[0] = -8
 A[1] =  4
 A[2] =  5
 A[3] =-10
 A[4] =  3
 the function should return |(−8) + 5| = 3.

 Assume that:

 N is an integer within the range [1..100,000];
 each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].
 */
let tester = require('./testFrame');

function bsearch(A, n, left, right){

    if(left === right ) return left;
    let mid = Math.floor((left+right) / 2);
    console.log(mid);
    if(A[mid] === n) return mid;
    if(A[mid] > n){
        return bsearch(A, n, left, mid);
    }else{
        return bsearch(A, n, mid+1, right);
    }
}

function abs(n){
    return Math.abs(n);
}

function solution(A){
    let len = A.length;

    if(len === 1) return 2*abs(A[0]);

    A.sort((a,b) => a-b);
    console.log(A);

    let left, right;
    // while(right < len-1 && (A[right] < 0 || A[right + 1] <= 0)){
    //     right++;
    // }
    // left = right -1;
    let p0 = bsearch(A, 0, 0, len);
    if(p0 === len){
        return 2* -A[p0 - 1];
    }else if(p0 === 0 || A[p0] === 0){
        return 2 * A[p0];
    }
    right = p0;
    left = right -1;
    console.log(p0,left,right);

    let min = -A[left] < A[right] ? 2*-A[left] : 2*A[right];
    while(left >= 0 && right < len){
        let tmp = A[left] + A[right],abstmp = abs(tmp);
        if(abstmp < min) min = abstmp;

        if(min === 0) return min;

        if(tmp > 0) left--;
        if(tmp < 0) right++;
    }
    return min;
}

let testcases = [
    [function(){
        let a = [];
        for (let i = 0; i < 10; i++) {
            let odd = (i & 0x01),sign = 1;
            if(odd) sign = -1;
            a[i] = i*sign;
        }
        return a;
    }()],
    [[1]],//2
    [[-8,4,5,-10,3]],//3
    [[1,9,3,6,4,0,2,8,0]],//0
    [[-1,-8,0,-3,0,-9,-3,]],//0
    [[-1,-8,7,4,3,-3,]],//0
    [[-1,-8,0,7,4,3,-3,]],//0
    [[-1,-8,-3,0,-9,-3,]],//0
    [[0,1,3,5,7,9]],//0
    [[-1,-8,0,7,4,-9,-3,]],//0
    [[1,3,5,7,9]],//2
    [[-1,-8,-3,-9,-3,]],//2
    [[-1,-8,0,7,4,0,-9,-3,]],//0
    [[-1,-8,7,4,13,-3,]]//1

];
tester.run(solution, testcases);