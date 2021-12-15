export function printMatrix(...args) {
    let m = args.pop();
    args.length && console.log(...args)
    // console.log('console.log matrix')
    m.forEach(row => {
        console.log(row);
    })
}

export function compareArray(a1, a2) {
    let l1 = a1.length, l2 = a2.length
    if (l1 !== l2) return false;
    for (let i = 0; i < l1; i++) {
        if (a1[i] !== a2[i]) return false
    }
    return true
}

export function compareMatrix(ma1, ma2) {
    let m1 = ma1.length, m2 = ma2.length
    if (m1 !== m2) return false
    if (m1 === 0) return true

    let n1 = ma1[0].length, n2 = ma2[0].length

    if (n1 !== n2) return false

    for (let i = 0; i < m1; i++) {
        if (!compareArray(ma1[i], ma2[i])) return false
    }

    return true

}