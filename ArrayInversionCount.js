/**
A zero-indexed array A consisting of N integers is given. An inversion is a pair of indexes (P, Q) such that P < Q and A[Q] < A[P].

Write a function:

function solution(A);
that computes the number of inversions in A, or returns −1 if it exceeds 1,000,000,000.

Assume that:

N is an integer within the range [0..100,000];
each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].
For example, in the following array:

 A[0] = -1 A[1] = 6 A[2] = 3
 A[3] =  4 A[4] = 7 A[5] = 4
there are four inversions:

   (1,2)  (1,3)  (1,5)  (4,5)
so the function should return 4.


 */
/**
 * Complexity:

 expected worst-case time complexity is O(N*log(N));
 expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
 Elements of input arrays can be modified.
 */
let tester = require('./testFrame');

let inverseCount = 0;
function merge(left, right){
    let ll = left.length, lr = right.length, result = [], i=0, j=0;
    while (i < ll && j <lr){
        if(left[i] <= right[j]){
            result.push(left[i++]);
        }else{
            result.push(right[j++]);
            inverseCount += (ll - i);
        }
    }
    if(i === ll){
        result = result.concat(right.slice(j));
    }else{
        result = result.concat(left.slice(i));
    }

    return result;
}

function mergeSort(A){
    let len = A.length, mid = ~~(len / 2);
    if(len < 2) return A;

    let left = mergeSort(A.slice(0, mid));
    let right = mergeSort(A.slice(mid));
    return merge(left, right);

}

function n2(A){

    let len = A.length, count = 0;
    for(let i = 0; i < len; i++){
        for(let j = i; j< len; j++){
            if(A[i] > A[j]){
                count++;
            }
        }
    }
    return count;
}
function solution(A){
    inverseCount = 0;
    let t = mergeSort(A);
    // return n2(A);
    // console.log(t, inverseCount);
    return inverseCount;
}



let testcases = [
    [[9,8,7,6,6,5,4,3,2,1]],//4
    [[-1,6,3,4,7,4]],//4
    [[1,3,2,1,2,1,5,3,3,4,2]],//15
    [[50,9,8,7,6,7,8,9,1,6]],//31
    [[11,9,8,7,6,7,20,9,1,6]],//30
    [[11,9,8,7,6,7,20,9,1,30]],//23
    [[50,9,8,7,6,7,8,9,1,6,20]],//32
    [[50,9,8,7,6,7,8,9,1,6]],//31
    [[10,9,8,7,6,7,8,9]],//16
    [[5,10,9,8,7,6,7,8,9,8]],//19
    [[10,9,8,7,6]],//10
    [[6,7,8,9]],//0
    [[6,7,8,9,8,7]],//4
    [[6,6,6,6,6]]//0
];
tester.run(solution, testcases);