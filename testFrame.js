
function run(solution, testcases){
    console.time('total');
    testcases.forEach(function(testcase, idx, timer){
        if(timer) console.time('case ' + idx);
        let answer = solution.apply(this,testcase);
        if(timer) console.timeEnd('case '+idx);
        console.log('the answer for case %d is ', idx,answer);
    });
    console.timeEnd('total');
}

exports.run = run;