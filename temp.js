let matrix1 = [[1]]
let matrix14 = [[1, 2, 3, 4]]
let matrix41 = [[1], [2], [3], [4]]
let matrix22 = [[1, 2], [4, 3]]
let matrix35 = [[1, 2, 3, 4, 5], [12, 7, 8, 9, 6], [11, 10, 9, 8, 7]]
let matrix53 = [[1, 2, 3], [12, 13, 4], [11, 14, 5], [10, 15, 6], [9, 8, 7]]
let matrix44 = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]
let matrix54 = [[1, 2, 3, 4], [14, 15, 16, 5], [13, 20, 17, 6], [12, 19, 18, 7], [11, 10, 9, 8]]


function topEdge(x, y, k, m, n) {
    console.log('top')
    if (m === 1) {
        return {x, y: x + (y - x + k) % n, remainder: 0}
    }
    let remainder = k - (x + n - 1 - y)
    if (remainder <= 0) {
        return {x, y: y + k, remainder}
    }
    return {x, y: x + n - 1, remainder}
}


function leftEdge(x, y, k, m, n) {
    console.log('left')
    if (n === 1) {
        return {x: y + (x - y + k) % m, y, remainder: 0}
    }
    let remainder = k - (x - y)
    if (remainder <= 0) {
        return {x: x - k, y, remainder}
    }
    return {x: y, y, remainder}
}

function bottomEdge(x, y, k, m, n) {
    console.log('bottom')
    let remainder = k - (y - (x - m + 1))
    if (remainder <= 0) {
        return {x, y: y - k, remainder}
    }
    return {x, y: x - m + 1, remainder}
}

function rightEdge(x, y, k, m, n) {
    console.log('right')
    let remainder = k - (y - n + m - x)
    if (remainder <= 0) {
        return {x: x + k, y, remainder}
    }
    return {x: y - n + m, y, remainder}
}

let checkFunctions = [topEdge, rightEdge, bottomEdge, leftEdge]

function nextKIndices(x, y, k, m, n, edgeIndex) {
    // x,y 元素在矩阵的坐标 x为横轴，y为纵轴
    // k 位移步数
    //  m, n 旋转矩阵的维度
    //偏移量
    let point = {x, y, remainder: k}, edgeToCheck = m > 1 ? 4 : 1;

    while (point.remainder > 0 && edgeToCheck > 0) {

        point = checkFunctions[edgeIndex](point.x, point.y, point.remainder, m, n)
        console.log(point)
        edgeToCheck--
        edgeIndex = (edgeIndex + 1) % 4
    }
    return point
}


// 已知x,y,m,n 求是第几圈  
// y>x, min(x, n - y)
// x>y, min(y, m - x)
// x == y, min(x, m - x, n - x)
function rotateKStep(sourceMatrix, k, m, n) {
    let resultMatrix = Array(m).fill(0).map(() => Array(n).fill(0))
    let loop = 0, i = loop, j = loop;
    while (loop <= m && loop <= n) {
        let total = m > 1 ? 2 * n + 2 * m - 4 : n;
        let step = k % total
        console.log('loop===========', loop, m, n, step)
        let x, y;

        for (x = loop, y = loop; m > 1 && x < loop + m; x++) {
            //左边
            console.log('---left', x, y)
            let next = nextKIndices(x, y, step, m, n, 3);
            resultMatrix[next.x][next.y] = sourceMatrix[x][y]
            printMatrix(resultMatrix)
        }
        for (x = loop + m - 1, y = loop; m > 1 && n > 1 && y < loop + n; y++) {
            //底边
            console.log('---bottom', x, y)
            let next = nextKIndices(x, y, step, m, n, 2);
            resultMatrix[next.x][next.y] = sourceMatrix[x][y]
            printMatrix(resultMatrix)
        }
        for (x = loop , y = loop + n - 1; m > 1 && n > 1 && x < loop + m; x++) {
            //右边
            console.log('---right', x, y)
            let next = nextKIndices(x, y, step, m, n, 1);
            resultMatrix[next.x][next.y] = sourceMatrix[x][y]
            printMatrix(resultMatrix)
        }

        for (x = loop, y = loop; y < loop + n; y++) {
            //顶
            console.log('---top', x, y)
            let next = nextKIndices(x, y, step, m, n, 0);
            resultMatrix[next.x][next.y] = sourceMatrix[x][y]
            printMatrix(resultMatrix)
        }


        ++loop;
        m -= 2;
        n -= 2;
    }
    printMatrix(sourceMatrix)
}

let matrix = matrix53, step = 2
rotateKStep(matrix, step, matrix.length, matrix[0].length)
// rotateKStep(matrix2, 1, matrix2.length, matrix2[0].length)
// rotateKStep(matrix1, 1, matrix1.length, matrix1[0].length)
