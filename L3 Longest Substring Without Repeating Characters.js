/**
 *
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * Example 2:
 *
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * Example 3:
 *
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 *
 *
 * Constraints:
 *
 * 0 <= s.length <= 5 * 104
 * s consists of English letters, digits, symbols and spaces.
 */

/***
 *
 *  * Definition for singly-linked list.
 *  * function ListNode(val, next) {
 *  *     this.val = (val===undefined ? 0 : val)
 *  *     this.next = (next===undefined ? null : next)
 *  * }
 You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

 You may assume the two numbers do not contain any leading zero, except the number 0 itself.



 Example 1:


 Input: l1 = [2,4,3], l2 = [5,6,4]
 Output: [7,0,8]
 Explanation: 342 + 465 = 807.
 Example 2:

 Input: l1 = [0], l2 = [0]
 Output: [0]
 Example 3:

 Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 Output: [8,9,9,9,0,0,0,1]


 Constraints:

 The number of nodes in each linked list is in the range [1, 100].
 0 <= Node.val <= 9
 It is guaranteed that the list represents a number that does not have leading zeros.
 Accepted
 3,167,615
 Submissions

 */

const tf = require('./testFrame');
const testCases = [
    ['abcabcbb'],
    ['bbbbb'],
    ['pwwkew'],
    ['abcde'],
    ['abba'],
    [''],
]

function ts(s) {
    let head = 0, tail, existChars = new Map(), max = 0;
    for (tail = 0; tail < s.length; tail++) {
        const c = s[tail];
        if (existChars.has(c)) {
            max = Math.max(max, tail - head);
            head = Math.max(head, existChars.get(c) + 1);
        }
        existChars.set(c, tail);
    }
    return Math.max(max, tail - head)

}

tf.run(ts, testCases);
