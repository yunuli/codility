let tf = require("./testFrame");


function permutation(Arr, from = 0) {
    if (from === Arr.length) {
        console.log(Arr);
        permutation.count++;
    }
    for (let k = from; k < Arr.length; ++k) {
        [Arr[k], Arr[from]] = [Arr[from], Arr[k]];
        permutation(Arr, from + 1);
        [Arr[k], Arr[from]] = [Arr[from], Arr[k]];
    }
}

function next_perm(perm) {
    let i = perm.length - 1;
    while (i > 0 && perm[i] < perm[i - 1]) {
        i--;
    }

    if (i === 0) return false;
    let ii = i - 1;
    while (perm[ii] < perm[i] && i < perm.length) {
        i++;
    }
    [perm[ii], perm[i - 1]] = [perm[i - 1], perm[ii]];

    perm = perm.slice(0, ii + 1).concat(perm.slice(ii + 1).reverse());
    console.log(perm);
    return true;
}

function factorial(n) {

}


function getIndex(perm) {
// for an N length permutation index = a.n-1 * (N-1)! + a.n-2 * (N-2)! + ...+ a.1 * 1!  + a.0 * 0!
    let index = 0, k = 1, len = perm.length;
    for (let i = len - 2; i >= 0; i--, k = k * (len - i - 1)) {
        for (let j = i + 1; j < len; j++) {
            if (perm[i] > perm[j]) {
                index += k
            }

        }
    }
    return index;
}

function getPerm(index, dim) {
    let k = 1, m, perm = Array(dim);
    for (let i = dim - 1; i >= 0; i--) {
        console.log(index, dim - i);
        perm[i] = index % (dim - i);
        index = Math.floor(index / (dim - i));
    }
    // perm [dim - 1] = 0;
    // for (let i = 1; i < dim; i++, k *= i) {
    //     m = index % (k * (k + 1));
    //     console.log(`${index}:i:${i}, k:${k*k+1}, m:${m}`);
    //
    //     perm[dim - i - 1] = Math.floor(m / k);
    // }
    console.log(perm);

    for (let i = dim - 1; i > 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            if (perm[j] <= perm[i]) {
                perm[i]++;
            }
        }
    }

}

function solution_perm(Arr) {
    permutation.count = 0;
    permutation(Arr, 0);
    console.log(Arr.length, ' total: ', permutation.count);
}

function solution_next_perm(perm) {
    return next_perm(perm);
}

function permuteUnique(arr, start) {
    if (start === arr.length) {
        console.log(arr)
        return
    }

    // permuteUnique(arr, start + 1);
    let visited = {}
    for (let i = start; i < arr.length; i++) {

        // console.log(start,i,arr)
        if (start !== i && visited[arr[i]] === true) {
            continue
        }
        visited[arr[i]] = true;
        [arr[i], arr[start]] = [arr[start], arr[i]]
        permuteUnique(arr, start + 1);
        [arr[i], arr[start]] = [arr[start], arr[i]]
    }

}

let testcases_perm = [
    [[1, 2, 3]],
    [[1, 1, 3]],
    [[2, 2, 1, 1]],
    [[1, 1, 2, 2]],
    [[1, 1, 1]],

    // [[1, 2, 3, 4, 5]],
    // [[1, 2, 3, 4, 5, 6]],
    // [[1, 2, 1, 4, 2, 6]],
];
let testcases_next_perm = [
    [[1]],//false
    [[1, 2, 3]],//132
    [[3, 2, 1]],//false
    [[1, 2]],//[2,1]
    [[2, 1]], //false
    [[1, 5, 3, 2, 4]],//15342
    [[1, 4, 5, 3, 2,]], //15234
    [[1, 4, 6, 5, 3, 2,]], //152346
    [[1, 2, 5, 4, 3]], //13245

];

let testcases_get_index = [
    [[3, 2, 1, 4]],//14
    [[1, 2, 3, 4]],//0
    [[4, 3, 2, 1]],//23
    [[2, 1]],//1
    [[1, 2]],//0
];

let testcases_get_perm = [
    [14, 4],//2,1,0.0
    [0, 4],//0,0,0,0
    [23, 4],//3,2,1,0
    [1, 2],
    [0, 2],
    [100, 5]


];
// tf.run(solution_perm, testcases_perm);
// tf.run(solution_next_perm, testcases_next_perm);
// tf.run(getIndex, testcases_get_index);
tf.run(permuteUnique, testcases_perm, 0);
