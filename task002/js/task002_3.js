function $(selector) {
    return document.querySelector(selector);
}
function slideShow() {
    var banner = $(".banner") ;
    var imgBox = $(".imgList");
    var bannerWidth = banner.offsetWidth;
    var list = imgBox.querySelectorAll("li");
    var count = list.length;
    var indicators=$(".listCircle").querySelectorAll("li");
    // console.log(indicators);
    var index = 1;
    var intervalTime = 2000;    //过度总时间
    var loop = true;        //可循环为true
    var clockwise =true;    //顺时针时为true，否则false

    imgBox.style.width = bannerWidth*count + 'px';
    for(var i = 0,len = list.length; i<len; i++) {
        list[i].style.width= bannerWidth + 'px';
        
    }
    for(var j=0 ; j<indicators.length; j++) {
        indicators[j].setAttribute("index",j+1);
    }
    var timer;
    imgBox.style.left = -bannerWidth + 'px';


    // 响应式
    window.onresize = function() {
    bannerWidth = banner.offsetWidth;
    imgBox.style.width = bannerWidth*count + 'px';
        for(var i = 0,len = list.length; i<len; i++) {
        list[i].style.width= bannerWidth + 'px';
        }
        imgBox.style.left = (-index*bannerWidth) + 'px';
    

    }

    // 显示小圆点
    function showIndicator(index){
        for(var i=0,len=indicators.length; i<len;i++){
            indicators[i].className = '';
        }
         indicators[index-1].className = "current";
    }

    function animate(offset){
        var updateLeft = parseInt(imgBox.style.left) + offset;
        var time = 100;
        var interval = 10;
        var speed = offset / (time / interval); //每10毫秒移动的距离
       
        function move() {
            if (updateLeft != parseInt(imgBox.style.left)) {
                imgBox.style.left = parseInt(imgBox.style.left) + speed +'px';
                setTimeout(move,20);    //这一步一定执行完 假如 updateLeft = -bannerWidth*6,执行完后执行else瞬间从最后一张跳回第一张
            } else {
                if(updateLeft > -bannerWidth){
                    imgBox.style.left = -bannerWidth*5 + 'px';
                }
                else if(updateLeft < - bannerWidth * 5){
                    imgBox.style.left = -bannerWidth + 'px';
                }
            }
        }
        move();
       
    }
    function next() {
        if(loop) {
            if(index == 5) {
                index = 1;
    
            }else {
                index++;
               
            }
            animate(-bannerWidth);
           showIndicator(index);
        }else {
            if(index == 5) {
                stop();
    
            }else {
                index++;
                animate(-bannerWidth);
                showIndicator(index);
            }
        }
    }
    function prev() {
        if(loop) {
            if(index == 1) {
                index = 5 ;
               
            }else {
                index--;
            }
            showIndicator(index);
            animate(bannerWidth);
        }else {
            if(index == 1) {
                stop();
               
            }else {
                index--;
                animate(-bannerWidth);
                showIndicator(index);
            }
        }
     }
    // 进行自动播放
    function play(){
       if(!clockwise) {
        timer = setInterval(function(){
            prev();
        },intervalTime);
       }else {
        timer = setInterval(function(){
            next();
        },intervalTime);
       }
    }
    function stop(){
        clearInterval(timer);
    }

    for(var i = 0; i < indicators.length; i++){
        indicators[i].onclick = function(){
            if(this.className == 'current'){
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -bannerWidth*(myIndex - index);
            stop();
            // play();
            animate(offset);
            index = myIndex;
            showIndicator(index);
        }
    }
    play();
    // banner.onmouseover = play;
    
    // banner.onmouseout = stop;

 
}
slideShow();

