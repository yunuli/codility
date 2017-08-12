/**
 * A zero-indexed array A consisting of N integers is given. It contains daily prices of a stock share for a period of N consecutive days. If a single share was bought on day P and sold on day Q, where 0 ≤ P ≤ Q < N, then the profit of such transaction is equal to A[Q] − A[P], provided that A[Q] ≥ A[P]. Otherwise, the transaction brings loss of A[P] − A[Q].

 For example, consider the following array A consisting of six elements such that:

 A[0] = 23171
 A[1] = 21011
 A[2] = 21123
 A[3] = 21366
 A[4] = 21013
 A[5] = 21367
 If a share was bought on day 0 and sold on day 2, a loss of 2048 would occur because A[2] − A[0] = 21123 − 23171 = −2048. If a share was bought on day 4 and sold on day 5, a profit of 354 would occur because A[5] − A[4] = 21367 − 21013 = 354. Maximum possible profit was 356. It would occur if a share was bought on day 1 and sold on day 5.

 Write a function,

 class Solution { public int solution(int[] A); }

 that, given a zero-indexed array A consisting of N integers containing daily prices of a stock share for a period of N consecutive days, returns the maximum possible profit from one transaction during this period. The function should return 0 if it was impossible to gain any profit.

 For example, given array A consisting of six elements such that:

 A[0] = 23171
 A[1] = 21011
 A[2] = 21123
 A[3] = 21366
 A[4] = 21013
 A[5] = 21367
 the function should return 356, as explained above.

 Assume that:

 N is an integer within the range [0..400,000];
 each element of array A is an integer within the range [0..200,000].
 Complexity:

 expected worst-case time complexity is O(N);
 expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).
 Elements of input arrays can be modified.
 **/
/**
 * A zero-indexed array A consisting of N integers is given. It contains daily prices of a stock share for a period of N consecutive days. If a single share was bought on day P and sold on day Q, where 0 ≤ P ≤ Q < N, then the profit of such transaction is equal to A[Q] − A[P], provided that A[Q] ≥ A[P]. Otherwise, the transaction brings loss of A[P] − A[Q].

 For example, consider the following array A consisting of six elements such that:

 A[0] = 23171
 A[1] = 21011
 A[2] = 21123
 A[3] = 21366
 A[4] = 21013
 A[5] = 21367
 If a share was bought on day 0 and sold on day 2, a loss of 2048 would occur because A[2] − A[0] = 21123 − 23171 = −2048. If a share was bought on day 4 and sold on day 5, a profit of 354 would occur because A[5] − A[4] = 21367 − 21013 = 354. Maximum possible profit was 356. It would occur if a share was bought on day 1 and sold on day 5.

 Write a function,

 function solution(A);
 that, given a zero-indexed array A consisting of N integers containing daily prices of a stock share for a period of N consecutive days, returns the maximum possible profit from one transaction during this period. The function should return 0 if it was impossible to gain any profit.

 For example, given array A consisting of six elements such that:

 A[0] = 23171
 A[1] = 21011
 A[2] = 21123
 A[3] = 21366
 A[4] = 21013
 A[5] = 21367
 the function should return 356, as explained above.

 Assume that:

 N is an integer within the range [0..400,000];
 each element of array A is an integer within the range [0..200,000].
 Complexity:

 expected worst-case time complexity is O(N);
 expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).
 Elements of input arrays can be modified.
 */
/**
 * A non-empty zero-indexed array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The sum of a slice (P, Q) is the total of A[P] + A[P+1] + ... + A[Q].

 Write a function:

 function solution(A);
 that, given an array A consisting of N integers, returns the maximum sum of any slice of A.

 For example, given array A such that:

 A[0] = 3  A[1] = 2  A[2] = -6
 A[3] = 4  A[4] = 0
 the function should return 5 because:

 (3, 4) is a slice of A that has sum 4,
 (2, 2) is a slice of A that has sum −6,
 (0, 1) is a slice of A that has sum 5,
 no other slice of A has sum greater than (0, 1).
 Assume that:

 N is an integer within the range [1..1,000,000];
 each element of array A is an integer within the range [−1,000,000..1,000,000];
 the result will be an integer within the range [−2,147,483,648..2,147,483,647].
 Complexity:

 expected worst-case time complexity is O(N);
 expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
 Elements of input arrays can be modified.
 */
let tf = require("./testFrame");
function solution (A){
    let stack = [], count = 0;
    let i = 0;
    while(i < A.length){
        while(stack.length > 0 && A[i] < stack.slice(-1)) {
            stack.pop();
        }

        if(stack.length === 0 || A[i] > stack.slice(-1)){
            stack.push(A[i]);
            count++;
        }
        i++;
    }
    return count;
}

let testcases = [
    [8,8,5,7,9,8,7,4,8],
    [3, 3, 3, 3,4,4,4,4,4],
    [4, 4, 2, 5, 3, 4, 4, 4]

];
tf.run(solution,testcases);