require.config({
    paths: {
        'notAmd': './c'
    },
    shim: {
        'notAmd': {
            exports: 'NotAmd'
        }
    }
});

require(['scripts/a', 'notAmd', 'scripts/d'], function (a, notAmd, d) {
    console.log(a.say());           // should be: a call: this is b
    console.log(notAmd());       // should be: c, not amd module
    console.log(d.say());           // should be: d call: this is b
});
