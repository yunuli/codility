
function run(solution, testcases){
    testcases.forEach(function(testcase, idx){
        let answer = solution(testcase);
        console.log('the answer for case %d is ', idx,answer);
    });
}

exports.run = run;