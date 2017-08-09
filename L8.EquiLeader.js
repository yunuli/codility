/**
EquiLeader
A non-empty zero-indexed array A consisting of N integers is given.

The leader of this array is the value that occurs in more than half of the elements of A.

An equi leader is an index S such that 0 ≤ S < N − 1 and two sequences A[0], A[1], ..., A[S] and A[S + 1], A[S + 2], ..., A[N − 1] have leaders of the same value.

For example, given array A such that:

    A[0] = 4
    A[1] = 3
    A[2] = 4
    A[3] = 4
    A[4] = 4
    A[5] = 2
we can find two equi leaders:

0, because sequences: (4) and (3, 4, 4, 4, 2) have the same leader, whose value is 4.
2, because sequences: (4, 3, 4) and (4, 4, 2) have the same leader, whose value is 4.
The goal is to count the number of equi leaders.

Write a function:

int solution(int A[], int N);
that, given a non-empty zero-indexed array A consisting of N integers, returns the number of equi leaders.

For example, given:

    A[0] = 4
    A[1] = 3
    A[2] = 4
    A[3] = 4
    A[4] = 4
    A[5] = 2
the function should return 2, as explained above.

Assume that:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.
 **/

let tf = require("./testFrame");
function solution (A){
    let itemCount = A.length;

    function findCandidate(){
        let candidate ={value:A[0], size:1, idx:0};

        for(let i = 1; i < itemCount; i++){
            if(candidate.size > 0 && A[i] !== candidate.value){
                candidate.size--;
            }else{
                candidate.size++;
                candidate.idx = i;
                candidate.value = A[i];
            }
        }

        if(candidate.size === 0){
            return null;
        }

        let candidateCount = 0,  c = candidate.value;
        A.forEach((item) => {item === c ? candidateCount++: null});
        candidate.count = candidateCount;
        return candidateCount > itemCount / 2 ? candidate : null;
    }

    function countGroup(candidate){
        let partialCount =0, groupCount = 0, candidateCount = candidate.count;
        for(let idx = 0; idx < itemCount; idx++){
            if(A[idx] === candidate.value) partialCount++;
            if(partialCount * 2 > (idx+1)  && (candidateCount -partialCount) * 2 > itemCount-idx -1)
                groupCount++;
        }

        return groupCount;
    }

    let candidate = findCandidate();
    return candidate ? countGroup(candidate) : 0;


}

let testcases = [
    [3, 4, 3, 2, 3, -1, 3, 3],
    [3, 3, 3, 3,4,4,4,4,4],
    [4, 4, 2, 5, 3, 4, 4, 4]

];
tf.run(solution,testcases);