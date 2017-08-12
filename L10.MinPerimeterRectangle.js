/**
 * An integer N is given, representing the area of some rectangle.

 The area of a rectangle whose sides are of length A and B is A * B, and the perimeter is 2 * (A + B).

 The goal is to find the minimal perimeter of any rectangle whose area equals N. The sides of this rectangle should be only integers.

 For example, given integer N = 30, rectangles of area 30 are:

 (1, 30), with a perimeter of 62,
 (2, 15), with a perimeter of 34,
 (3, 10), with a perimeter of 26,
 (5, 6), with a perimeter of 22.
 Write a function:

 function solution(N);

 that, given an integer N, returns the minimal perimeter of any rectangle whose area is exactly equal to N.

 For example, given an integer N = 30, the function should return 22, as explained above.

 Assume that:

 N is an integer within the range [1..1,000,000,000].
 Complexity:

 expected worst-case time complexity is O(sqrt(N));
 expected worst-case space complexity is O(1).
 time limit 0.3
 */

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");
let tester = require('./testFrame');
function solution (N){
    let sqrtN = Math.floor(Math.sqrt(N));
    /*
    * todo to remember, change i-- to i++ get the same answer,but take more time
    * for example: big prime 982451653 may take about 5s
    * big numbers modulo take more time than small ones
    */
    for(let i = sqrtN; i >0; i--){
        if(N % i == 0){
            return 2*(N/i + i);
        }
    }
}

let testcases = [
    1,
    36,
    48,
    101,
    1234,//simple
    4564320,//medium
    15486451,//prime
    100000000,//square
    982451653,//big prime
    1000000000//extreme max
];

tester.run(solution,testcases,true);