let tester = require('./testFrame');
/*
 * @lc app=leetcode id=994 lang=javascript
 *
 * [994] Rotting Oranges
 *
 * https://leetcode.com/problems/rotting-oranges/description/
 *
 * algorithms
 * Easy (46.39%)
 * Likes:    257
 * Dislikes: 14
 * Total Accepted:    13.1K
 * Total Submissions: 28.2K
 * Testcase Example:  '[[2,1,1],[1,1,0],[0,1,1]]'
 *
 * In a given grid, each cell can have one of three values:
 *
 *
 * the value 0 representing an empty cell;
 * the value 1 representing a fresh orange;
 * the value 2 representing a rotten orange.
 *
 *
 * Every minute, any fresh orange that is adjacent (4-directionally) to a
 * rotten orange becomes rotten.
 *
 * Return the minimum number of minutes that must elapse until no cell has a
 * fresh orange.  If this is impossible, return -1 instead.
 *
 *
 *
 *
 * Example 1:
 *
 *
 *
 *
 * Input: [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 *
 *
 *
 * Example 2:
 *
 *
 * Input: [[2,1,1],[0,1,1],[1,0,1]]
 * Output: -1
 * Explanation:  The orange in the bottom left corner (row 2, column 0) is
 * never rotten, because rotting only happens 4-directionally.
 *
 *
 *
 * Example 3:
 *
 *
 * Input: [[0,2]]
 * Output: 0
 * Explanation:  Since there are already no fresh oranges at minute 0, the
 * answer is just 0.
 *
 *
 *
 *
 * Note:
 *
 *
 * 1 <= grid.length <= 10
 * 1 <= grid[0].length <= 10
 * grid[i][j] is only 0, 1, or 2.
 *
 *
 *
 *
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
//还有树形深度或广度优先遍历法，更占内存
var orangesRotting1 = function (grid) {

    /*

    每次只判断右边和下方节点
    ✔ Accepted
      ✔ 303/303 cases passed (68 ms)
      ✔ Your runtime beats 84.74 % of javascript submissions
      ✔ Your memory usage beats 88.89 % of javascript submissions (35.4 MB)

      ✔ Accepted
      ✔ 303/303 cases passed (80 ms)
      ✔ Your runtime beats 41.37 % of javascript submissions
      ✔ Your memory usage beats 82.41 % of javascript submissions (35.5 MB)

      时间应该和测试数据分布有关，不一定此法优于下面的方法

     */
    let currentTime = 1,
        remains,
        hasRotten, row = grid.length,
        col = grid[0].length

    function markRotten(i, j) {

        if (grid[i][j] == currentTime) {
            if (i + 1 < row && grid[i + 1][j] === 1) {
                hasRotten = true
                grid[i + 1][j] = currentTime + 1
            }

            if (j + 1 < col && grid[i][j + 1] === 1) {
                hasRotten = true
                grid[i][j + 1] = currentTime + 1
            }
        } else if (grid[i][j] == 1) {
            if (i + 1 < row && grid[i + 1][j] == currentTime ||
                j + 1 < col && grid[i][j + 1] == currentTime) {
                hasRotten = true
                grid[i][j] = currentTime + 1
            } else {
                remains++
            }
        }
    }

    do {
        hasRotten = false
        remains = 0
        currentTime++
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                markRotten(i, j)
            }
        }
    }
    while (hasRotten)
    return remains > 0 ? -1 : currentTime - 2

}

var orangesRotting = function (grid) {

    /*
    *每次判断四个邻居
    *
     * Accepted
      ✔ 303/303 cases passed (60 ms)
      ✔ Your runtime beats 96.79 % of javascript submissions
      ✔ Your memory usage beats 81.48 % of javascript submissions (35.5 MB)

      Accepted
      ✔ 303/303 cases passed (56 ms)
      ✔ Your runtime beats 99.2 % of javascript submissions
      ✔ Your memory usage beats 77.78 % of javascript submissions (35.7 MB)
    * */
    let currentTime = 2,
        fresh = 0,
        hasNewRotten,
        row = grid.length,
        col = grid[0].length;

    function markNode(i, j) {
        if (i < 0 || i >= row
           // || j < 0 || j >= col 去掉这段似乎更快
        ) return;
        if (grid[i][j] === 1) {
            grid[i][j] = currentTime + 1;
            fresh--;
            hasNewRotten = true;
        }
    }

    function markNeighbours(i, j) {
        if (grid[i][j] === currentTime) {

            markNode(i + 1, j);
            markNode(i - 1, j);
            markNode(i, j + 1);
            markNode(i, j - 1);
        }
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === 1)
                fresh++;
        }
    }
    if (fresh === 0) return 0;


    do {
        hasNewRotten = false;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                markNeighbours(i, j);
            }
        }
        currentTime++;
    }
    while (hasNewRotten && fresh > 0);
    return fresh === 0 ? currentTime - 2 : -1;

}

let testcases = [
    [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]],//-1
    [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]],//4
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

tester.run(orangesRotting1, testcases);
