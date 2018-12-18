let tf = require("./testFrame");
//find the max gap between two items of an array after it is sorted

function getMaxGap(Arr) {
    const len = Arr.length;
    if (len < 2) return 0;

    let max = -Infinity, min = +Infinity;

    Arr.forEach(n => {
        max = n > max ? n : max;
        min = n < min ? n : min;
    });
    const range = max - min;

    const maxs = new Array(len + 1), mins = new Array(len + 1);

    Arr.forEach(n => {
        const position = Math.floor((n - min) * len / range);
        if (maxs[position] === undefined || maxs[position] < n) {
            maxs[position] = n;
        }
        if (mins[position] === undefined || mins[position] > n) {
            mins[position] = n;
        }
    });

    let maxGap = 0, lastMax = maxs[0];
    for (let i = 1; i <= len; i++) {
        if (mins[i] !== undefined) {
            const gap = mins[i] - lastMax;
            if (maxGap < gap) {
                maxGap = gap;
            }
            lastMax = maxs[i];
        }
    }

    return maxGap;

}

let testcases = [
    [[1, 3, 5, 7, 9, 22, 48, 69, 81, 101]],
    [[3, 1]],
    [[1,2,3,4,8,100, 70]],
    [[3]]
];

tf.run(getMaxGap, testcases);
