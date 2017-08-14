/**
 A non-empty zero-indexed array A consisting of N numbers is given. The array is sorted in non-decreasing order. The absolute distinct count of this array is the number of distinct absolute values among the elements of the array.

 For example, consider array A such that:

 A[0] = -5
 A[1] = -3
 A[2] = -1
 A[3] =  0
 A[4] =  3
 A[5] =  6
 The absolute distinct count of this array is 5, because there are 5 distinct absolute values among the elements of this array, namely 0, 1, 3, 5 and 6.

 Write a function:

 function solution(A);
 that, given a non-empty zero-indexed array A consisting of N numbers, returns absolute distinct count of array A.

 For example, given array A such that:

 A[0] = -5
 A[1] = -3
 A[2] = -1
 A[3] =  0
 A[4] =  3
 A[5] =  6
 the function should return 5, as explained above.

 Assume that:

 N is an integer within the range [1..100,000];
 each element of array A is an integer within the range [−2,147,483,648..2,147,483,647];
 array A is sorted in non-decreasing order.
 */
let tester = require('./testFrame');
function solution(A){
    // console.log('case is :',A);

    let leftIndex = 0, rightIndex = A.length-1, pre = 0.5, count = 0;
    while(leftIndex <= rightIndex){
        let lvalue = -A[leftIndex], rvalue = A[rightIndex];
        if( lvalue > rvalue){
            if(lvalue !== pre){
                pre = lvalue;
                count++;
            }
            leftIndex++;
        }else{
            if(rvalue !== pre){
                pre = rvalue;
                count++;
            }
            rightIndex--;
        }
    }

    return count;
}

let testcases = [
    [[-5,-3,-1,0,3,6]],
    [[-5,-5,-3,-1,0,0,3,6]],
    [[1,2,3,4,5]],
    [[-6,-5,-4,-3]],
    [[-2147483648,-2147483647]],
    [[-1,-1,-1,-1]],
    [[0,0,0,0,0]],
    [[1,1,1,1,1]],
    [[-5,-3,-3,-1,-1,0,0,]],
    [[0,0,1,1,2,3,4]],
    [[5,5,5,5,5]],
    [[4]],
    [[-5,-5,0,0,3,3]],
    [[-5,-5,0,0,5,5]],
    [[-5,-5,5,5]],
    [[4,4,5,5]],
];
tester.run(solution,testcases);