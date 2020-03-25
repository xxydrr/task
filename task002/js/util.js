
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    return '[object Array]' === Object.prototype.toString.call(arr);
    // return Array.isArray(arr);
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    return '[object Function]' === Object.prototype.toString.call(fn);
    // return fn instanceof Function;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 function cloneObject(src) {
         // your implement
         var result = src;
         var i;
         var len;
         if (!src
             || src instanceof String 
             || src instanceof Number 
             || src instanceof Boolean ) {
             return result;
         }
         else if (Array.isArray(src)) {
             result= [];
             var resultLen= 0;
             for ( i=0,len = src.length; i<len; i++) {
                result[resultLen++] = cloneObject(src[i]);
              }
         }
         else if (isPlain(src)) {
             result = {};
             for ( i in src) {
                 if (src.hasOwnProperty(i)) {
                     result[i] = cloneObject(src[i]);
                 }
             }
         }
         return result;

}
/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 *
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *
 * @returns {Boolean} 检查结果
 */
function isPlain(obj){
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        key;
    if ( !obj ||
         //一般的情况，直接用toString判断
         Object.prototype.toString.call(obj) !== "[object Object]" ||
         //IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
         //isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
         //对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
         !('isPrototypeOf' in obj)
       ) {
        return false;
    }

    //判断new fun()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if ( obj.constructor &&
        !hasOwnProperty.call(obj, "constructor") &&
        !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for ( key in obj ) {}
    return key === undefined || hasOwnProperty.call( obj, key );
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
// var abObj = srcObj;
// var tarObj = cloneObject(srcObj);

// srcObj.a = 2;
// srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var obj = {};
    for (var i=0,len=arr.length; i<len; i++) {
        obj[arr[i]] = true;
    }

    return Object.keys(obj);
}

// 使用示例
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return String(str).replace(/\s/g,"")
}

// 使用示例
// var str = '   hi!  ';
// str = trim(str);
// console.log(str); // 'hi!'


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for (var i=0,len=arr.length; i<len; i++) {
        fn(arr[i],i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item) {
//     console.log(item)
// }
// each(arr, output);  // java, c, php, html

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item, index) {
//     console.log(index + ': ' + item)
// }
// each(arr, output);  // 0:java, 1:c, 2:php, 3:html


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var result = [];
    var i;
    for(i in obj) {
        if(obj.hasOwnProperty(i)) {
            result.push(i);
        }
    }
    return result.length;
}

// 使用示例
// var obj = {
//     a: 1,
//     b: 2,
//     c: {
//         c1: 3,
//         c2: 4
//     }
// };
// console.log(getObjectLength(obj)); // 3


function isEmail(emailStr) {
    // your implement
    var reg = /^[\.\w\-\+]+\@[0-9a-zA-Z]+(\.[a-zA-Z]{2,4}){1,2}$/g;
    return reg.test(emailStr);
   
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var reg = /^1[3|4|5|7|8|9]\d{9}$/g;
    // var str = "18819774902";
    return reg.test(phone)
}

// console.log(isMobilePhone("18919774902"));
// console.log(isEmail("337536188@qq.com"));
/**
* 判断是否有某个className
* @param {HTMLElement} element 元素
* @param {string} className className
* @return {boolean}
*/

function hasClass(element,className) {
    var classNames = element.className;
    if (!classNames) {
        return false;
    }
    classNames = classNames.split(/\s+/);
    for (var i = 0,len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            return true;
        }
    } 
    return false;
}
// 为element增加一个样式名为newClassName的新样式
/**
* 添加className
*
* @param {HTMLElement} element 元素
* @param {string} className className
*/
function addClass(element, newClassName) {
    // your implement
    if (!hasClass(element,newClassName)) {
        element.className = element.className ? [element.className,newClassName].join(' ') : newClassName;
    }

}

// 移除element中的样式oldClassName
/**
* 删除元素className
*
* @param {HTMLElement} element 元素
* @param {string} className className
*/
function removeClass(element, oldClassName) {
    // your implement
    if (oldClassName && hasClass(element, oldClassName)) {
         var classNames = element.className.split(/\s/);//字符串转为数组
        for (var i = 0, len = classNames.length; i<len; i++) {
            if (classNames[i] === oldClassName) {
                classNames.split(i,1);
                break;
            }
        }
    }
    element.className = classNames.join(" "); //数组转为字符串
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    if (element === siblingNode) {
        return false;
    }
    else if (element.nodeType == 1 && siblingNode.nodeType == 1 && element.parentNode === siblingNode.parentNode) {
        return true
    }
    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
/**
 * 获取元素相对于浏览器窗口左上角的位置
 * 注意：不是文档左上角，如果是相对于文档左上角，还需要加上scrollTop、scrollLeft
 *
 * @param {HTMLElement} element 元素
 * @return {Object} 位置
 */
function getPosition(element) {
    // your implement
    var box = element.getBoundingClientRect();
    return box;
}
// your implement
/**
 * mini $
 *
 * @param {string} selector 选择器
 * @return {Array.<HTMLElement>} 返回匹配的元素列表
 */
function $(selector) {
    return document.querySelector(selector);
}
// 为了便于查找绑定过的事件，增加了一级命名空间
// 给一个element绑定一个针对event事件的响应，响应函数为listener

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }else if(element.attachEvent){
        element.attachEvent('on' + event, listener)
    }else{
        element["on"+event] = listener;
    }
}
// 例如：


// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener);
    }else if(element.detachEvent){
        element.detachEvent('on'+event,listener);
    }else{
        element['on'+event] = null;
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    return addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    return addEvent(element, 'keypress', function(e) {
        var event = e || window.event;
        var keyCode = event.which || event.keyCode;

        if (keyCode === 13) {
            listener.call(element, event);
        }
    });
}
// 事件代理
function delegateEvent(element, tag, event, listener){
    return addEvent(element, event, function(e){
        var oEvent = e || window.event;
        var target = oEvent.target||oEvent.srcElement;
        if (target.tagName.toLowerCase() === tag) {
            listener.call(target,oEvent);
        }
    });
};
$.on = function (selector, event, listener) {
    return addEvent($(selector), event, listener);
};

$.click = function (selector, listener) {
    return addEvent($(selector), 'click', listener);
};

$.un = function (selector, event, listener) {
    return removeEvent($(selector), 'click', listener);
};

$.delegate = function (selector, tag, event, listener) {
    return delegateEvent($(selector), tag, event, listener);
};


// 学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
function ajax(url,options) {

    //默认参数
    var defaults = {
        type : 'get',
        data : {},
        dataType : 'text',
        success : function(data) {console.log(data)},
        onfail : function(data) {console.log("服务器发生错误");
        }
    }
    //处理参数，传递参数时覆盖默认参数，不传递就用默认参数
    for(var key in obj) {
        defaults[key] = obj[key];

    }
    // 1、创建XMLHttpRequest对象
    var xhr = null;
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');

    }
    
    // 把对象的形式的参数转化为字符串形式的参数
    var param = '';
    for(var attr in obj.data) {
        param += attr += '=' + obj.data[attr] + '&';
    }
    if(param) {
        param = param.substring(0,param.length - 1) ;
    }
    //处理get请求参数并且参数中文乱码问题
    if(defaults.type == 'get') {
        url += '?' + encodeURI(param);
    }
    //2、准备发送(设置发送的参数)
    xhr.open(defaults.type,url);
    //处理post请求参数并且设置请求头信息（必须设置）
    var dataURL = null;
    if(defaults.type == 'post') {
        data = param;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    }
        //3、执行发送动作
    xhr.send(dataURL);

    // 4、指定回调函数(处理服务器响应数据)
    xhr.onreadystatechange = function() {
        if(xhr.readState == 4) {
            if(xhr.status===200||xhr.status===304) {
                var data = xhr.responseText;
                if(defaults.dataType == 'json') {
                    data = JSON.parse(data);
                }
                defaults.success(data)
            }
            else {
                defaults.onfail(data);
            }
        }
    }
}