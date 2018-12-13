const obj = {selector: {to: {toutiao: "FE Coder"}}, target: [1, 2, {name: 'byted'}]};

// get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name');
// [ 'FE Coder', 1, 'byted']

function _get(obj, prop) {
    obj.fn = new Function("return this." + prop);
    return obj.fn();
}

function get(obj, ...args) {
    // let args = Array.prototype.slice.call(arguments, 1);
    return args.map(arg => (new Function('data', `try {return data.${arg} } catch(e){}`))(obj, arg))
}

console.log(get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name'));

let a = 'target[0][1]';
a.replace(/\[(\d+)]/, '.$1').replace(/\[(\d+)]/, (match, $1) => '.' + $1);


//匹配非单词边界
r = /\B(?=\d)/g;
a.replace(r,',');
"1,2,3";

// /n 在正则表达式中，它返回最后的第n个子捕获匹配的子字符串(捕获的数目以左括号计数)。

r = /apple(,)\sorange\1/
a = "apple, orange, cherry, peach."
r.exec(a) //"apple, orange,"
