/***
 * 4. Median of Two Sorted Arrays
 * Hard
 *
 * 20032
 *
 * 2281
 *
 * Add to List
 *
 * Share
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 *
 * The overall run time complexity should be O(log (m+n)).
 *
 *
 *
 * Example 1:
 *
 * Input: nums1 = [1,3], nums2 = [2]
 * Output: 2.00000
 * Explanation: merged array = [1,2,3] and median is 2.
 * Example 2:
 *
 * Input: nums1 = [1,2], nums2 = [3,4]
 * Output: 2.50000
 * Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 *
 *
 * Constraints:
 *
 * nums1.length == m
 * nums2.length == n
 * 0 <= m <= 1000
 * 0 <= n <= 1000
 * 1 <= m + n <= 2000
 * -106 <= nums1[i], nums2[i] <= 106
 */

const tf = require('./testFrame');
const testCases = [
    [[1, 3], [2]],
    [[3], [-2, -1]],
    [[1, 2], [3, 4]],
    [[], [1]],
    [[1, 2], [3, 4, 5,]],
    // [[1, 2], [3, 4, 5, 6]],
    // [[1, 2], [-1, 3]],
]

tf.run(v2, testCases);

/***
 *  1. am > bm:
 *  am + bm < m => bm + 1 br
 *  am + bm >= m => al, am
 *
 *  2. am < bm:
 *  am + bm < m => am + 1, ar
 *  am + bm >= m => bl, bm
 *
 * 第三可以合并到1或者2
 *  3. am = bm:
 *  am + bm < m => am +1 ar, bm br； am, ar, bm+1, br
 *  am + bm > m => al am -1, bl bm; al am, bl bm -1
 *  am + bm = m return am or bm

 */
function version1(a, b) {
    let al = 0, bl = 0, ar = a.length, br = b.length, m = ~~((ar + br - 1) / 2), am, bm;
    while (al < ar && bl < br) {
        am = ~~((al + ar) / 2);
        bm = ~~((bl + br) / 2);
        if (a[am] >= b[bm]) {
            if (am + bm >= m) {
                ar = am;
            } else {
                bl = bm + 1;
            }
        } else {
            if (am + bm >= m) {
                br = bm
            } else {
                al = am + 1
            }
        }
    }
    // console.log(al, am, ar, bl, bm, br,)
    if (al === ar) {
        am = al;
        bm = m - am;
    } else {
        bm = bl;
        am = m - bm;
    }

    if ((a.length + b.length) & 1) {
        if (a[am] === undefined) {
            return b[bm]
        }
        if (b[bm] === undefined) {
            return a[am]
        }
        return Math.min(a[am], b[bm])
    } else {
        if (a[am] === undefined) {
            return (b[bm] + b[bm + 1]) / 2
        }
        if (b[bm] === undefined) {
            return (a[am] + a[am + 1]) / 2
        }
        if (a[am] < b[bm]) {
            if (a[am + 1] !== undefined && a[am + 1] < b[bm]) {
                return (a[am] + a[am + 1]) / 2
            }
        } else {
            if (b[bm + 1] !== undefined && b[bm + 1] < a[am]) {
                return (b[bm] + b[bm + 1]) / 2
            }
        }
        return (a[am] + b[bm]) / 2
    }

}

function v2(nums1, nums2) {
    const totalLength = Math.floor((nums1.length + nums2.length + 1) / 2);
    let [a, b] = nums1.length > nums2.length ? [nums2, nums1] : [nums1, nums2];
    const aLen = a.length, bLen = b.length;
    let left = 0, right = aLen, middle, lefta, leftb, righta, rightb, medium1, medium2;
    // console.log(totalLength, a, b, left, right)
    while (right >= left) {
        console.log(left,right)
        const i = ~~((left + right) / 2);
        const j = totalLength - i;
        lefta = i === 0 ? -Infinity : a[i - 1];
        leftb = j === 0 ? -Infinity : b[j - 1];
        righta = i === aLen ? Infinity : a[i];
        rightb = j === bLen ? Infinity : b[j];
        // console.log(i, ':', lefta, leftb, righta, rightb)
        // console.log('--', right)
        if (lefta <= rightb) {
            console.log('get')
            medium1 = Math.max(lefta, leftb);
            medium2 = Math.min(righta, rightb);
            left = i + 1
            // console.log('left', left)
        } else {
            right = i - 1
            // console.log('right', right)
        }
        // console.log(left, right)
    }
    console.log(left)


    return ((nums1.length + nums2.length) & 1) ? medium1 : (medium1 + medium2) / 2;


}
