/**
 You are helping a geologist friend investigate an area with mountain lakes. A recent heavy rainfall has flooded these lakes and their water levels have reached the highest possible point. Your friend is interested to know the maximum depth in the deepest part of these lakes.

 We simplify the problem in 2-D dimensions. The whole landscape can be divided into small blocks and described by an array A of length N. Each element of A is the altitude of the rock floor of a block (i.e. the height of this block when there is no water at all). After the rainfall, all the low-lying areas (i.e. blocks that have higher blocks on both sides) are holding as much water as possible. You would like to know the maximum depth of water after this entire area is flooded. You can assume that the altitude outside this area is zero and the outside area can accommodate infinite amount of water.

 For example, consider array A such that:

 A[0] = 1
 A[1] = 3
 A[2] = 2
 A[3] = 1
 A[4] = 2
 A[5] = 1
 A[6] = 5
 A[7] = 3
 A[8] = 3
 A[9] = 4
 A[10] = 2
 The following picture illustrates the landscape after it has flooded:



 The gray area is the rock floor described by the array A above and the blue area with dashed lines represents the water filling the low-lying areas with maximum possible volume. Thus, blocks 3 and 5 have a water depth of 2 while blocks 2, 4, 7 and 8 have a water depth of 1. Therefore, the maximum water depth of this area is 2.

 Write a function:

 function solution(A);
 that, given a non-empty zero-indexed array A consisting of N integers, returns the maximum depth of water.

 Given array A shown above, the function should return 2, as explained above.

 For the following array:

 A[0] = 5
 A[1] = 8
 the function should return 0, because this landscape cannot hold any water.

 Assume that:

 N is an integer within the range [1..100,000];
 each element of array A is an integer within the range [1..100,000,000].

 **/
/**
 Complexity:

 expected worst-case time complexity is O(N);
 expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
 Elements of input arrays can be modified.
 **/


/*
case 1:
L
*
 *     R
  *   *
   * *
    *
    min

case 2:
        R
        *
  L    *
  *   *
   * *
    *
    min

case 3: L > R > M
L
*             R
 *      M     *
  *     *    *
   *   *  * *
    * *    *
     *    min2
   min1


case 4: L > M > R
L
*
 *    M
  *   *
   * * *    R
    *   *   *
         * *
          *
 */
let tester = require('./testFrame');

function Stack() {
    let stk = [];
    this.top = function () {
        return stk[stk.length - 1];
    };

    this.pop = function () {
        return stk.pop();
    };

    this.push = function (element) {
        stk.push(element);
    };
    this.isEmpty = function isEmpty() {
        return stk.length === 0;
    };

    this.isNotEmpty = function () {
        return stk.length !== 0;
    };
    this.display = function () {
        console.log(stk);
    }
}

function solution(A) {
    let len = A.length, minHeight = A[0], maxDepth = 0, stack = new Stack();
    let curHeight;

    for (let i = 0; i < len; i++) {
        curHeight = A[i];
        if (minHeight > curHeight) minHeight = curHeight;
        if ((stack.isEmpty() || curHeight <= stack.top())) {
            stack.push(curHeight);
        } else {
            let top;

            while (stack.isNotEmpty() && stack.top() <= curHeight) {
                top = stack.pop();
            }
            // stack.display();
            if (stack.isEmpty()) { //leftmost side is the lower side
                if (maxDepth < top - minHeight) {
                    maxDepth = top - minHeight;
                }
                minHeight = curHeight;
            } else if (maxDepth < curHeight - minHeight) {
                maxDepth = curHeight - minHeight;
            }

            stack.push(curHeight);
            // stack.display();
        }
    }
    return maxDepth;

}

function findPeak(A, n) {
    let current = n, next = n + 1, len = A.length;

    while (next < len && A[current] <= A[next]) {
        current++;
        next++
    }
    return current;
}

function findBottom(A, n) {
    let current = n, next = n + 1, len = A.length;

    while (next < len && A[current] >= A[next]) {
        current++;
        next++
    }
    return current;
}

function solution2(A) {
    let len = A.length, peaks = [], current, maxDepth = 0;
    current = findPeak(A, 0);
    let lowestPoint = A[current];
    peaks.push(A[current]);

    while (current < len) {
        let bottom = findBottom(A, current);
        lowestPoint = lowestPoint > A[bottom] ? A[bottom] : lowestPoint;
        let peakIndex = findPeak(A, bottom);

        let rightMostPeak = A[peakIndex], peaksTop = peaks[peaks.length - 1];

        while (peaks.length > 0 && rightMostPeak > peaksTop) {
            peaksTop = peaks.pop();
        }

        let lowerEdge = rightMostPeak < peaksTop ? rightMostPeak : peaksTop;
        maxDepth = lowerEdge - lowestPoint > maxDepth ? lowerEdge - lowestPoint : maxDepth;

        if (peaks.length === 0) {
            lowestPoint = rightMostPeak;
            peaks.push(rightMostPeak)
        }

        current = peakIndex + 1;

    }
    return maxDepth;

}

function solution3(A) {
    let len = A.length, scanFrom = 1, maxDepth = 0, leftMostPeakHeight = A[0], lowestPoint = leftMostPeakHeight;

    while (scanFrom < len) {

        //find next bottom
        while (scanFrom < len && A[scanFrom - 1] >= A[scanFrom]) {
            scanFrom++;
        }
        lowestPoint = lowestPoint > A[scanFrom - 1] ? A[scanFrom - 1] : lowestPoint;

        //find next peak
        while (scanFrom< len && A[scanFrom - 1] <= A[scanFrom]) {
            scanFrom++;
        }
        const nextPeakHeight = A[scanFrom - 1];

        const lowerEdge = nextPeakHeight > leftMostPeakHeight ? leftMostPeakHeight : nextPeakHeight;
        maxDepth = maxDepth > lowerEdge - lowestPoint ? maxDepth : lowerEdge - lowestPoint;

        if (leftMostPeakHeight === lowerEdge) {
            lowestPoint = leftMostPeakHeight = nextPeakHeight;
        }
    }
    return maxDepth;
}


let testcases = [
    [[6, 7, 8, 9]],//0
    [[1, 3, 2, 1, 2, 1, 5, 3, 3, 4, 2]],//2
    [[50, 9, 8, 7, 6, 7, 8, 9, 1, 6]],//5
    [[11, 9, 8, 7, 6, 7, 20, 9, 1, 6]],//5
    [[11, 9, 8, 7, 6, 7, 20, 9, 1, 30]],//19
    [[50, 9, 8, 7, 6, 7, 8, 9, 1, 6, 20]],//19
    [[50, 9, 8, 7, 6, 7, 8, 9, 1, 6]],//5
    [[10, 9, 8, 7, 6, 7, 8, 9]],//3
    [[5, 10, 9, 8, 7, 6, 7, 8, 9, 8]],//3
    [[10, 9, 8, 7, 6]],//0
    [[6, 7, 8, 9]],//0
    [[6, 7, 8, 9, 8, 7]],//0
    [[6, 6, 6, 6, 6]]//0
];
tester.run(solution3, testcases);
