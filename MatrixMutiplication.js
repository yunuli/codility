const tester = require("./testFrame");
console.enableLog = true

function solution(arrays) {
    let n = arrays.length;
    let matrix = Array(n).fill(0)
    matrix = matrix.map(() => {
        return Array(n).fill(0)
    })

    //先寻找较小问题解，从i~j的间隔s为1开始，直到n
    /*
    A×((B×C)×D) 20·1·10+20·10·100+50·20·100 120200 
    (A × (B × C)) × D 20 · 1 · 10 + 50 · 20 · 10 + 50 · 10 · 100 60200 
    (A × B) × (C × D) 50 · 20 · 1 + 1 · 10 · 100 + 50 · 1 · 100 7000
     */
    for (let s = 1; s < n; s++) {
        console.log(s,'-------------')
        for (let i = 0; i < n - s; i++) {
            let j = i + s, min = Infinity;
            console.log(i,j,'=================')
            for (let k = i; k < j; k++) {
                let multiplicationCount = matrix[i][k] + matrix[k + 1][j] +
                    arrays[i].m * arrays[k].n * arrays[j].n;
                min = multiplicationCount < min ? multiplicationCount : min;
                console.log(i,j,k,multiplicationCount,min)
            }
            matrix[i][j] = min;
        }
    }
    return matrix[1][n]

}

let testcases = [
    [[{m: 50, n: 20}, {m: 20, n: 1}, {m: 1, n: 10}, {m: 10, n: 100},]],//120200,60200,7000
    // [6, [3, 4, 5, 5, 2]],
    // [5, [1, 1, 2, 2, 3, 3]],
    // ,
    // [10, [1, 1, 1, 1, 1, 1, 1, 1]],
    // [10, [1, 2, 3, 4, 5, 6, 7]]
    // ,
    // [10,function(){
    //     let a = [];
    //     for (let i = 0; i < 10; i++) {
    //         a[i] = Math.random();
    //     }
    //     return a;
    // }()]
    // // ,
    // [[]],
    // [[]]
];
tester.run(solution, testcases);