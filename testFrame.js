
function run(solution, testcases){
    console.time('total');
    testcases.forEach(function(testcase, idx, timer){
        console.log('case %d start:----------------', idx);

        if(timer) console.time('case ' + idx);
        if(testcase.length === 0) return;
        try{

        let answer = solution.apply(this,testcase);
        if(timer) console.timeEnd('case '+idx);
        console.log('the answer for case %d is ', idx,answer);
        }catch (e) {
            console.log(e);
        }
    });
    console.timeEnd('total');
}

exports.run = run;
