// ==UserScript==
// @name           Memrise: Double-Line Error Identification
// @description    Shows the correct answer & what you wrote on two separate lines.
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        0.3
// @updateURL      https://userscripts.org/scripts/source/177582.meta.js
// @downloadURL    https://userscripts.org/scripts/source/177582.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {
  $("#central-area").on("DOMSubtreeModified", function() {  //trigger many times
    if ($("#errorIdChanged").size()==0) {                   //only triggered once
      
      var normal  = $(".wrote-diff").html();
      var correct = normal.replace(/<del>[^\<]*<\/del>/g,"");
      var written = normal.replace(/<ins>[^\<]*<\/ins>/g,"");
      console.log(written+"<br/>"+correct);
      $(".wrote-diff").html(written+"<br id='errorIdChanged'/>"+correct);
      $(".wrote-diff ins").css({background:"green", color:"black", padding:"0px 2px"});
      $(".wrote-diff del").css({background:"red",   color:"black", padding:"0px 2px"});
    }
  });
};

var injectWithJQ = function(f) {
  var script = document.createElement('script');
  script.textContent = '$(' + f.toString() + '($));';
  document.body.appendChild(script);
};
injectWithJQ(onLoad);
