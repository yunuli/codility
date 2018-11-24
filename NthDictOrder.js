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

function solution({max, rank}) {
    if (isNaN(Number(max)) || isNaN(Number(rank)))
        throw TypeError('must be number');
    if (!max || max < rank)
        throw RangeError('max must not be less than rank');

    let boundaryArray = [], result = [], dim = 10, totalNodes = max;

    while (max > 0) {
        boundaryArray.push(max % 10);
        max = Math.floor(max / 10);
    }

    boundaryArray = boundaryArray.reverse();

    let maxDepth = boundaryArray.length, currentLayer = 0;

    rank += Number('1'.repeat(maxDepth));
    totalNodes += Number('1'.repeat(maxDepth));

    while (true) {

        let leftDepth = maxDepth, rightDepth;
        if (boundaryArray.every(n => n === 9)) {
            rightDepth = leftDepth
        } else {
            rightDepth = leftDepth - 1;
        }
        let currentBoundary = boundaryArray[currentLayer];
        const leftNodes = Number('1'.repeat(leftDepth)), rightNodes = Number('1'.repeat(rightDepth));
        const nodesOnBoundary =
            totalNodes
            - currentBoundary * leftNodes
            - (dim - currentBoundary - 1) * rightNodes;

        let index = Math.ceil(rank / leftNodes) - 1;

        if (index < currentBoundary) {
            rank -= index * leftNodes;
            totalNodes = leftNodes;
            boundaryArray = boundaryArray.map(n => 9);
        } else {
            if ((index * leftNodes + nodesOnBoundary) >= rank) {
                index = currentBoundary;
            } else {
                index = dim - 1 - Math.floor((totalNodes - rank) / rightNodes);
            }
            if (index === currentBoundary) {
                totalNodes = nodesOnBoundary;
                rank -= index * leftNodes;
            } else {
                maxDepth--;
                totalNodes = rightNodes;
                rank = rank - currentBoundary * leftNodes - nodesOnBoundary - (index - currentBoundary - 1) * rightNodes;
                boundaryArray = boundaryArray.map(n => 9);
            }
        }


        result.push(index);
        if (rank === 1) return result;
        totalNodes--;
        currentLayer++;
        maxDepth--;
        rank--;
    }


}

let testcases = [
    // [{max: 'a', rank: 'b'}],
    // [{max: 4, rank: 5}],
    [{max: 1000, rank: 99}],//187
    [{max: 1000, rank: 1000}],//187
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
    [{max: 1000000000, rank: 1000000000}]//18999997
];
//answer
//2
//19

tf.run(solution, testcases);

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
