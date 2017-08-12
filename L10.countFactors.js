/**
 * A positive integer D is a factor of a positive integer N if there exists an integer M such that N = D * M.

 For example, 6 is a factor of 24, because M = 4 satisfies the above condition (24 = 6 * 4).

 Write a function:

 int solution(int N);
 that, given a positive integer N, returns the number of its factors.

 For example, given N = 24, the function should return 8, because 24 has 8 factors, namely 1, 2, 3, 4, 6, 8, 12, 24. There are no other factors of 24.

 Assume that:

 N is an integer within the range [1..2,147,483,647].
 Complexity:

 expected worst-case time complexity is O(sqrt(N));
 expected worst-case space complexity is O(1).
 * */
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
let tester = require('./testFrame');
function solution(N) {
    // write your code in JavaScript (Node.js 6.4.0)
    let sqrtN = Math.floor(Math.sqrt(N)), count = 0;
    for (let i = sqrtN; i > 0; i--) {
        if (N % i == 0) count += 2;
    }

    return count - (sqrtN * sqrtN == N ? 1 : 0);
}

let testcases = [
    1000000000,
    2147395600,
    479001600,//12!
    780291637,//prime
    449991369,
    97093212,
    27043111,
    39916800,//11!
    3628800,//10!
    5621892,
    4999696,
    362, 880,//9!,
    1, 948, 102,
    41,//(prime),
    42,
    69, 64, 120,//5!
    720,//6!
    1111,
    5040,//7!,
    12,
    345,
    34,
    879,
    40,
    320,//8!
    1,
    982451653
];


tester.run(solution,testcases,true);