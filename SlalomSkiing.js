/**
 You are a skier participating in a giant slalom. The slalom track is located on a ski slope, goes downhill and is fenced by barriers on both sides. The barriers are perpendicular to the starting line located at the top of the slope. There are N slalom gates on the track. Each gate is placed at a distinct distance from the starting line and from the barrier on the right-hand side (looking downhill).

 You start from any place on the starting line, ski down the track passing as many gates as possible, and finish the slalom at the bottom of the slope. Passing a gate means skiing through the position of the gate.

 You can ski downhill in either of two directions: to the left or to the right. When you ski to the left, you pass gates of increasing distances from the right barrier, and when you ski to the right, you pass gates of decreasing distances from the right barrier. You want to ski to the left at the beginning.

 Unfortunately, changing direction (left to right or vice versa) is exhausting, so you have decided to change direction at most two times during your ride. Because of this, you have allowed yourself to miss some of the gates on the way down the slope. You would like to know the maximum number of gates that you can pass with at most two changes of direction.

 The arrangement of the gates is given as an array A consisting of N integers, whose elements specify the positions of the gates: gate K (for 0 ≤ K < N) is at a distance of K+1 from the starting line, and at a distance of A[K] from the right barrier.

 For example, consider array A such that:

 A[0] = 15
 A[1] = 13
 A[2] = 5
 A[3] = 7
 A[4] = 4
 A[5] = 10
 A[6] = 12
 A[7] = 8
 A[8] = 2
 A[9] = 11
 A[10] = 6
 A[11] = 9
 A[12] = 3


 The picture above illustrates the example track with N = 13 gates and a course that passes eight gates. After starting, you ski to the left (from your own perspective). You pass gates 2, 3, 5, 6 and then change direction to the right. After that you pass gates 7, 8 and then change direction to the left. Finally, you pass gates 10, 11 and finish the slalom. There is no possible way of passing more gates using at most two changes of direction.

 Write a function:

 function solution(A);
 that, given a zero-indexed array A consisting of N integers, describing the positions of the gates on the track, returns the maximum number of gates that you can pass during one ski run.

 For example, given the above data, the function should return 8, as explained above.

 For the following array A consisting of N = 2 elements:

 A[0] = 1
 A[1] = 5
 the function should return 2.

 Assume that:

 N is an integer within the range [1..100,000];
 each element of array A is an integer within the range [1..1,000,000,000];
 the elements of A are all distinct.

 */
/*Complexity:

 expected worst-case time complexity is O(N*log(N));
 expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
 Elements of input arrays can be modified.*/
"use strict";

let tester = require('./testFrame');
function showSlalom(A){
    let s = "一一一一一一一一一一一一一一一一一一一一";
    for(let i = 0; i < A.length; i++){
        console.log(s.slice(0, A[i]-1) + '*' + s.slice(A[i]-1));
    }
    let a = new Array(A.length);
    for(let i = 0; i < A.length; i++){
        a[A[i]-1] =i+1;
    }
    console.log('A horizontal: ', a);

}

function randomGenerator(){
    let n = ~~(Math.random() * 19) + 2, A = new Array(n);
    for (let i = 0; i < n; i++) {
        A[i] = i + 1;
    }
    A.sort(()=> Math.random() > 0.5);
    return A;
}

function solution(A, mt) {
    showSlalom(A);
    console.log(A);
console.log('--------------');

    let len = A.length, maxTurns = mt != undefined ? mt : 2, turn = 0, max = 0, sum = new Array(len);

    function init() {
        for (let i = 0; i < len; i++) {
            sum[i] = 1;
        }
    }

    function findMaxGate(curHeight, direction) {

        let curPosition = A[curHeight],
            findPrevFunctions = [
                function (cur, item) {
                    return cur < item;
                },
                function (cur, item) {
                    return cur > item;
                }
            ],
            findPrev = findPrevFunctions[direction];

        for (let upperHeight = curHeight - 1; upperHeight > -1; upperHeight--) {
            if (findPrev(curPosition, A[upperHeight])) {
                if (sum[upperHeight] >= sum[curHeight]) {
                    sum[curHeight] = sum[upperHeight] + 1;

                }
            }
        }
    }

    function run() {

        init();
        while (turn <= maxTurns) {
            // console.log(sum);

            let direction = (turn + 1) & 1;

            for (let curHeight = 0; curHeight < len; curHeight++) {
                findMaxGate(curHeight, direction);
            }
            console.log(sum);
            turn++;
        }
        for(let i = 0; i < len; i++){
            if(sum[i] > max) max = sum[i];
        }
        return max;
    }

    return run();
}

let testcases = [
    [randomGenerator()],
    [[7, 5, 3], 0],//2
    [[7, 5, 3], 1],//3
    [[1, 5, 3], 1],//3
    [[1, 2, 3, 4, 5, 6, 7]],//7
    [[15, 13, 5, 7, 4, 10, 12, 8, 2, 11, 6, 9, 3]],//8
    [[7, 6, 5, 4, 3, 2, 1]],//7
    [[7]],//1
    [[1, 5]]//2
];
tester.run(solution, testcases);

