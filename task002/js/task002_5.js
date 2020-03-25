var dragBlock = $(".drag-block"); //最外层容器
var leftUl = $(".left-ul"); //左边ul
var rightUl = $(".right-ul"); //右边ul
var aLi = dragBlock.getElementsByTagName("li");
var zInd = 2;
function liColor() {
    var oLi = document.getElementsByTagName('li');
    for(var i =0 ,len = oLi.length; i<len ; i++) {
        oLi[i].style.backgroundColor = getRandomColor();
    }
};
liColor();
function getRandomColor(){
    return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6); 
  };

  toPosition();
 //记录每个标签的初始位置
  function toPosition() {
      var eleArr = document.getElementsByTagName("li");
      var aPos = [];
      //
      for (var i = 0, len = eleArr.length; i < len; i++) {
          aPos[i] = {
              left: eleArr[i].offsetLeft,
              top: eleArr[i].offsetTop
          };
      }
      for (i = 0, len = eleArr.length; i < len; i++) {
          eleArr[i].style.left = aPos[i].left + "px";
          eleArr[i].style.top = aPos[i].top + "px";
          eleArr[i].style.position = "absolute";
          eleArr[i].index = i;
      }
      
  };
// 事件代理
delegateEvent(dragBlock,"li","mousedown",function(e) {
    var e = e || window.event;
    var x= e.clientX - this.offsetLeft;
    var y =e.clientY - this.offsetTop;
    zInd++;
    this.style.zIndex = zInd;
    var that = this;    //缓存this
    that.style.opacity = "0.5";

    // 保留创建li的位置
    var originalLeft = parseInt(that.style.left);
    var originalTop = parseInt(that.style.top);

    addEvent(document, "mousemove", onmousemove);
    addEvent(document, "mouseup", onmouseup);  //重置一下，为下一个拖拽做准备
    function onmousemove(e) {
        e = e || window.event;
        var boxX = e.clientX - x;
        var boxY = e.clientY - y;
        //边界限制
        var winWidth = document.body.clientWidth || document.documentElement.clientWidth;
        var winHeight = document.body.clientHeight || document.documentElement.clientHeight;
        if(boxX < -640) {
            boxX = -640;
        }else if (boxX >= winWidth ) {
            boxX = winWidth ;
        }
        if(boxY < -240) {
            boxY = -240;
        }else if (boxY >= winHeight ) {
            boxY = winHeight ;
        }

        that.style.left = boxX + 'px';
        that.style.top = boxY + "px"
    }
    function onmouseup(e) {
            e = e || window.event;
            removeEvent(document,"mousemove",onmousemove);
            removeEvent(document, "mouseup", onmouseup); //重置
            // console.log(that);
        
        if (that.parentNode === leftUl) {
            // console.log(that);
            appChild(that, rightUl);

        } else {
            appChild(that, leftUl);

        }
        that.style.opacity = "1";

    }
         /**
         * 插入对方父容器函数
         * @param {object} obj    待插入节点
         * @param {object} parent 对方父节点
         */
    function appChild(obj,parent) {
        
        if(hit(obj,parent)) {
            var oLi = parent.getElementsByTagName("li");
            var len = oLi.length;
            var parentUl = obj.parentNode
            var parentLis = parentUl.getElementsByTagName("li");

            parent.appendChild(obj);

            if (len) {
                // console.log(oLi);
                obj.style.left = oLi[0].style.left;
                obj.style.top = oLi[len - 1].offsetTop + oLi[0].offsetHeight + "px";
            } else {
                obj.style.left = parent.offsetLeft + 1 + "px";
                obj.style.top = parent.offsetTop + 1 + "px";
            }
            // var parentLis = obj
            for (var j = 0 , liLen = parentLis.length; j < liLen; j++) {
                if(j === 0) {
                    parentLis[0].style.left = parentUl.offsetLeft + 1 + "px";
                    parentLis[0].style.top = parentUl.offsetTop + 1 + "px";
                } else {
                    parentLis[j].style.left = parentLis[j - 1].style.left;
                    parentLis[j].style.top = parentLis[j - 1].offsetHeight + parentLis[j - 1].offsetTop + "px";
                }
            }
            
    } 
    else {
        obj.style.left = originalLeft + "px";
        obj.style.top = originalTop + "px";
    }
    }
 
});
/**
     * 碰撞检测函数
     * @param   {object}  obj1 对象1
     * @param   {object}  obj2 对象2
     * @returns {boolean} 碰撞时返回true，否则反正false
     */
function hit(obj1,obj2) {
    //对象1 的相关值
    var l1 = obj1.offsetLeft;
    var r1 = obj1.offsetLeft + obj1.offsetWidth;
    var t1 = obj1.offsetTop;
    var b1 = obj1.offsetTop + obj1.offsetHeight;

     var l2 = obj2.offsetLeft;
     var r2 = obj2.offsetLeft + obj2.offsetWidth;
     var t2 = obj2.offsetTop;
     var b2 = obj2.offsetTop + obj2.offsetHeight;

     if (l1 > r2 || r1 < l2 || b1 < t2 || t1 > b2) {
        return false;
    } else {
        return true;
    }
}
