/*function trimSpace(array){  
    for(var i = 0 ;i<array.length;i++)  
    {  
        if(array[i] == " " ||array[i] == "  " || array[i] == null || typeof(array[i]) == "undefined")  
        {  
                 array.splice(i,1);  
                 i= i-1;  
        }  
    }  
    return array;  
}  

$.click('#btn', function(e){
    var text = $('#input').value;
    if(!text) return;
    var hobbies = text.split(/,/);
    hobbies = uniqArray(hobbies);
    hobbies = trimSpace(hobbies);
    if(!text) return;
    var pp;
    if(pp = $('#pp')) {
        pp.lastChild.nodeValue = hobbies.join('+');
    }
   
    
    // console.log(hobbies.join('-'));
    else {
    pp = document.createElement('p');
    pp.setAttribute('id','pp');
    pp.appendChild(document.createTextNode(hobbies.join('+')));
    this.parentNode.appendChild(pp);
    // console.log(document);

    }
});
$.click('#btn2', function(e){
    var text = $('#input2').value;
    if(!text) return;
    var hobbies = text.split(/[\s,，、;]+/g);
    hobbies = uniqArray(hobbies);
    if(!text) return;
    var pp;
    if(pp = $('#ppp')) {
        ppp.lastChild.nodeValue = hobbies.join('+');
    }
   
    
    // console.log(hobbies.join('-'));
    else {
    pp = document.createElement('p');
    pp.setAttribute('id','ppp');
    pp.appendChild(document.createTextNode(hobbies.join('+')));
    this.parentNode.appendChild(pp);
    console.log(document);

    }
});*/
// 第三阶段
var warn;
var input3_text = $("#input3").value;
var hobbies = input3_text.split(/[\s,，、;]+/g); 
var showTip = function(tip) {
    if(warn) {
        warn.style.display = 'block';
        warn.lastChild.nodeValue = tip;
    } else{
        warn = $('warn') || document.createElement('p');
        warn.setAttribute('id','warn');
        warn.style.color = "red";
        warn.appendChild(document.createTextNode(String(tip)));
        btn3.parentNode.insertBefore(warn,btn3);
    }
}
var hidTip = function() {
    if(warn) {
        warn.style.display = "none";
    }
}
var cerateCheckbox = function(txt) {
    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    label.appendChild(document.createTextNode(txt));
    label.appendChild(checkbox);
    return label;
}

$.on("#input3",'keyup',function(e) {
    input3_text = $("#input3").value;
    hobbies = input3_text.split(/[\s,，、;]+/g); 
    hobbies = uniqArray(hobbies);
    if (hobbies.length > 10) {
        showTip("最多只能有十个爱好哦!");
        $("#input3").maxLength = 0;
        return;
    } else {
        hidTip();
    }
});
var showHobby = function() {
    var txt3;
    if(txt3 = $('#txt3')) {
        $('#txt3').innerHTML = "";
        for(var i = 0,len = hobbies.length; i<len; i++) {
            $('#txt3').appendChild(cerateCheckbox(hobbies[i]));
        }
    }
    else {
        txt3 = document.createElement('div');
        txt3.setAttribute("id","txt3");
        for(var i = 0,len = hobbies.length; i<len; i++) {
            txt3.appendChild(cerateCheckbox(hobbies[i]));
            $("#btn3").parentNode.appendChild(txt3);
        }
    }
    
}
$.click('#btn3', function(e){
    // console.log(input3_text);
    if(!input3_text) {
        showTip("请输入你的爱好");
        return;
    }
    showHobby();
    
});