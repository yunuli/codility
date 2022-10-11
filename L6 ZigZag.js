/*
 * @lc app=leetcode id=6 lang=javascript
 *
 * [6] ZigZag Conversion
 *
 * https://leetcode.com/problems/zigzag-conversion/description/
 *
 * algorithms
 * Medium (36.11%)
 * Likes:    1799
 * Dislikes: 4843
 * Total Accepted:    481.8K
 * Total Submissions: 1.3M
 * Testcase Example:  '"PAYPALISHIRING"\n3'
 *
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number
 * of rows like this: (you may want to display this pattern in a fixed font for
 * better legibility)
 * 
 * 
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 
 * 
 * And then read line by line: "PAHNAPLSIIGYIR"
 * 
 * Write the code that will take a string and make this conversion given a
 * number of rows:
 * 
 * 
 * string convert(string s, int numRows);
 * 
 * Example 1:
 * 
 * 
 * Input: s = "PAYPALISHIRING", numRows = 3
 * Output: "PAHNAPLSIIGYIR"
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: s = "PAYPALISHIRING", numRows = 4
 * Output: "PINALSIGYAHRPI"
 * Explanation:
 * 
 * P     I    N
 * A   L S  I G
 * Y A   H R
 * P     I
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    if (numRows === 1) return s;
    let row = 0;
    let stride = (numRows - 1) << 1;
    let result = ''
    let length = s.length;
    while (row < numRows) {
        let index = row, skips = [row]
        if (row !== 0 || row !== numRows - 1) {
            skips.push(stride - row)
        }
        while()
        
    }
};

let testcases = [
    ['PAYPALISHIRING', 3], //PAHNAPLSIIGYIR
    ['PAYPALISHIRING', 4], //PINALSIGYAHRPI
    ['A', 1], //PINALSIGYAHRPI

]
const tf = require('./testFrame');
tf.run(convert, testcases);
// @lc code=end

