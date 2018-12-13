let tf = require("./testFrame");


function getNthNumber(n, exp, radix) {
    return Math.floor(n / exp) % radix;
}

function getMax(A) {
    let Max = A[0];
    A.forEach((n) => Max = Max > n ? Max : n);
    return Max;
}

function sortByExp(A, exp, radix) {
    let buckets = Array(radix), tempOutput = Array(A.length);

    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = 0;
    }

    A.forEach(n => {
        buckets[getNthNumber(n, exp, radix)]++;
    });

    for (let i = 1; i < buckets.length; i++) {
        buckets[i] += buckets[i - 1]
    }

    for(let i = A.length - 1; i >=0; i--){
        tempOutput[buckets[getNthNumber(A[i], exp, radix)] - 1] = A[i];
        buckets[getNthNumber(A[i], exp, radix)]--;
    }

    tempOutput.forEach((n, index) => {
        A[index] = n;
    });
    return A
}

function radixSort(Arr, radix = 10) {
    const max = getMax(Arr);
    for (let exp = 1; exp <= max; exp *= 10) {
        sortByExp(Arr, exp, radix);
    }
    return Arr
}

let testcases = [
    [[1, 3, 5, 7, 9, 22, 48, 69, 81, 101]],
    [[3, 1]],
    [[3]]
];

tf.run(radixSort, testcases);
