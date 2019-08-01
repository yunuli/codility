/*
从1-20之间的取两个不重复的数字x和y，和告诉A，积告诉B
A说不知道是多少
B说我也不知道是多少
这时A说我知道了
B也说那我也知道了
求 x,y
 */

function* range(start, end) {
    if (!end) {
        end = start;
        start = 0;
    }
    while (start < end)
        yield start++;
}

const end = 21;

//先计算所有和与积可能存在的分解方法
// sumMap[] = [  [1,4] ,[2,3]]
// productMap[6] = [ [1,6], [2,3]]
const sumMap = new Map(), productMap = new Map();
for (let i of range(1, end)) {
    for (let j of range(i + 1, end)) {
        const sum = i + j, product = i * j;
        if (!sumMap.has(sum)) {
            sumMap.set(sum, []);
        }

        const sumArray = sumMap.get(sum);
        sumArray.push([i, j]);

        if (!productMap.has(product)) {
            productMap.set(product, []);
        }

        const productArray = productMap.get(product);
        productArray.push([i, j]);

    }
}

for (let sumPairArray of sumMap.values()) {

    //1. A猜不到,所以必须大于1
    if (sumPairArray.length === 1) {
        continue;
    }
    let candidates = [], product;
    for (let sumPair of sumPairArray) {
        product = sumPair[0] * sumPair[1];
        //3 B猜不到，所以必须大于1
        if (productMap.get(product).length > 1) {
            candidates.push(sumPair)
        }
    }
    //product可有多种分解方法的只能有一种，否则A猜不出来
    if (candidates.length !== 1) continue;

    const candidateSumPair = candidates[0];

    const productPairArray = productMap.get(candidateSumPair[0] * candidateSumPair[1]);

    candidates = [];

    for (let productPair of productPairArray) {
        let multiProductPairCount = 0;
        const sum = productPair[0] + productPair[1], sumPairArray = sumMap.get(sum);
        if (sumPairArray.length > 1) {
            multiProductPairCount++;//必须有多个，但是很容易满足，或许不需要判断

            let multiSumPairCount = 0;
            for (let sumPair of sumPairArray) {
                const product = sumPair[0] * sumPair[1];
                if (productMap.get(product).length > 1) {
                    multiSumPairCount++;
                }
            }
            if (multiSumPairCount === 1) {
                candidates.push(productPair)
            }
        }
    }

    if (candidates.length === 1) {
        console.log(candidateSumPair);
    }
}
