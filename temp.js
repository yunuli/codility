let testcases = [
    [-10, -10, -8, -4, -2,
        -1, -1, 0, 1, 1,
        2, 2, 5, 7, 9, 10],//9
    [-10, -10, -8, -4, -2,
        -1, -1, 1, 1,
        2, 2, 5, 7, 9, 10],//8
]

function lookNext(A) {
    let prev = null, count = 0, left = 0, right = A.length - 1;
    while (left < right) {

        while (-A[left] >= A[right] && A[left] <= 0) {
            if (-A[left] !== prev) {
                prev = -A[left];
                count++;
            }
            left++;
        }

        while (A[right] >= -A[left] && A[right] >= 0) {
            if (A[right] !== prev) {
                prev = A[right];
                count++;
            }
            right--;
        }

    }

    console.log(count)
}

function lookNext(A) {

    console.log((new Set(A.map((x)=> Math.abs(x)))).size)
}

testcases.forEach(lookNext);

