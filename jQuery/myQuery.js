(function(window, undefined) {
    // window和undefined都是为了减少变量查找所经过的scope作用域。当window通过传递给闭包内部之后，在闭包内部使用它的时候，可以把它当成一个局部变量，显然比原先在window scope下查找的时候要快一些。
    // undefined也是同样的道理，其实这个undefined并不是JavaScript数据类型的undefined，而是一个普普通通的变量名。只是因为没给它传递值，它的值就是undefined，undefined并不是JavaScript的保留字。
    var myQuery = function(selector) {
        //强制为对象
        if (!(this instanceof myQuery)) {
            return new myQuery.fn.init(selector);
        }
        var elem = document.getElementById(/[^#].*/.exec(selector)[0]);
        this.length = 1;
        this[0] = elem;
        this.context = document; // 上下文
        this.selector = selector;
        this.get = function(num) {
            return this[num];
        }
        return this;
    }
    myQuery.fn = myQuery.prototype = {
        init:function(selector, context, rootjQuery) {
            //   ☑ 处理""、null、undefined、false、返回this、增加程序的健壮性
            //   ☑ 处理字符串
            //   ☑ 处理DOMElement，返回修改过后的实例对象this
            //   ☑ 处理$(function(){})
            var match, elem;
            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }
            
            // Handle HTML strings
            if (typeof selector === "string") {
                // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector);
            }
            
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context  = selector.context;
            }
            
            return jQuery.makeArray(selector, this);
        },
        version:'1.0.0',
        constructor:myQuery
    }
    myQuery.fn.init.prototype = myQuery.fn;

    window.myQuery = window.$ = myQuery;

    myQuery.extend = myQuery.fn.extend = function() {
        var options, src, copy,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length;
    
        //只有一个参数，就是对jQuery自身的扩展处理
        //extend,fn.extend
        if (i === length) {
            target = this; //调用的上下文对象jQuery/或者实例
            i--;
        }
        for (; i < length; i++) {
            //从i开始取参数,不为空开始遍历
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    copy = options[name];
                    //覆盖拷贝
                    target[name] = copy;
                }
            }
        }
        return target;
    }
})(window);
//全局变量是魔鬼, 匿名函数可以有效的保证在页面上写入JavaScript，而不会造成全局变量的污染，通过小括号，让其加载的时候立即初始化，这样就形成了一个单例模式的效果从而只会执行一次。


//ready与load
jQuery.ready.promise = function( obj ) {
    if ( !readyList ) {
        readyList = jQuery.Deferred();
        if ( document.readyState === "complete" ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            setTimeout( jQuery.ready );
        } else {
            //针对高级的浏览器，我们当前很乐意用DOMContentLoaded事件了，省时省力。
            document.addEventListener( "DOMContentLoaded", completed, false );
            window.addEventListener( "load", completed, false );
            //针对旧IE
            // Ensure firing before onload, maybe late but safe also for iframes
            document.attachEvent( "onreadystatechange", completed );
            // A fallback to window.onload, that will always work
            window.attachEvent( "onload", completed );
            // If IE and not a frame
            // continually check to see if the document is ready
            var top = false;
            try {
                top = window.frameElement == null && document.documentElement;
            } catch(e) {}
            if ( top && top.doScroll ) {
                (function doScrollCheck() {
                    if ( !jQuery.isReady ) {
                        try {
                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            top.doScroll("left");
                        } catch(e) {
                            return setTimeout( doScrollCheck, 50 );
                        }
                        // detach all dom ready events
                        detach();

                        // and execute any waiting functions
                        jQuery.ready();
                    }
                })();
            }
            // 针对IE的加载检测
            
            // Diego Perini 在 2007 年的时候，报告了一种检测 IE 是否加载完成的方式，使用 doScroll 方法调用，详情可见http://javascript.nwbox.com/IEContentLoaded/。
            // 原理就是对于 IE 在非 iframe 内时，只有不断地通过能否执行 doScroll 判断 DOM 是否加载完毕。在上述中间隔 50 毫秒尝试去执行 doScroll，注意，由于页面没有加载完成的时候，调用 doScroll 会导致异常，所以使用了 try -catch 来捕获异常。
            // 结论：所以总的来说当页面 DOM 未加载完成时，调用 doScroll 方法时，会产生异常。那么我们反过来用，如果不异常，那么就是页面DOM加载完毕了。
        }
    }
    return readyList.promise( obj );
};
// DOM文档加载的步骤：
// 要想理解为什么ready先执行，load后执行就要先了解下DOM文档加载的步骤：

// (1) 解析HTML结构。
// (2) 加载外部脚本和样式表文件。
// (3) 解析并执行脚本代码。
// (4) 构造HTML DOM模型。//ready
// (5) 加载图片等外部文件。
// (6) 页面加载完毕。//load
// 从上面的描述中大家应该已经理解了吧，ready在第（4）步完成之后就执行了，但是load要在第（6）步完成之后才执行。

//多库共存换句话说可以叫无冲突处理。
var _jQuery = window.jQuery,
_$ = window.$;

jQuery.noConflict = function( deep ) {
    if ( window.$ === jQuery ) {
        window.$ = _$;
    }
if ( deep && window.jQuery === jQuery ) {
        window.jQuery = _jQuery;
    }
    return jQuery;
};

//jQuery对象的构建
// 类一：
function ajQuery() {
    this.name = 'jQuery';
    this.sayName = function(){
        return this.name
    }
}
var a = new ajQuery()
var b = new ajQuery()
var c = new ajQuery()
 
// 类二:
function ajQuery() {
    this.name = 'jQuery'
}
ajQuery.prototype = {
    sayName: function() {
        return this.name
    }
}
var a = new ajQuery()
var b = new ajQuery()
var c = new ajQuery()

// 类一与类二产生的结构几乎是一样的，而本质区别就是：类二new产生的a、b、c三个实例对象共享了原型的sayName方法，这样的好处节省了内存空间，类一则是要为每一个实例复制sayName方法，每个方法属性都占用一定的内存的空间，所以如果把所有属性方法都声明在构造函数中，就会无形的增大很多开销，这些实例化的对象的属性一模一样，都是对this的引用来处理。除此之外类一的所有方法都是拷贝到当前实例对象上。类二则是要通过scope连接到原型链上查找，这样就无形之中要多一层作用域链的查找了。


jQuery = function( selector, context ) {
    return new jQuery.fn.init( selector, context );
}
jQuery.fn = jQuery.prototype = {
    init:function(){
    return this
},
    jquery: version,
    constructor: jQuery,
}
var a = $() ;

//插件接口设计
// 这里有一个设计的重点，通过调用的上下文，我们来确定这个方法是作为静态还是实例处理，在javascript的世界中一共有四种上下文调用方式：方法调用模式、函数调用模式、构造器调用模式、apply调用模式：

//     ☑  jQuery.extend调用的时候上下文指向的是jQuery构造器

//     ☑  jQuery.fn.extend调用的时候上下文指向的是jQuery构造器的实例对象了
//         通过extend()函数可以方便快速的扩展功能，不会破坏jQuery的原型结构，jQuery.extend = jQuery.fn.extend = function(){...}; 这个是连等，也就是2个指向同一个函数，怎么会实现不同的功能呢？这就是this力量了！

aAron.extend = aAron.fn.extend = function() {
    var options, src, copy,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length;

    //只有一个参数，就是对jQuery自身的扩展处理
    //extend,fn.extend
    if (i === length) {
        target = this; //调用的上下文对象jQuery/或者实例
        i--;
    }
    for (; i < length; i++) {
        //从i开始取参数,不为空开始遍历
        if ((options = arguments[i]) != null) {
            for (name in options) {
                copy = options[name];
                //覆盖拷贝
                target[name] = copy;
            }
        }
    }
    return target;
}

jQuery.fn.extend({
    find: function(selector) {

        //...........................省略................................

        //通过sizzle选择器，返回结果集
        jQuery.find(selector, self[i], ret);

        // Needed because $( selector, context ) becomes $( context ).find( selector )
        ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
        ret.selector = this.selector ? this.selector + " " + selector : selector;
        return ret;
    },
    get: function(num) {
        return num != null ?
        // Return just the one element from the set
        (num < 0 ? this[num + this.length] : this[num]) :
        // Return all the elements in a clean array
        slice.call(this);
    },
    // 可见内部是直接调用的静态方法：
    
    each: function(callback, args) {
        return jQuery.each(this, callback, args);
    },
    // jQuery.each静态方法：
    each: function(obj, callback, args) {
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike(obj);
    
        if (args) {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.apply(obj[i], args);
    
                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.apply(obj[i], args);
    
                    if (value === false) {
                        break;
                    }
                }
            }
        }
    },
    
})

// 迭代器除了单纯的遍历，在jQuery内部的运用最多的就是接口的抽象合并，相同功能的代码功能合并处理：
    
// 例如一：

jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});
// 例如二：

jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
}, function( orig, fix ) {
    //处理的代码
});
// 可以看出上面代码方法，针对相同的功能，节约了大量的代码空间。


// 观察者模式 (pub/sub) 的背后，总的想法是在应用程序中增强松耦合性。并非是在其它对象的方法上的单个对象调用。一个对象作为特定任务或是另一对象的活动的观察者，并且在这个任务或活动发生时，通知观察者。观察者也被叫作订阅者（Subscriber），它指向被观察的对象，既被观察者（Publisher 或 subject)。当事件发生时，被观察者（Publisher）就会通知观察者（subscriber）。

// 观察者的使用场合

// 观察者的使用场合就是：当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。先看官网的demo这个例子，涉及到了 add 与 fire方法，熟悉设计模式的童鞋呢，一眼就能看出，其实又是基于发布订阅（Publish/Subscribe）的观察者模式的设计。

var Observable = {
    callbacks: [],
    add: function(fn) {
      this.callbacks.push(fn);
    },
    fire: function() {
      this.callbacks.forEach(function(fn) {
        fn();
      })
    }
  }
//   使用add开始订阅：
  
  Observable.add(function() {
    alert(1)
  })
  
  Observable.add(function() {
    alert(2)
  })
//   使用fire开始发布：
  
  Observable.fire(); // 1, 2

//   设计该模式背后的主要动力是促进形成松散耦合。在这种模式中，并不是一个对象调用另一个对象的方法，而是一个对象订阅另一个对象的特定活动并在状态改变后获得通知。订阅者也称为观察者，而被观察的对象称为发布者或主题。当发生了一个重要的事件时，发布者将会通知（调用）所有订阅者并且可能经常以事件对象的形式传递消息。
  
//   总的来说，观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。


// jQuery. Deferred主要处理：
//     显而易见Deferred是个工厂类，返回的是内部构建的deferred对象
//     tuples 创建三个$.Callbacks对象，分别表示成功，失败，处理中三种状态
//     创建了一个promise对象，具有state、always、then、primise方法
//     扩展primise对象生成最终的Deferred对象，返回该对象
//     primise对象就是一个受限对象，只读
var Deferred = function (func) {
    var tuples = [
        //1 动作
        //2 侦听器
        //3 最终状态
        //后面的操作将是围绕这些接口处理
        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
        ["notify", "progress", jQuery.Callbacks("memory")]
    ],
        state = "pending",
        //扩展的primise对象
        promise = {
            state: function () { },
            always: function () { },
            then: function ( /* fnDone, fnFail, fnProgress */) { },
            promise: function (obj) { }
        },
        deferred = {};
    //定义管道风格的接口pipe
    promise.pipe = promise.then;
    //逐个添加所有的接口到deferred对象上
    jQuery.each(tuples, function (i, tuple) {
        deferred[tuple[0]] = function () {
            deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
            return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
    });
    //转成成promise对象
    promise.promise(deferred);
    //如果传递的参数是函数，直接运行
    if (func) {
        func.call(deferred, deferred);
    }
    return deferred;
}

//when就是一个合集的处理
//可以收集多个异步操作，合并成功后处理
//同时也可以绑定Promise 对象的其它方法，如 defered.then
//所以when内部必须要创建一个deferred对象
var when = function (subordinate /* , ..., subordinateN */) {
    var i = 0,
        resolveValues = slice.call(arguments),
        length = resolveValues.length,
        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
        updateFunc = function (i, contexts, values) {
            return function (value) { };
        },
        progressValues, progressContexts, resolveContexts;
    if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
            if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                resolveValues[i].promise()
                    .done(updateFunc(i, resolveContexts, resolveValues))
                    .fail(deferred.reject)
                    .progress(updateFunc(i, progressContexts, progressValues));
            } else {
                --remaining;
            }
        }
    }
    return deferred.promise();
}
  