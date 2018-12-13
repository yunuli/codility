const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
const res = curriedSum(1)(2)(3);
console.log(res); // 6

const log = (a, b, c) => {
    console.log(a, b, c);
};
const curriedLog = curry(log);
curriedLog('a')('b')('c'); // a b c

const z = () => {
    console.log(1);
};
const curriedZ = curry(z);
curriedZ();

function myCurry(fn, args = []) {
    return (...innerArg) => args.length === fn.length - 1 || !fn.length ? fn(...args, ...innerArg) : curry(fn, [...args, ...innerArg]);
}




