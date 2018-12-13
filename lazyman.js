// /*
// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan("Hank")输出:
// Hi! This is Hank!
//
// LazyMan("Hank").sleep(10).eat("dinner")输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
//
// LazyMan("Hank").eat("dinner").eat("supper")输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
//
// LazyMan("Hank").sleepFirst(5).eat("supper")输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
//
// 以此类推。
//  */
// function mylazyman() {
//     function RealMan(name) {
//         this.name = name;
//         this.tasks = [];
//         this.tasks.push(() => console.log('hi this is', this.name));
//         this.timer = setTimeout(this.runTasks.bind(this), 0);
//     }
//
//
//     RealMan.prototype.runTasks = function () {
//         for (let i = 0; i < this.tasks.length; i++) {
//             if (typeof this.tasks[i] === 'function') {
//                 this.tasks[i]();
//             } else {
//
//                 setTimeout(this.runTasks.bind(this), this.tasks[i] * 1000);
//                 this.tasks = this.tasks.slice(i + 1);
//                 return;
//             }
//         }
//         this.tasks = [];
//     };
//
//     RealMan.prototype.eat = function (sth) {
//         clearTimeout(this.timer);
//         const fn = function () {
//             console.log('Eat', sth);
//         };
//
//         this.tasks.push(fn);
//         this.runTasks();
//         return this;
//     };
//
//     RealMan.prototype.sleep = function (sec) {
//         this.tasks.push(sec);
//         return this;
//     };
//     RealMan.prototype.sleepFirst = function (sec) {
//         this.tasks.unshift(sec);
//         return this;
//     };
//
//     function LazyMan(name) {
//         return new RealMan(name);
//     }
//     LazyMan("Hank1");
//     LazyMan("Hank2").eat("21").eat("22");
//     LazyMan("Hank3").sleep(2).eat("3");
//     LazyMan("Hank4").sleepFirst(2).eat("4");
// }
// function _LazyMan(name) {
//     this.tasks = [];
//     var self = this;
//     var fn = function () {
//         console.log("Hi! This is " + name + "!");
//         self.next();
//     }
//     this.tasks.push(fn);
//     setTimeout(function () {
//         self.next();
//     }, 0); // 在下一个事件循环启动任务
// }
//
// /* 事件调度函数 */
// _LazyMan.prototype.next = function () {
//     var fn = this.tasks.shift();
//     fn && fn();
// }
// _LazyMan.prototype.eat = function (name) {
//     var self = this;
//     var fn = (function (name) {
//         return function () {
//             console.log("Eat " + name + "~");
//             self.next()
//         }
//     })(name);
//     this.tasks.push(fn);
//     return this; // 实现链式调用
// }
// _LazyMan.prototype.sleep = function (time) {
//     var self = this;
//     var fn = (function (time) {
//         return function () {
//             setTimeout(function () {
//                 console.log("Wake up after " + time + "s!");
//                 self.next();
//             }, time * 1000);
//         }
//     })(time);
//     this.tasks.push(fn);
//     return this;
// }
// _LazyMan.prototype.sleepFirst = function (time) {
//     var self = this;
//     var fn = function () {
//         setTimeout(function () {
//             console.log("Wake up after " + time + "s!");
//             self.next();
//         }, time * 1000);
//     };
//     this.tasks.unshift(fn);
//     return this;
// }
/* 封装 */

// LazyMan("Hank4").sleepFirst(2).eat("4");
// // LazyMan("Hank1");
// // LazyMan("Hank2").eat("21").eat("22");
// // LazyMan("Hank3").sleep(2).eat("3");

// class Lazy {
//     constructor(name) {
//         this.sleepFirstTime = 0;
//         this.promise = Promise.resolve().then(
//             () => {console.log(this.sleepFirstTime);return this.sleepFirstTime && this._sleep(this.sleepFirstTime)}
//         ).then((e) => {
//             console.log(e);
//             console.log(`Hi! This is ${name}!`);
//         });
//     }
//     sleepFirst(time) {
//         console.log('sf', time);
//         this.sleepFirstTime = time;
//         return this;
//     }
//     eat(food) {
//         console.log('eat');
//         this.promise = this.promise.then(() => {
//             console.log(`Eat ${food}~`);
//         });
//         return this;
//     }
//     sleep(time) {
//         console.log('sleep', time);
//         this.promise = this.promise.then(() => this._sleep(time));
//         return this;
//     }
//     _sleep(time) {
//         return new Promise((next) => {
//             setTimeout(() => {
//                 console.log(`Wake up after ${time}`);
//                 next();
//             }, time);
//         });
//     }
// }

// function LazyMan(name) {
//     return new Lazy(name);
// }
// LazyMan("Hank").sleepFirst(2000).sleep(2000).eat("supper")


//     LazyMan("Hank1");
//     LazyMan("Hank2").eat("21").eat("22");
//     LazyMan("Hank3").sleep(2).eat("3");
//     LazyMan("Hank4").sleepFirst(2).eat("4");

class _LazyMan {
    constructor(name) {
        this.tasks = [];
        this.tasks.push(() => console.log('hi', name));
        this.run = async function () {
            while (this.tasks.length > 0) {
                await this.tasks.shift()();

            }
        };
        setTimeout(() => this.run(), 0);
        return this;
    }

    _sleep(time) {
        return () => new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                    console.log('wakeup after', time);
                }, time * 1000);
            }
        )
    }

    sleep(time) {
        console.log('enter', 'sleep');
        this.tasks.push(this._sleep(time));
        return this;
    }

    sleepFirst(time) {
        console.log('enter sf');
        this.tasks.unshift(this._sleep(time));
        return this;
    }

    eat(food) {
        console.log('enter', food);
        this.tasks.push(() => {
            console.log('eat', food);
        });
        return this;
    }
}

function LazyMan(name) {
    return new _LazyMan(name);
}

// LazyMan("Hank1");
// LazyMan("Hank2").eat("21").eat("22");
LazyMan("Hank3").sleep(2).eat("31").eat("32");
// LazyMan("Hank4").sleepFirst(2000).eat("4").eat("5");
