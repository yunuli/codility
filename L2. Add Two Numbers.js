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
    [[2, 4, 3], [5, 6, 4]],
    [[0], [0]],
    [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]]
]

function ts(l1, l2) {
    let p1 = l1, p2 = l2, resultHeader = new ListNode(), lr = resultHeader, carry = 0;
    while (p1 || p2) {
        const v1 = p1 ? p1.val : 0, v2 = p2 ? p2.val : 0;
        const sum = v1 + v2 + carry;
        carry = sum > 9 ? 1 : 0;
        const remainder = sum % 10;
        const node = new ListNode(remainder)
        lr.next = node;
        lr = node;
        p1 = p1 && p1.next;
        p2 = p2 && p2.next;
    }

    if (carry) {
        lr.next = new ListNode(1)
    }
    return resultHeader.next;
}

tf.run(ts, testCases);
