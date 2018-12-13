/*
给定整数n和m, 将1到n的这n个整数按字典序排列之后, 求其中的第m个数。
对于n=11, m=4, 按字典序排列依次为1, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 因此第4个数是2.
对于n=200, m=25, 按字典序排列依次为1 10 100 101 102 103 104 105 106 107 108 109 11 110 111 112 113 114 115 116 117 118 119 12 120 121 122 123 124 125 126 127 128 129 13 130 131 132 133 134 135 136 137 138 139 14 140 141 142 143 144 145 146 147 148 149 15 150 151 152 153 154 155 156 157 158 159 16 160 161 162 163 164 165 166 167 168 169 17 170 171 172 173 174 175 176 177 178 179 18 180 181 182 183 184 185 186 187 188 189 19 190 191 192 193 194 195 196 197 198 199 2 20 200 21 22 23 24 25 26 27 28 29 3 30 31 32 33 34 35 36 37 38 39 4 40 41 42 43 44 45 46 47 48 49 5 50 51 52 53 54 55 56 57 58 59 6 60 61 62 63 64 65 66 67 68 69 7 70 71 72 73 74 75 76 77 78 79 8 80 81 82 83 84 85 86 87 88 89 9 90 91 92 93 94 95 96 97 98 99 因此第25个数是120…
* */

let tf = require("./testFrame");

// let curLine = 0;
//
// function readline(A) {
//     if (curLine < A.length) {
//         return A[curLine++];
//     }
//     return null;
// }
//
// function getInput(A) {
//     let line;
//     const inputs = [];
//     while (line = readline(A)) {
//         line = line.split(' ');
//         inputs.push(line);
//     }
//     curLine = 0;
//     return solution(inputs);
// }

const treeNodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


function solutionDfsNoRecur({max, rank}) {

    let stack = [], node = {value: 1, layer: 1}, v = 0, temp = v;


    while (!stack.length || temp <= max) {
        v = temp;
        temp = v + node.value + (node.layer - 1) * 10;
        stack.push()
    }
}

function solutionOutOfTime(inputs) {
    //bfs search
    console.log(inputs);
    let len = 10, upperbound = inputs.max, nth = inputs.rank, count = 0, nthValue = 0, queue = [];

    // [upperbound, nth] = inputs.map((i) => parseInt(i));

    function traversTrieTree(currentValue = 0, from = 0) {

        for (let i = from; i < len; i++) {
            const nodeValue = currentValue * 10 + treeNodes[i];

            if (nodeValue > upperbound || count === nth) {
                return;
            }

            count++;

            if (count === nth) {
                nthValue = nodeValue;

                return;
            }

            traversTrieTree(nodeValue)
        }
    }

    traversTrieTree(0, 1);
    return nthValue;


}

function solution1({max, rank}) {
    let count = 0;

    function solve(n, m) {
        let ans = 1;
        while (m !== 0) {
            let cnt = getCntOfPre(ans, n);
            if (cnt >= m) {
                m--;
                if (m === 0)
                    break;
                ans *= 10;
            } else {
                m -= cnt;
                ans++;
            }
        }
        return ans;
    }

    function getCntOfPre(pre, n) {
        let cnt = 1;
        let p = 10;
        for (; pre * p <= n; p *= 10) {
            count++;
            if (pre * p - 1 + p <= n)
                cnt += p;
            else
                cnt += n - pre * p + 1;

//          cnt += Math.min(n, pre * p - 1 + p) - pre * p + 1;
        }
        return cnt;
    }

    let a = solve(max, rank);
    console.log(count);
}

function solution2({max, rank}) {

    let n = max, m = rank, i = 1;
    m--;
    let count = 0;
    while (m !== 0) {
        let start = i, end = i + 1, num = 0;
        while (start <= n) {
            count++;
            num += Math.min(n + 1, end) - start;
            start *= 10;
            end *= 10;
            console.log(start,end, num);
        }
        if (num > m) {
            i *= 10;
            m--;
        }else{
            m -= num;
            i++;
        }

    }
    console.log(count);

    return i;


}

function mySolution({max, rank}) {
    if (isNaN(Number(max)) || isNaN(Number(rank)))
        throw TypeError('must be number');
    if (!max || max < rank)
        throw RangeError('max must not be less than rank');

    let boundaryArray = [], result = 0, dim = 10, totalNodes = max;

    while (max > 0) {
        boundaryArray.push(max % 10);
        max = Math.floor(max / 10);
    }

    boundaryArray = boundaryArray.reverse();

    let maxDepth = boundaryArray.length;

    rank += Number('1'.repeat(maxDepth));
    totalNodes += Number('1'.repeat(maxDepth));

    while (true) {

        let leftDepth = maxDepth, rightDepth;
        if (boundaryArray.every(n => n === 9)) {
            rightDepth = leftDepth
        } else {
            rightDepth = leftDepth - 1;
        }

        const leftNodes = Number('1'.repeat(leftDepth)), rightNodes = Number('1'.repeat(rightDepth));
        const nodesOfBoundary =
            totalNodes
            - boundaryArray[0] * leftNodes
            - (dim - boundaryArray[0] - 1) * rightNodes;

        let index = Math.ceil(rank / leftNodes) - 1;

        if (index < boundaryArray[0]) {
            rank -= index * leftNodes;
            totalNodes = leftNodes;
            boundaryArray = boundaryArray.map(n => 9);
        } else {
            if ((index * leftNodes + nodesOfBoundary) >= rank) {
                index = boundaryArray[0];
            } else {
                index = dim - 1 - Math.floor((totalNodes - rank) / rightNodes);
            }
            if (index === boundaryArray[0]) {
                totalNodes = nodesOfBoundary;
                rank -= index * leftNodes;
            } else {
                maxDepth = rightDepth;
                totalNodes = rightNodes;
                rank = rank - boundaryArray[0] * leftNodes - nodesOfBoundary - (index - boundaryArray[0] - 1) * rightNodes;
                boundaryArray = boundaryArray.map(n => 9);
            }
        }


        result = result * 10 + index;
        boundaryArray.shift();
        if (rank === 1) return result;
        totalNodes--;
        maxDepth--;
        rank--;
    }
}

let testcases = [
    // [{max: 'a', rank: 'b'}],
    // [{max: 4, rank: 5}],
    [{max: 19, rank: 11}],//19
    [{max: 1000, rank: 99}],//187
    [{max: 1000, rank: 1000}],//999
    [{max: 11, rank: 2}],//10
    [{max: 11, rank: 4}],//2
    [{max: 200, rank: 25}],//120
    [{max: 300, rank: 22}],//118
    [{max: 10, rank: 9}],//8
    [{max: 100, rank: 9}],//16
    [{max: 100, rank: 99}],//98
    [{max: 1000, rank: 999}],//998
    [{max: 10000, rank: 9999}],//9998
    [{max: 100000, rank: 99999}],//99998
    [{max: 1000000, rank: 999999}],//999998
    [{max: 10000000, rank: 999999}],//189997
    [{max: 1000000000, rank: 99999999}],//18999997
    [{max: 1000000000, rank: 1000000000}]//999999999
];
//answer
//2
//19

tf.run(solution2, testcases);

//5 2 3
// 3 1 2 3
// '0',
// 2 2 3
// 1 2
// 1 3

// while(line=readline()){
//     var lines = line.split(' ');  //字符串转换为字符数组
//     var a = parseInt(lines[0]);
//     var b = parseInt(lines[1]);
//     print(a+b);
// }
