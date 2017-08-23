/**
 Halfling Woolly Proudhoof is an eminent sheep herder. He wants to build a pen (enclosure) for his new flock of sheep. The pen will be rectangular and built from exactly four pieces of fence (so, the pieces of fence forming the opposite sides of the pen must be of equal length). Woolly can choose these pieces out of N pieces of fence that are stored in his barn. To hold the entire flock, the area of the pen must be greater than or equal to a given threshold X.

 Woolly is interested in the number of different ways in which he can build a pen. Pens are considered different if the sets of lengths of their sides are different. For example, a pen of size 1×4 is different from a pen of size 2×2 (although both have an area of 4), but pens of sizes 1×2 and 2×1 are considered the same.

 Write a function:

 function solution(A, X);

 that, given a zero-indexed array A of N integers (containing the lengths of the available pieces of fence) and an integer X, returns the number of different ways of building a rectangular pen satisfying the above conditions. The function should return −1 if the result exceeds 1,000,000,000.

 For example, given X = 5 and the following array A:

 A[0] = 1
 A[1] = 2
 A[2] = 5
 A[3] = 1
 A[4] = 1
 A[5] = 2
 A[6] = 3
 A[7] = 5
 A[8] = 1


 the function should return 2. The figure above shows available pieces of fence (on the left) and possible to build pens (on the right). The pens are of sizes 1x5 and 2x5. Pens of sizes 1×1 and 1×2 can be built, but are too small in area. It is not possible to build pens of sizes 2×3 or 3×5, as there is only one piece of fence of length 3.

 Assume that:

 N is an integer within the range [0..100,000];
 X is an integer within the range [1..1,000,000,000];
 each element of array A is an integer within the range [1..1,000,000,000].
 */
/**
 */

let tester = require('./testFrame');
function bsearch(A, t){
    let len = A.length, begin = 0, end = len - 1, mid, result = len;
    while(begin <= end){
        mid = ~~((begin + end) / 2);
        if(A[mid] >= t){
            end = mid - 1;
            result = mid;
        }else{
            begin = mid + 1;
        }
    }

    return len - result;
}
function solution(A, X){
    let len = A.length, counter = {}, fences = [], sqrtX = Math.sqrt(X), count = 0;
    for(let i = 0; i < len; i++){
        if(counter[A[i]]){
            counter[A[i]]++;
        }else{
            counter[A[i]] = 1;
        }
    }

    for(let p in counter){
        if(counter[p] >= 2){
            fences.push(Number(p));
        }
        if(counter[p] >= 4 && Number(p) >= sqrtX){
            count++;
        }
    }

    fences.sort((a,b) => a - b);
    console.log(fences, count ,sqrtX);
    let i = 0, flen = fences.length;
    while(i < flen && fences[i] < sqrtX){
        let t = X / fences[i], c = bsearch(fences, t);
        count += c;
        i++;
    }

    console.log('count', count,fences.length);
    count += ((flen - i) * (flen - i - 1)) / 2;
    console.log('count', count,fences.length);

    return count > 1e9 ? -1 : count;

}

let testcases = [
    [[1,2,5,1,1,2,3,5,1], 5],//2
    [[1,2,5,1,1,2,3,5,1], 9],//1
    [[1,2,3,4,5,6], 9],//0
    [[], 9],//0
    [[3,3,3,3,3,3,3,3,3,3], 9],//1
    [[1,2,2,2,2,2,3,5,5,1], 3]//3
    // [[1,2,5,1,1,2,3,5,1], 5],//4
    // [[1,2,5,1,1,2,3,5,1], 5],//4
    // [[-1,6,3,4,7,4]],//4
    // [[1,3,2,1,2,1,5,3,3,4,2]],//15
    // [[50,9,8,7,6,7,8,9,1,6]],//31
    // [[11,9,8,7,6,7,20,9,1,6]],//30
    // [[11,9,8,7,6,7,20,9,1,30]],//23
    // [[50,9,8,7,6,7,8,9,1,6,20]],//32
    // [[50,9,8,7,6,7,8,9,1,6]],//31
    // [[10,9,8,7,6,7,8,9]],//16
    // [[5,10,9,8,7,6,7,8,9,8]],//19
    // [[10,9,8,7,6]],//10
    // [[6,7,8,9]],//0
    // [[6,7,8,9,8,7]],//4
    // [[6,6,6,6,6]]//0
];
tester.run(solution, testcases);