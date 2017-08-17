/**  Two positive integers N and M are given. Integer N represents the number of chocolates arranged in a circle, numbered from 0 to N − 1.   You start to eat the chocolates. After eating a chocolate you leave only a wrapper.   You begin with eating chocolate number 0. Then you omit the next M − 1 chocolates or wrappers on the circle, and eat the following one.   More precisely, if you ate chocolate number X, then you will next eat the chocolate with number (X + M) modulo N (remainder of division).   You stop eating when you encounter an empty wrapper.   For example, given integers N = 10 and M = 4. You will eat the following chocolates: 0, 4, 8, 2, 6.   The goal is to count the number of chocolates that you will eat, following the above rules.   Write a function:   function solution(N, M);  that, given two positive integers N and M, returns the number of chocolates that you will eat.   For example, given integers N = 10 and M = 4. the function should return 5, as explained above.   Assume that:  N = (3**9)*(2**14), M=(2**14)*(2**14)  N and M are integers within the range [1..1,000,000,000].  */
let tester = require('./testFrame');
  //todo . it takes me a long time to get it correct. need practice more.
 function solution(N, M) { 
    if(N % M === 0) return N/M; 
    return solution(M, N%M) * N/M; 
}   let testcases = [   [10,4],   [10,2],   [10,3]
 ,   [],   [], [], [415633212 ,234332], 
    [     1000000000 ,1000000000  ] ];
  tester.run(solution, testcases);

