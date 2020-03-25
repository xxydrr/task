var suggestData = ['nba', 'cba','nbl','javascript','java','css','html','javascript书籍','javascript教程','javascript学习']

// console.log(suggestData);

// document.body.onkeyup = function (e) {
//     e = e || window.event
//     console.log('key: ', e.key) // 当前键名
//     console.log('keyCode: ', e.keyCode) // 键值
// }
var text = $('.inputText');
var dataList = $('.dataList');
var oLi ;


text.oninput = function() {
    // console.log(text);
    var inputText = text.value;
    
    if(inputText === '') {
        dataList.innerHTML = ''
    }
    else {
        dataList.style.display = 'block';
        var result;
        var reg = new RegExp("^"+inputText,'i');
        result = suggestData.filter(function(e) {
            return e.match(reg);
        });
        // console.log(result);
        
        var liText = '';
        for(var i = 0,len=result.length; i<len; i++) {
            liText += '<li>' + result[i]+ '</li>';
            dataList.innerHTML = liText;
        }
    }


}
addEvent(text, 'focus', function() {
    document.onkeydown = function(e) {
        var aid = $('.active');
        if(e.keyCode == 13) {
            text.value = aid.innerText;
            removeLiClass();
            dataList.style.display = 'none';
        }
        if(e.keyCode == 40) {
        if(aid){
                if(aid.nextElementSibling) {
            removeLiClass();
            addClass(aid.nextElementSibling,"active");
                } else {
                    console.log("到底了");
                    
                }
            } else {
              oLi  = dataList.querySelectorAll("li");
              addClass(oLi[0],"active");
         }
        }
        if(e.keyCode == 38) {
            if(aid.previousElementSibling) {
               removeLiClass();
            addClass(aid.previousElementSibling,"active");

            }
            else {
                console.log("已经是最前面了");
                
            }
        }
    }
    
});


$.delegate (".dataList", "li", "mouseover", function() {
    removeLiClass();
    addClass(this,"active");

}) ;
$.delegate (".dataList", "li", "mouseout", function() {
    removeLiClass();
});
$.delegate (".dataList", "li", "click", function() {
    text.value = this.innerText;
    removeLiClass();
    dataList.style.display = 'none';
});

// addEvent(dataList, "click",function(e) {
//     text.value = e.target.innerText;
//     removeLiClass();
//     dataList.style.display = 'none';
// });
function removeLiClass() {
        var oLi = dataList.getElementsByTagName("li");
        for (var i = 0, len = oLi.length; i < len; i++) {
            oLi[i].className = "";
        }
    }