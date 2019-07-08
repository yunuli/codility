/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, setTimeout, opera */
(function(global, undefined) {
    var document = global.document,
        head = document.head || document.getElementsByTagName('head')[0] || document.documentElement,
        baseElement = document.getElementsByTagName('base')[0],
        noop = function(){},
        currentlyAddingScript, interactiveScript, anonymousMeta,
        dirnameReg = /[^?#]*\//,
        dotReg = /\/\.\//g,
        doubleDotReg = /\/[^/]+\/\.\.\//,
        multiSlashReg = /([^:/])\/+\//g,
        ignorePartReg = /[?#].*$/,
        suffixReg = /\.js$/,

        seed = {
            // 缓存模块
            modules: {},
            config: {
                baseUrl: '',
                charset: '',
                paths: {},
                shim: {},
                urlArgs: ''
            }
        };

    /* utils */
    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) === '[object ' + type + ']';
        }
    }

    var isFunction = isType('Function');
    var isString = isType('String');
    var isArray = isType('Array');


    function hasProp(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    /**
     * 遍历数组，回调返回 true 时终止遍历
     */
    function each(arr, callback) {
        var i, len;

        if (isArray(arr)) {
            for (i = 0, len = arr.length; i < len; i++) {
                if (callback(arr[i], i, arr)) {
                    break;
                }
            }
        }
    }

    /**
     * 反向遍历数组，回调返回 true 时终止遍历
     */
    function eachReverse(arr, callback) {
        var i;

        if (isArray(arr)) {
            for (i = arr.length - 1; i >= 0; i--) {
                if (callback(arr[i], i, arr)) {
                    break;
                }
            }
        }
    }

    /**
     * 遍历对象，回调返回 true 时终止遍历
     */
    function eachProp(obj, callback) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (callback(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * 判断是否为一个空白对象
     */
    function isPlainObject(obj) {
        var isPlain = true;

        eachProp(obj, function() {
            isPlain = false;
            return true;
        });

        return isPlain;
    }

    /**
     * 复制源对象的属性到目标对象中
     */
    function mixin(target, source) {
        if (source) {
            eachProp(source, function(value, prop) {
                target[prop] = value;
            });
        }
        return target;
    }

    function makeError(name, msg) {
        throw new Error(name + ":" + msg);
    }

    /**
     * 获取全局变量值。允许格式：a.b.c
     */
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function(part) {
            g = g[part];
        });
        return g;
    }


    /* path */
    /**
     * 获取path对应的目录部分
     *
     * a/b/c.js?foo=1#d/e  --> a/b/
     */
    function dirname(path) {
        var m = path.match(dirnameReg);

        return m ? m[0] : "./";
    }

    /**
     * 规范化path
     *
     * http://test.com/a//./b/../c  -->  "http://test.com/a/c"
     */
    function realpath(path) {
        // /a/b/./c/./d --> /a/b/c/d
        path = path.replace(dotReg, "/");

        // a//b/c --> a/b/c
        // a///b////c --> a/b/c
        path = path.replace(multiSlashReg, "$1/");

        // a/b/c/../../d --> a/b/../d --> a/d
        while (path.match(doubleDotReg)) {
            path = path.replace(doubleDotReg, "/");
        }

        return path;
    }

    /**
     * 将模块id解析为对应的url
     *
     * rules:
     * baseUrl: http://gcfeng.github.io/blog/js
     * host: http://gcfeng.github.io/blog
     *
     * http://gcfeng.github.io/blog/js/test.js  -->  http://gcfeng.github.io/blog/js/test.js
     *                                    test  -->  http://gcfeng.github.io/blog/js/test.js
     *                              ../test.js  -->  http://gcfeng.github.io/blog/test.js
     *                                /test.js  -->  http://gcfeng.github.io/blog/test.js
     *                            test?foo#bar  -->  http://gcfeng.github.io/blog/test.js
     *
     * @param {String} id 模块id
     * @param {String} baseUrl 模块url对应的基地址
     */
    function id2Url(id, baseUrl) {
        var config = seed.config;

        id = config.paths[id] || id;

        // main///test?foo#bar  -->  main/test?foo#bar
        id = realpath(id);

        // main/test?foo#bar  -->  main/test
        id = id.replace(ignorePartReg, "");

        id = suffixReg.test(id) ? id : (id + '.js');

        id = realpath(dirname(baseUrl) + id);

        id = id + (config.urlArgs || "");

        return id;
    }


    function getScripts() {
        return document.getElementsByTagName('script');
    }

    /**
     * 获取当前正在运行的脚本
     */
    function getCurrentScript() {
        if (currentlyAddingScript) {
            return currentlyAddingScript;
        }

        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        if (document.currentScript) {
            return interactiveScript = document.currentScript;
        }

        eachReverse(getScripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    /**
     * 请求JavaScript文件
     */
    function loadScript(url, callback) {
        var config = seed.config,
            node = document.createElement('script'),
            supportOnload = 'onload' in node;

        node.charset = config.charset || 'utf-8';
        node.setAttribute('data-module', url);

        // 绑定事件
        if (supportOnload) {
            node.onload = function() {
                onload();
            };
            node.onerror = function() {
                onload(true);
            }
        } else {
            node.onreadystatechange = function() {
                if (/loaded|complete/.test(node.readyState)) {
                    onload();
                }
            }
        }

        node.async = true;
        node.src = url;

        // 在IE6-8浏览器中，某些缓存会导致结点一旦插入就立即执行脚本
        currentlyAddingScript = node;

        // ref: #185 & http://dev.jquery.com/ticket/2709
        baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node);

        currentlyAddingScript = null;


        function onload(error) {
            // 保证执行一次
            node.onload = node.onerror = node.onreadystatechange = null;
            // 删除脚本节点
            head.removeChild(node);
            node = null;
            callback(error);
        }
    }



    // 记录模块的状态信息
    Module.STATUS = {
        // 初始状态，此时模块刚刚新建
        INITIAL: 0,
        // 加载module.url指定资源
        FETCH: 1,
        // 保存module的依赖信息
        SAVE: 2,
        // 解析module的依赖内容
        LOAD: 3,
        // 执行模块，exports还不可用
        EXECUTING: 4,
        // 模块执行完毕，exports可用
        EXECUTED: 5,
        // 出错：请求或者执行出错
        ERROR: 6
    };

    function Module(url, deps) {
        this.url = url;
        this.deps = deps || [];                 // 依赖模块列表
        this.dependencies = [];                 // 依赖模块实例列表
        this.refs = [];                         // 引用模块列表，用于模块加载完成之后通知其引用模块
        this.exports = {};
        this.status = Module.STATUS.INITIAL;

        /*
         this.id
         this.factory
         */
    }

    Module.prototype = {
        constructor: Module,

        load: function() {
            var mod = this,
                STATUS = Module.STATUS,
                args = [];

            if (mod.status >= STATUS.LOAD) {
                return mod;
            }
            mod.status = STATUS.LOAD;

            mod.resolve();
            mod.pass();
            mod.checkCircular();

            each(mod.dependencies, function(dep) {
                if (dep.status < STATUS.FETCH) {
                    dep.fetch();
                } else if (dep.status === STATUS.SAVE) {
                    dep.load();
                } else if (dep.status >= STATUS.EXECUTED) {
                    args.push(dep.exports);
                }
            });

            mod.status = STATUS.EXECUTING;

            // 依赖模块加载完成
            if (args.length === mod.dependencies.length) {
                args.push(mod.exports);
                mod.makeExports(args);
                mod.status = STATUS.EXECUTED;
                mod.fireFactory();
            }
        },

        /**
         * 初始化依赖模块
         */
        resolve: function() {
            var mod = this;

            each(mod.deps, function(id) {
                var m, url;

                url = id2Url(id, seed.config.baseUrl);
                m = Module.get(url);
                m.id = id;
                mod.dependencies.push(m);
            });
        },

        /**
         * 传递模块给依赖模块，用于依赖模块加载完成之后通知引用模块
         */
        pass: function() {
            var mod = this;

            each(mod.dependencies, function(dep) {
                var repeat = false;

                each(dep.refs, function(ref) {
                    if (ref === mod.url) {
                        repeat = true;
                        return true;
                    }
                });

                if (!repeat) {
                    dep.refs.push(mod.url);
                }
            });
        },

        /**
         * 解析循环依赖
         */
        checkCircular: function() {
            var mod = this,
                STATUS = Module.STATUS,
                isCircular = false,
                args = [];

            each(mod.dependencies, function(dep) {
                isCircular = false;
                // 检测是否存在循环依赖
                if (dep.status === STATUS.EXECUTING) {
                    each(dep.dependencies, function(m) {
                        if (m.url === mod.url) {
                            // 存在循环依赖
                            return isCircular = true;
                        }
                    });

                    // 尝试解决循环依赖
                    if (isCircular) {
                        each(dep.dependencies, function(m) {
                            if (m.url !== mod.url && m.status >= STATUS.EXECUTED) {
                                args.push(m.exports);
                            } else if (m.url === mod.url) {
                                args.push(undefined);
                            }
                        });

                        if (args.length === dep.dependencies.length) {
                            // 将exports作为最后一个参数传递
                            args.push(dep.exports);
                            try {
                                dep.exports = isFunction(dep.factory) ? dep.factory.apply(global, args) : dep.factory;
                                dep.status = STATUS.EXECUTED;
                            } catch (e) {
                                dep.exports = undefined;
                                dep.status = STATUS.ERROR;
                                makeError("Can't fix circular dependency", mod.url + " --> " + dep.url);
                            }
                        }
                    }
                }
            });
        },

        makeExports: function(args) {
            var mod = this,
                result;

            result = isFunction(mod.factory) ? mod.factory.apply(global, args) : mod.factory;
            mod.exports = isPlainObject(mod.exports) ? result : mod.exports;
        },

        /**
         * 模块执行完毕，触发引用模块回调
         */
        fireFactory: function() {
            var mod = this,
                STATUS = Module.STATUS;

            each(mod.refs, function(ref) {
                var args = [];
                ref = Module.get(ref);

                each(ref.dependencies, function(m) {
                    if (m.status >= STATUS.EXECUTED) {
                        args.push(m.exports);
                    }
                });

                if (args.length === ref.dependencies.length) {
                    args.push(ref.exports);
                    ref.makeExports(args);
                    ref.status = STATUS.EXECUTED;
                    ref.fireFactory();
                } else {
                    ref.load();
                }
            });
        },

        /**
         * 发送请求加载资源
         */
        fetch: function() {
            var mod = this,
                STATUS = Module.STATUS;

            if (mod.status >= STATUS.FETCH) {
                return mod;
            }
            mod.status = STATUS.FETCH;

            loadScript(mod.url, function(error) {
                mod.onload(error);
            });
        },

        onload: function(error) {
            var mod = this,
                config = seed.config,
                STATUS = Module.STATUS,
                shim, shimDeps;

            if (error) {
                mod.exports = undefined;
                mod.status = STATUS.ERROR;
                mod.fireFactory();
                return mod;
            }

            // 非AMD模块
            shim = config.shim[mod.id];
            if (shim) {
                shimDeps = shim.deps || [];
                mod.save(shimDeps);
                mod.factory = function() {
                    return getGlobal(shim.exports);
                };
                mod.load();
            }

            // 匿名模块
            if (anonymousMeta) {
                mod.factory = anonymousMeta.factory;
                mod.save(anonymousMeta.deps);
                mod.load();
                anonymousMeta = null;
            }
        },

        save: function(deps) {
            var mod = this,
                STATUS = Module.STATUS;

            if (mod.status >= STATUS.SAVE) {
                return mod;
            }
            mod.status = STATUS.SAVE;

            each(deps, function(d) {
                var repeat = false;
                each(mod.dependencies, function(d2) {
                    if (d === d2.id) {
                        return repeat = true;
                    }
                });

                if (!repeat) {
                    mod.deps.push(d);
                }
            });
        }
    };


    /**
     * 初始化模块加载
     */
    Module.init = function() {
        var script, scripts, initMod, url;

        if (document.currentScript) {
            script = document.currentScript;
        } else {
            // 正常情况下，在页面加载时，当前js文件的script标签始终是最后一个
            scripts = getScripts();
            script = scripts[scripts.length - 1];
        }
        initMod = script.getAttribute("data-main");
        // see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
        url = script.hasAttribute ? script.src : script.getAttribute("src", 4);

        // 如果seed是通过script标签内嵌到页面，baseUrl为当前页面的路径
        seed.config.baseUrl = dirname(initMod || url);

        // 加载主模块
        if (initMod) {
            Module.use(initMod.split(","), noop, Module.guid());
        }

        scripts = script = null;
    };

    /**
     * 生成一个唯一id
     */
    Module.guid = function() {
        return "seed_" + (+new Date()) + (Math.random() + '').slice( -8 );
    };

    /**
     * 获取一个模块，如果不存在则新建
     *
     * @param url
     * @param deps
     */
    Module.get = function(url, deps) {
        return seed.modules[url] || (seed.modules[url] = new Module(url, deps));
    };

    /**
     * 加载模块
     *
     * @param {Array} ids 依赖模块的id列表
     * @param {Function} callback 模块加载完成之后的回调函数
     * @param {String} id 模块id
     */
    Module.use = function(ids, callback, id) {
        var config = seed.config,
            mod, url;

        ids = isString(ids) ? [ids] : ids;
        url = id2Url(id, config.baseUrl);
        mod = Module.get(url, ids);
        mod.id = id;
        mod.factory = callback;

        mod.load();
    };

    // 页面已经存在AMD加载器或者seed已经加载
    if (global.define) {
        return;
    }

    define = function(id, deps, factory) {
        var currentScript, mod;

        // define(factory)
        if (isFunction(id)) {
            factory = id;
            deps = [];
            id = undefined;

        }

        // define(deps, factory)
        else if (isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        }

        if (!id && (currentScript = getCurrentScript())) {
            id = currentScript.getAttribute("data-module");
        }

        if (id) {
            mod = Module.get(id);
            mod.factory = factory;
            mod.save(deps);
            mod.load();
        } else {
            anonymousMeta = {
                deps: deps,
                factory: factory
            };
        }
    };

    define.amd = {};

    require = function(ids, callback) {
        // require("test", callback)
        if (isString(ids)) {
            makeError("Invalid", "ids can't be string");
        }

        // require(callback)
        if (isFunction(ids)) {
            callback = ids;
            ids = [];
        }

        Module.use(ids, callback, Module.guid());
    };

    require.config = function(config) {
        mixin(seed.config, config);
    };


    // 初始化
    Module.init();
})(window);
