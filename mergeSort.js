/**
 bisearch
 **/

let tf = require("./testFrame");


//random
function merge(left, right){
    let temp = [], il = 0, ir = 0;

    while(il < left.length && ir < right.length){
        if(left[il] > right[ir]){
            temp.push(right[ir++]);
        }
        else {
            temp.push(left[il++]);
        }
    }
    if(il < left.length){
        temp = temp.concat(left.slice(il));
    }else{
        temp = temp.concat(right.slice(ir));
    }
    return temp;
}


function mergesort(A){
    let length = A.length;
    if(length < 2) return A;
    let middle = Math.floor(length / 2);

    let left = mergesort(A.slice(0, middle));
    let right = mergesort(A.slice(middle, length));

    return merge(left, right);

}

function solution(A) {
   return mergesort(A, 0, A.length);
}

let testcases = [
    [[]],
    [[1]],
    [[2, 1]],
    [[1, 2]],
    [[3,2,1,0]],
];
tf.run(solution, testcases);