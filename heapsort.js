let tester = require('./testFrame');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function heapify(A, root, len) {
    let currentNode = root;

    while (currentNode < len) {
        let leftChild = currentNode * 2 + 1, rightChild = currentNode * 2 + 2;
        if (rightChild < len && A[rightChild] > A[currentNode]) {
            currentNode = rightChild;
        }
        if (leftChild < len && A[leftChild] > A[currentNode]) {
            currentNode = leftChild;
        }

        if (currentNode === root) return;

        [A[root], A[currentNode]] = [A[currentNode], A[root]];
        root = currentNode;
    }
}

function makeHeap(A) {
    for (let i = (A.length - 1) >> 2; i >= 0; i--) {
        heapify(A, i, A.length);
    }
}


function solution(A) {
    makeHeap(A);
    let len = A.length;
    while (len > 0) {
        [A[0], A[len - 1]] = [A[len - 1], A[0]];
        len--;
        heapify(A, 0, len);

    }
    console.log(A);

}

let testcases = [
    [[3, 5, 18, 2]],
    [[3, 5, 18, 2, 9]],
    [[1, 2, 3, 4, 5]],
    [[10, 9, 8, 7, 6, 5, 4, 3]],
    [[1]],
];

tester.run(solution, testcases);
