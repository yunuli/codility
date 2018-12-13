function debounce(fn, delay) {
    delay = delay || 1000;
    let timer;

    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args)

        }, delay);
    }
}
