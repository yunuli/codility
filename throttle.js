function throttle(fn, wait){

    let lastInvokeTime = 0, timer;

    return function(...args){
        let now = new Date();
        let remindWaiting = now - lastInvokeTime;
        if(remindWaiting >= wait){
            lastInvokeTime = now;
            fn.apply(this, args);
        }else{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                lastInvokeTime = new Date();
                fn.apply(this, args);
            },remindWaiting);
        }
    }
}
