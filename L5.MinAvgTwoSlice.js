let tester = require('./testFrame');

function solutionN2(A) {
    // write your code in JavaScript (Node.js 6.4.0)
    let len = A.length, sum = Array(len+1);
    sum[0]=0;
    for(let i = 0; i < len; i++){
        sum[i+1] = sum[i]+A[i];
    }

    let min = sum[2]/2, idx = 0, avg;
    for(let i = 0; i < len-1; i++){
        for( let j = i+2; j < len + 1; j++){
            avg = (sum[j]-sum[i])/(j-i);

            if(avg < min){
                idx=i;
                min = avg;
                console.log('min:', i,j,avg, j-i);
            }
        }
    }
    return idx;
}

function solutionN(A){
    let len = A.length,min = (A[0] + A[1])/2, idx=0;
    for(let i = 0; i < len - 2; ++i){
        let t0 = A[i]+A[i+1], t1 = t0/2, t2 = (t0+A[i+2])/3;
        let tmp = t1 < t2 ? t1 : t2;
        if(min > tmp){
            min = tmp;
            idx = i;
        }
    }

    if((A[len-2] + A[len-1])/2 >= min) return idx;

    return len -2;
}
//solutionN([4,3,5,1,8,3,9]);

let testCases = [
    // [4,3,5,1,8,3,9],
    [4,10,2, 8],
    // [-3, -5, -8, -4, -10],

];

tester.run(solutionN, testCases);
