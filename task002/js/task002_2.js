var showDay = $('#day');
var showHour = $('#hour');
var showMinute = $('#minute');
var showSecond = $('#second');
var getInterval = function(now,goal) {
    var day,hour,minute,second;
    var differ = goal - now;
    differ = size(Math.round(differ / 1000));
    day = size(Math.floor(differ / 60 / 60 / 24));
    hour = size(Math.floor(differ / 60 / 60 % 24));
    minute = size(Math.floor(differ / 60 % 60));
    second = size(Math.floor(differ % 60));
    // console.log(differ);
    
    return {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        differ : differ
    }

}
function size(num) {
    return num < 10 & num >= 0 ? '0' + num : num;
}  
var timeID;
$.click('#btn',function() { 
    var textTime = $('#text_time').value;
    timeID= setInterval(countdown,1000);
    function countdown(){
        var goal = new Date(textTime);
        var now = new Date();
        var interval = getInterval(now,goal);
        showDay.innerText = interval.day;
        showHour.innerText = interval.hour;
        showMinute.innerText = interval.minute;
        showSecond.innerText = interval.second; 
        if(interval.differ <= 0) {
            clearInterval(timeID);
            return;
        }
    }
    countdown()
}); 