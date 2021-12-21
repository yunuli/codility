/*
 * @lc app=leetcode id=329 lang=javascript
 *
 * [329] Longest Increasing Path in a Matrix
 *
 * https://leetcode.com/problems/longest-increasing-path-in-a-matrix/description/
 *
 * algorithms
 * Hard (48.24%)
 * Likes:    4518
 * Dislikes: 79
 * Total Accepted:    282.9K
 * Total Submissions: 581.9K
 * Testcase Example:  '[[9,9,4],[6,6,8],[2,1,1]]'
 *
 * Given an m x n integers matrix, return the length of the longest increasing
 * path in matrix.
 * 
 * From each cell, you can either move in four directions: left, right, up, or
 * down. You may not move diagonally or move outside the boundary (i.e.,
 * wrap-around is not allowed).
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
 * Output: 4
 * Explanation: The longest increasing path is [1, 2, 6, 9].
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
 * Output: 4
 * Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally
 * is not allowed.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: matrix = [[1]]
 * Output: 1
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= m, n <= 200
 * 0 <= matrix[i][j] <= 2^31 - 1
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */



var longestIncreasingPath = function (matrix) {
    function dfs(i, j) {
        // console.log(i, j);
        if (pathMatrix[i][j] > 0) return pathMatrix[i][j];
        let ascPaths = [], currentNode = matrix[i][j]

        //上
        if (matrix[i - 1] && matrix[i - 1][j] > currentNode) {
            ascPaths.push(dfs(i - 1, j))
        }
        //下
        if (matrix[i + 1] && matrix[i + 1][j] > currentNode) {
            ascPaths.push(dfs(i + 1, j))
        }
        //左
        if (matrix[i][j - 1] > currentNode) {
            ascPaths.push(dfs(i, j - 1))
        }
        //右
        if (matrix[i][j + 1] > currentNode) {
            ascPaths.push(dfs(i, j + 1))
        }
        const longestPath = Math.max(0, ...ascPaths) + 1;
        pathMatrix[i][j] = longestPath;
        // console.log(longestPath);
        max = Math.max(max, longestPath)
        return longestPath;
    }

    let m = matrix.length;
    let n = matrix[0].length;
    let max = 1;
    let pathMatrix = new Array(m);
    for (let i = 0; i < pathMatrix.length; i++) {
        pathMatrix[i] = new Array(n).fill(0);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j)
        }
    }

    return max;
};
// @lc code=end
let testcases = [
    [[[9, 9, 4], [6, 6, 8], [2, 1, 1]]],//4
    [[[3, 4, 5], [3, 2, 6], [2, 2, 1]]],//4
    [[[1]]],//1

]
const tf = require('./testFrame')
tf.run(longestIncreasingPath, testcases);