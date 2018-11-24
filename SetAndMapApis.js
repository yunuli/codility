const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);
}
// 2 3 5 4
// 例一
let set = new Set([1, 2, 3, 4, 4]);
[...set];
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size; // 5

// 例三
set = new Set(document.querySelectorAll('div'));
set.size; // 56

// 类似于
set = new Set();
document
    .querySelectorAll('div')
    .forEach(div => set.add(div));
set.size; // 56

// 去除数组的重复成员
    [...new Set(array)]

 set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

//另外，两个对象总是不相等的。

 set = new Set();

set.add({});
set.size; // 1

set.add({});
set.size; // 2

s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

// 对象的写法
const properties = {
    'width': 1,
    'height': 1
};

if (properties[someName]) {
    // do something
}

// Set的写法
const properties = new Set();

properties.add('width');
properties.add('height');

if (properties.has(someName)) {
    // do something
}

const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

function dedupe(array) {
    return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]

 set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
    console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
    console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
    console.log(item);
}

Set.prototype[Symbol.iterator] === Set.prototype.values

set = new Set(['red', 'green', 'blue']);

for (let x of set) {
    console.log(x);
}
// red
// green
// blue

set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9

set = new Set(['red', 'green', 'blue']);
let arr = [...set];
// ['red', 'green', 'blue']

let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]

set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

// 方法一
set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6

/*----------

-------- */

const data = {};
const element = document.getElementById('myDiv');

data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"

const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

const items = [
    ['name', '张三'],
    ['title', 'Author']
];

const map = new Map();

items.forEach(
    ([key, value]) => map.set(key, value)
);

const set = new Set([
    ['foo', 1],
    ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3

const map = new Map();

map
    .set(1, 'aaa')
    .set(1, 'bbb');

map.get(1) // "bbb"

new Map().get('asfddfsasadf')
// undefined

const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined

const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
    .set(k1, 111)
    .set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222

let map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3

map.set(NaN, 123);
map.get(NaN) // 123

const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2

const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined

let map = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');

const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!

const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true


//delete方法删除某个键，返回true。如果删除失败，返回false。
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false

let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0


//需要特别注意的是，Map 的遍历顺序就是插入顺序。
const map = new Map([
    ['F', 'no'],
    ['T',  'yes'],
]);

for (let key of map.keys()) {
    console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
    console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
    console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
    console.log(key, value);
}
// "F" "no"
// "T" "yes"

map[Symbol.iterator] === map.entries
// true

const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

    [...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

    [...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

const map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');

const map1 = new Map(
    [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
    [...map0].map(([k, v]) => [k * 2, '_' + v])
);
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}

map.forEach(function(value, key, map) {
    console.log("Key: %s, Value: %s", key, value);
});

const reporter = {
    report: function(key, value) {
        console.log("Key: %s, Value: %s", key, value);
    }
};

map.forEach(function(value, key, map) {
    this.report(key, value);
}, reporter);
//（1）Map 转为数组
const myMap = new Map()
    .set(true, 7)
    .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
//（2）数组 转为 Map
new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
//（3）Map 转为对象
//
// 如果所有 Map 的键都是字符串，它可以无损地转为对象。
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
const myMap = new Map()
    .set('yes', true)
    .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

//（4）对象转为 Map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}

// （5）Map 转为 JSON
//
// Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
// 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
// （6）JSON 转为 Map
//
// JSON 转为 Map，正常情况下，所有键名都是字符串。

function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
// 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}