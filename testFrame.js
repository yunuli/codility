
function run(solution, testcases){
    testcases.forEach(function(testcase, idx, timer){
        if(timer) console.time('case ' + idx);
        let answer = solution(testcase);
        if(timer) console.timeEnd('case '+idx);
        console.log('the answer for case %d is ', idx,answer);
    });
}

exports.run = run;