// a[i-1] < b[j]
function t(nums1, nums2) {
    const mLength = Math.floor((nums1.length + nums2.length + 1) / 2);
    let [a, b] = nums1.length > nums2.length ? [nums2, nums1] : [nums1, nums2];
    let left = 0, right = a.length, middle, lefta, leftb, righta, rightb;
    while (right > left) {
        middle = ~~((left + right) / 2);
        lefta = a[middle - 1] || -Infinity;
        leftb = a[mLength - middle - 1] || -Infinity;
        righta = a[middle] || Infinity;
        rightb = b[mLength - middle] || Infinity;

        if (lefta <= rightb) {
            left = middle + 1
        } else {
            right = middle
        }
    }

    const medium1 = Math.max(lefta, leftb);
    const medium2 = Math.min(righta, rightb);

    return (mLength & 1) ? medium1 : (medium1 + medium2) / 2;


}

function bs(n1, t) {
    let left = 0, right = n1.length, m;
    while (left < right) {
        m = ~~((left + right) / 2);
        if (n1[m] <= t) {
            left = m;
        } else {
            right = m
        }
    }
}

var nextPermutation = function (nums) {
    if (nums.length < 2) return;

    let prev = nums[nums.length - 1],
        ii = nums.length - 2;
    for (; ii > -1 && prev <= nums[ii]; ii--) {
        prev = nums[ii];
    }
    console.log(ii);
    let i = ii + 1,
        j = nums.length - 1;
    while (i < j) {
        nums[j] ^= nums[i]
        nums[i] ^= nums[j]
        nums[j] ^= nums[i]
        i++;
        j--;
    }
    if (ii === -1) {
        return;
    }
    for (let i = ii; i < nums.length; i++) {
        if (nums[i] > nums[ii]) {
            nums[ii] ^= nums[i]
            nums[i] ^= nums[ii]
            nums[ii] ^= nums[i]
            break;
        }
        ;
    }

};

function np(arr) {
    let i = arr.length - 1;
    while (i > 0 && arr[i] <= arr[i - 1]) {
        i--;
    }
    let left = i;
    let right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    if (i) {
        const j = i - 1;
        while (arr[j] >= arr[i]) {
            i++;
        }
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    console.log(arr.toString())
}

function cs(a, b) {
    const r = new Array(a.length + 1);
    for (let i = 0; i < a.length + 1; i++) {
        r[i] = new Array(b.length + 1)
    }
    r[0] = r[0].fill(0);
    for (let i = 1; i < a.length + 1; i++) {
        r[i][0] = 0;
        for (let j = 1; j < b.length + 1; j++) {
            console.log(a[i], b[j])
            r[i][j] = (a[i - 1] === b[j - 1]) ? r[i - 1][j - 1] + 1 : Math.max(r[i - 1][j], r[i][j - 1]);
        }
    }
    console.log(r)
    return r[a.length][b.length]
}

var orangesRotting = function (grid) {
    const ml = grid.length, nl = grid[0].length;

    let m = new Map();
    let time = 0, fresh = 0;
    for (let i = 0; i < ml; i++) {
        for (let j = 0; j < nl; j++) {
            if (grid[i][j] === 1) fresh++;

            if (grid[i][j] === 2) {
                if (grid[i + 1] && grid[i + 1][j] === 1)
                    m.set(`${i + 1}${j}`, [i + 1, j]);

                if (grid[i - 1] && grid[i - 1][j] === 1) {
                    m.set(`${i - 1}${j}`, [i - 1, j]);
                }

                if (grid[i][j + 1] === 1)
                    m.set(`${i}${j + 1}`, [i, j + 1]);
                if (grid[i][j - 1] === 1)
                    m.set(`${i}${j - 1}`, [i, j - 1]);
            }
        }
    }

    while (m.size > 0) {
        time++
        // m.clear()
        const memo = new Map()
        console.log('----')
        m.forEach(([i, j]) => {
            console.log(i, j)
            grid[i][j] = 2;
        })
        fresh -= m.size;

        m.forEach(([i, j]) => {
            if (grid[i + 1] && grid[i + 1][j] === 1)
                memo.set(`${i + 1}${j}`, [i + 1, j]);

            if (grid[i - 1] && grid[i - 1][j] === 1) {
                memo.set(`${i - 1}${j}`, [i - 1, j]);
            }

            if (grid[i][j + 1] === 1)
                memo.set(`${i}${j + 1}`, [i, j + 1]);
            if (grid[i][j - 1] === 1)
                memo.set(`${i}${j - 1}`, [i, j - 1]);
        })
        m = memo;
    }
    return fresh > 0 ? -1 : time;
}

var partitionLabels = function(s) {
    let ranges = {}
    for(let i = 0; i< s.length; i++ ){
        const range = ranges[s[i]];
        if(range){
            range.end = i;
        }else{
            ranges[s[i]] = { begin:i,end:i};
        }
    }

    ranges = Object.values(ranges).map(item => item).sort((a, b) => a.begin - b.begin);

    let begin = 0, end = 0, result = [],range;
    for(range of ranges){
        if(range.begin > end){
            result.push({begin, end});
            begin = range.begin;
            end = range.end;
        }else{
            if(end < range.end)
                end = range.end;
        }
    }

    result.push({begin, end});
    return result.map(r => r.end - r.begin + 1)

};

let max = 0;

function h(t){
    if(!t) return [0, 0]
    const [lh, lm] = h(t.left);
    const [rh, rm] = h(t.right);
    max = Math.max(max, lh + rh, lm, rm);
    // console.log([Math.max(lh, rh) + 1, max])
    return [Math.max(lh, rh) + 1, max];
}
const n5 = {}
const n4 = {}
const n3 = {}
const n2 ={left:n4,right:n5}
const root = {left:n2, right:n3}
var diameterOfBinaryTree = function(root) {
    max = 0;
    console.log(h(root))
};
diameterOfBinaryTree(root)
// orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])
// partitionLabels("ababcbacadefegdehijhklij")
// partitionLabels("a")
// partitionLabels("abcdef")
// partitionLabels("abccadbef")
// orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])
