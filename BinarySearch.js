/**
 bisearch
 **/

let tf = require("./testFrame");

function compare(A, B) {
    return A - B
}

//random
function bisearch(A, left, right, x) {
    let midIndex = left;
    while (left <= right) {
        midIndex = Math.floor((left + right) / 2);
        let middle = A[midIndex];

        if (compare(middle, x) > 0) {
            right = midIndex - 1;
        } else if (compare(middle, x) < 0) {
            left = midIndex + 1;
        } else {
            return midIndex;
        }
    }

    return -1;//A[midIndex] === x ? midIndex : -1;
}

function bisearch_leftmost(A, left, right, x) {
    let midIndex = Math.floor((left + right) / 2);
    while (left < right) {
        let middle = A[midIndex];

        if (compare(middle, x) >= 0) {
            right = midIndex;
        } else if (compare(middle, x) < 0) {
            left = midIndex + 1;
        }
        midIndex = Math.floor((left + right) / 2);
    }

    return A[midIndex] === x ? midIndex : -1;
}

function bisearch_rightmost(A, x) {

    let left = 0, right = A.length, midIndex;
    while (left < right) {
        midIndex = Math.floor((left + right) / 2);
        let middle = A[midIndex];
        // console.log(left,midIndex,right,middle,x,compare(middle, x))

        if (compare(middle, x) > 0) {
            right = midIndex;
        } else if (compare(middle, x) <= 0) {
            left = midIndex + 1;
        }
    }
    console.log(left)
    return A[left - 1] === x ? left -1  : -1;
}


function solution(A, x) {
    return bisearch_rightmost(A,  x);
}

let testcases = [
    [[0], 0],
    [[0], -1],
    [[0], 1],
    [[0, 2], 0],
    [[0, 2], 2],
    [[0, 2], 1],
    [[0, 2], -1],
    [[0, 2], 3],
    [[0, 1, 1, 1, 1, 1, 1, 1], 1],
    [[1, 1, 1, 1, 1, 1, 1, 1], 1],
    [[1, 1, 1, 1, 1, 1, 1, 1, 1], 1],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1],
    [[1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10], 10],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4.5],
    [[1, 3, 3, 3, 3, 4, 4, 4, 4, 4, 20], 3],
    [[1, 3, 3, 3, 3, 4, 4, 4, 4, 4, 20], 5],
    [[1, 1, 2, 4, 6, 8, 10, 10], 5]
];
tf.run(solution, testcases);
