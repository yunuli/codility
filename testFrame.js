function run(solution, testcases, ...rest) {
    console.time('total');
    testcases.forEach(function (testcase, idx, timer) {
        console.info('case %d start:----------------', idx);

        if (timer) console.time('case ' + idx);
        if (testcase.length === 0) return;
        try {

            let answer = solution.apply(this, testcase.concat(rest));
            if (timer) console.timeEnd('case ' + idx);
            console.info('the answer for case %d is ', idx, answer);
        } catch (e) {
            console.info(e);
        }
    });
    console.timeEnd('total');
}

let oldLog = console.log;
console.log = function (...args) {
    if (console.enableLog) oldLog(...args)
}

exports.run = run;
