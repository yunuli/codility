/*
1。
一个promise有三个状态，
初始值为pending，从pending状态可以改变为fullfilled 或者 rejected 状态
状态变化后不能再改变


promise的构造函数接受一个函数
executor(resolve,reject)为参数
 该函数接受两个函数为参数，并且会立即执行。
 在函数中调用resolve函数时，会将promise从pending改变为fullfilled
 在函数中调用reject函数时，会将promise从pending改变为rejected
 如果executor中抛出异常则promise的状态变为reject，其值为异常值

 promise的值为resolve或reject函数的入参

 promise的一个方法为 resolve方法，将promise的状态改变为fulfilled，并将入参设置为promise的值
 如果resolve方法的参数为promise，原promise的状态将和传入的promise一起变化，原promise的值也和传入的prosmise一样
 promise的一个方法为 reject，返回一个rejected状态的promise，并将入参设置为promise的值

 promise的then方法接受两个函数为参数，其签名为
 then(onSuccess, onFailed)
 onSuccess函数在promise转为fulfilled状态时被调用，其入参为promise的值，并且只被调用一次
 如onSuccess不为函数则不被调用，then函数返回一个fulfill状态的promise，取值和原promise相同
 onFailed函数在promise转为rejected状态时被调用，其入参为reject函数调用时的入参
 当onSuccess函数或onFailed函数正常返回时，then函数返回一个fulfilled状态的promise，
 其resolve的值为on*函数的返回值
 如on*函数执行过程中出现错误，则返回一个rejected状态的promise，其reject的值为抛出的错误
 on*参数不为函数时，then返回状态和resolve值与原promise相同的promise
 如果resolve函数的入参为一个promise，则原promise跟随该promise的状态

*/

// 1.
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        this._status = PENDING;
        this._successHandlers = [];
        this._failureHandlers = [];
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (e) {
            this._reject(e)
        }
    }

    _resolve(value) {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        this._value = value;
        setTimeout(() => {
            let handler;
            while (handler = this._successHandlers.shift()) {
                handler(value);
            }
        }, 0);

    }

    _reject(reason) {
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        this._value = reason;
        setTimeout(() => {
            let handler;
            while (handler = this._failureHandlers.shift()) {
                handler(reason);
            }
        }, 0);
    }

    then(onSuccess, onFailed) {

        return new Promise((nResolve, nReject) => {

            const success = (value) => {
                try {
                    if (value instanceof Promise) {
                        return value.then(nResolve, nReject);
                    }
                    typeof onSuccess === 'function' ? nResolve(onSuccess(value)) : nResolve(value);
                } catch (e) {
                    nReject(e);
                }

            };

            const failed = (error) => {
                try {
                    if (onFailed instanceof Promise) {
                        return onFailed.then(nResolve, nReject);
                    }
                    typeof onFailed === 'function' ? nResolve(onFailed(error)) : nResolve(error);
                } catch (e) {
                    nReject(e);
                }
            };

            switch (this._status) {
                case FULFILLED:
                    success(this._value);
                    break;
                case REJECTED:
                    failed(this._status);
                    break;
                case PENDING:
                    this._successHandlers.push(success);
                    this._failureHandlers.push(failed);
                    break;
            }
        });
    }
}


function clg(...v) {
    console.log(...v);
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
});

p1.then((value) => {
        console.log(value);
    },
    (error) => {
        console.log(error);
    });

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(1)
    }, 1000)
});

p2.then((v) => {
    clg(v);
}, (e) => {
    clg(e);
    throw new Error('oops')
})
    .catch(e => clg(e));

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('oops1')
    }, 1000)
});

const p4 = new Promise((rs, rj) => {
    rs(p3);
});
p4.then((v) => {
    clg(v);
}, (e) => {
    clg('err', e);
});





