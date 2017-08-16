/**
 A game for one player is played on a board consisting of N consecutive squares, numbered from 0 to N − 1. There is a number written on each square. A non-empty zero-indexed array A of N integers contains the numbers written on the squares. Moreover, some squares can be marked during the game.

 At the beginning of the game, there is a pebble on square number 0 and this is the only square on the board which is marked. The goal of the game is to move the pebble to square number N − 1.

 During each turn we throw a six-sided die, with numbers from 1 to 6 on its faces, and consider the number K, which shows on the upper face after the die comes to rest. Then we move the pebble standing on square number I to square number I + K, providing that square number I + K exists. If square number I + K does not exist, we throw the die again until we obtain a valid move. Finally, we mark square number I + K.

 After the game finishes (when the pebble is standing on square number N − 1), we calculate the result. The result of the game is the sum of the numbers written on all marked squares.

 For example, given the following array:

 A[0] = 1
 A[1] = -2
 A[2] = 0
 A[3] = 9
 A[4] = -1
 A[5] = -2
 one possible game could be as follows:

 the pebble is on square number 0, which is marked;
 we throw 3; the pebble moves from square number 0 to square number 3; we mark square number 3;
 we throw 5; the pebble does not move, since there is no square number 8 on the board;
 we throw 2; the pebble moves to square number 5; we mark this square and the game ends.
 The marked squares are 0, 3 and 5, so the result of the game is 1 + 9 + (−2) = 8. This is the maximal possible result that can be achieved on this board.

 Write a function:

 function solution(A);
 that, given a non-empty zero-indexed array A of N integers, returns the maximal result that can be achieved on the board represented by array A.

 For example, given the array

 A[0] = 1
 A[1] = -2
 A[2] = 0
 A[3] = 9
 A[4] = -1
 A[5] = -2
 the function should return 8, as explained above.

 Assume that:

 N is an integer within the range [2..100,000];
 each element of array A is an integer within the range [−10,000..10,000].
 */

let tester = require('./testFrame');

function solution(A) {
    let len = A.length, sum = new Array(len);
    console.log('b4', A);

    //todo try to shorten the array, consecutive positives add up to one, negatives less than 6 could be jump over
    // let cur = 0, next = 1;
    // while (next < len-1) {
    //     while (next < len -1 && A[next] >= 0) {
    //         A[cur] += A[next++];
    //     }//now next is last or at first negative
    //     console.log('mid', A,cur, next);
    //
    //     if(next === len-1) break;
    //     let count = 0;
    //     while (next < len - 1 && A[next] < 0) {
    //         count++;
    //         next++;
    //     }//now next is > 0 or is last
    //     if (count > 5) {
    //         cur = next;//greater than 5 consecutive negatives, can not ignore, cur got the first non negative
    //     } else {
    //         A[++cur] = A[next++]; //
    //     }
    //     console.log('mid2', A,cur, next);
    // }
    // A[++cur]  = A[len -1];
    // console.log('final',cur, A);

    // A[++cur] = A[len - 1];
    sum[0] = A[0];
    for (let i = 1; i <len; i++) {
        let tmp, max = -1e11;
        for (let d = 1; d <= 6; d++) {
            if (i - d >= 0) {
                tmp = sum[i - d] + A[i];
                max = tmp < max ? max : tmp;
            }
        }
        sum[i] = max;
    }
    // console.log('sum',sum);

    return sum[len-1];
}

let testcases = [
    [[ 1, -2 ]],//-1
    [[-100,100]],//0
    [[ -3, -4, -3, 2, -7, -1 ]],//-2
    [[ 1, -2, 4, 3, -1, -3, -7, 4, -9 ]],//3
    [[1, -2, 0, 9, -1, -2]],//8
    [[1, 2, 3, 4, 5, 6, 7]],//28
    [[-1, -1, -1, -1]],//-2
    [[-1, -2, -3, -4, -5, -6, -7, -8]],//-11,
    [[ -4820,
        3705,
        3682,
        6987,
        -6286,
        -5389,
        -7057,
        -5497,
        4681,
        -7396,
        626,
        -5722,
        -4107,
        -1368,
        6753,
        2168,
        -9712,
        -4483,
        -7066,
        7426,
        6195,
        6121,
        6528,
        4895,
        8987,
        5876,
        -4866,
        6999,
        -264,
        5100,
        1283,
        -1409,
        -2716,
        -1404,
        -3725,
        -7653,
        6393,
        5965,
        9714,
        3819,
        1085,
        4968,
        -7303,
        3537,
        -1132,
        -6468,
        -5948,
        454,
        -4934,
        -811 ]]//118316
];
tester.run(solution, testcases);