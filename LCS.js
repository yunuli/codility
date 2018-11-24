let tf = require("./testFrame");




function solution(strA, strB){
    const lenA = strA.length, lenB = strB.length;

    let curLine = [...'0'.repeat(lenA + 1)].map((i)=> Number(i));
    let nextLine = Array(lenA + 1);
    nextLine[0] = 0;
    let substrB = 0, substrA;
    while(substrB < lenB){
        substrA = 0;
        while(substrA < lenA){
            if(strA[substrA] === strB[substrB]){
                nextLine[substrA + 1] = curLine[substrA] + 1;
            }else {
                nextLine[substrA + 1] = nextLine[substrA] > curLine[substrA + 1] ? nextLine[substrA] : curLine[substrA + 1]
            }
            substrA++;
        }
        substrB++;
        console.log(curLine, nextLine);

        [curLine, nextLine] = [nextLine, curLine];
    }
    return curLine[lenA];
}

let testcases = [
    ['abcdf','bcadg'],
    ['abcd','bcad'],
    ['aabb','bbaa'],
    ['abcdefg','acegbdefg'],
    ['',''],
    ['aaaa','aaa'],
];
tf.run(solution, testcases);
