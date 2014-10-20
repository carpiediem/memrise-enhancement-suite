// ==UserScript==
// @name           Memrise Auto-Pause
// @description    Pauses Memrise watering & gardening when the window loses focus
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        0.1
// @namespace      https://greasyfork.org/users/5238-carpiediem
// @grant          none
// ==/UserScript==

var onLoad = function($) {
  $("div.garden-timer div.txt").bind("DOMSubtreeModified", function() {
    if (!document.hasFocus()) MEMRISE.garden.pause();
  });
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};
injectWithJQ(onLoad);
