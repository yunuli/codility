// L10 peaks
//
// TODO think why can be  n*log(log(n)) expected worst-case time complexity is O(N*log(log(N)));
//
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
    // write your code in JavaScript (Node.js 6.4.0)

    let len = A.length, peaks = new Array(len),sum = new Array(len+1);
    sum[0] = sum[1] = 0;
    let i = 1, gap = mingap = 1;
    while(i < len){
        // gap++;
        if(A[i] > A[i-1] && A[i] > A[i+1]){
            peaks[i] = true;
            // if(mingap < gap){
            //     mingap = gap;
            //     gap = 0;
            // }
        }
        sum[i+1] = sum[i] + ~~peaks[i];
        i++;
    }
    sum[len] = sum[len-1];
    // console.log(mingap,sum,peaks);
    let sqrtN = Math.floor(Math.sqrt(len)), count = 0;
    for(let step = 3; step <= len; step++){
        if(len % step == 0){
            let i = step;
            for(;i <= len && sum[i]>sum[i-step]; i+=step){
                 // console.log(step,i,sum[i],sum[i-step]);
            }
             // console.log(step,i,len);
            if(i > len)
                return len / step;
        }
    }
    return 0;
}