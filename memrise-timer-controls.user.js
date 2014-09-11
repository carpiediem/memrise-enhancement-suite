// ==UserScript==
// @name           Memrise Timer Controls
// @description    Adds buttons that let you configure the timing of watering sessions
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

//unsafeWindow.watch("MEMRISE", watchLocation);
// Do this at some point: http://www.memrise.com/thread/1305495/

oldstart = MEMRISE.garden.feedback.start;

function setCountdown(currentSetting) {
    GM_setValue("timer", currentSetting);
    switch (currentSetting) {
        case "normal":
            //Change button color & tooltip
            $('#timerToggle').css('background-color',"green").attr("title","Answer timer is set to normal.\nClick to slow the timer.");
            //Change website functionality
            MEMRISE.garden.timer.paused = false;
            MEMRISE.garden.timer.unpause();
            break;
            
        case "slow":
            //Change button color & tooltip
            $('#timerToggle').css("background-color","yellow").attr("title","Answer timer is set to slow.\nClick to disable the timer.");
            //Change website functionality
            MEMRISE.garden.timer.activate = function (a,b){
                MEMRISE.garden.timer.cancel();
                MEMRISE.garden.timer.active=true;
                MEMRISE.garden.timer.howlong=3*a;
                MEMRISE.garden.timer.time_remaining=3*a;
                if(b) {MEMRISE.garden.timer.callback=b;}
                MEMRISE.garden.timer.draw();
                MEMRISE.garden.$centralarea.imagesLoaded(function(){MEMRISE.garden.timer.start();});
            };
            MEMRISE.garden.timer.activate(MEMRISE.garden.timer.howlong);
            break;

        case "disabled":
            //Change button color & tooltip
            $('#timerToggle').css('background-color',"red").attr("title","Answer timer is disabled.\nClick to enable the timer.");
            //Change website functionality
            MEMRISE.garden.timer.activate = function (a,b){
                MEMRISE.garden.timer.cancel();
                MEMRISE.garden.timer.active=true;
                MEMRISE.garden.timer.howlong=a;
                MEMRISE.garden.timer.time_remaining=a;
                if(b) {MEMRISE.garden.timer.callback=b;}
                MEMRISE.garden.timer.draw();
                MEMRISE.garden.$centralarea.imagesLoaded(function(){MEMRISE.garden.timer.start();});
            };
            MEMRISE.garden.timer.activate(MEMRISE.garden.timer.howlong/3);
            MEMRISE.garden.timer.paused = true;
            break;
        }
}
    
function setDelay(currentSetting) {
    GM_setValue("delay", currentSetting);
    if (currentSetting) {
        //Change button color & tooltip
        $('#delayToggle').css('background-color',"green").attr("title","Delay between questions is set to normal.\nClick to eliminate the delay.");
        //Enable the delay
        MEMRISE.garden.feedback.start = function (a){ oldstart(a); };
    }else{
        //Change button color & tooltip
        $('#delayToggle').css('background-color',"red").attr("title","No time between questions.\nClick to add a delay.");
        //Disable the delay
        MEMRISE.garden.feedback.start = function (a){ MEMRISE.garden.box.next_press(); };
    }
}

//Create buttons
$( '<div id="timerControls"><div id="timerToggle"></div><div id="delayToggle"></div></div>' ).insertBefore( ".streak" );
$('#timerControls').css('width','100px');
$('#timerControls div').css({width:'32px',height:'32px',margin:'8px',"background-image":"url('http://www.rslc.us/images/timer-controls.png')",'background-color':'grey'}).attr("title","The timer control script did not load correctly.");
$('#timerToggle').css({float:'left', 'background-position':'32px 0px'});
$('#delayToggle').css({float:'right','background-position':'0px 0px' });

//Check to see the previous setting
var timerSetting = GM_getValue("timer", "normal");
var delayEnabled = GM_getValue("delay", true);

setCountdown(timerSetting);
setDelay(delayEnabled);

$('#timerToggle').click(function() {
  switch (timerSetting) {
    case "normal":   timerSetting = "slow";     break;
    case "slow":     timerSetting = "disabled"; break;
    case "disabled": timerSetting = "normal";   break;
  }
  setCountdown(timerSetting);
});

$('#delayToggle').click(function() {
  delayEnabled = !delayEnabled;
  setDelay(delayEnabled);
});
