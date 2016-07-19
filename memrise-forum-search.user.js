// ==UserScript==
// @name           Memrise Forum Search
// @description    Adds a search field to Memrise's forum pages
// @match          http://www.memrise.com/forum*
// @match          http://www.memrise.com/thread/*
// @version        0.2
// @namespace      https://greasyfork.org/users/5238-carpiediem
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant          none
// ==/UserScript==

var submitQuery = function(){
  if (searchInp.value=="Search..." || searchInp.value=="") return false;
  window.location.href = 'http://www.google.com/search?q=' + searchInp.value + '+site%3Ahttp%3A%2F%2Fwww.memrise.com%2Fthread' + searchSel.childNodes[searchSel.selectedIndex].value;
}

var searchInp = document.createElement("input");
searchInp.setAttribute("id","search");
searchInp.setAttribute("value","Search...");
searchInp.style.width = "76px";
searchInp.style.height = "22px";
searchInp.style.padding = "2px 24px 2px 2px";
searchInp.style.cssFloat = "right";
searchInp.style.marginRight = "10px";
searchInp.style.marginTop = "5px";
searchInp.style.color = "#aaa";
searchInp.style.fontSize = "0.5em";
searchInp.onfocus = function(){ if (this.value=="Search...") {this.value=""         } }
searchInp.onblur  = function(){ if (this.value==""         ) {this.value="Search..."} }
searchInp.onkeypress = function(e){ if (e.keyCode==13) submitQuery() }

var searchBtn = document.createElement("img");
searchBtn.setAttribute("id","searchButton");
searchBtn.setAttribute("src","http://upload.wikimedia.org/wikipedia/commons/e/e2/Feedbin-Favicon-search-light.svg");
searchBtn.style.width = "16px";
searchBtn.style.cssFloat = "right";
searchBtn.style.margin = "12px -100px 0px 0px";
searchBtn.style.cursor = "pointer";
console.log("Before: "+searchBtn.onclick);
searchBtn.onclick = submitQuery;
console.log("After: "+searchBtn.onclick);

var searchSel = document.createElement("select");
searchSel.style.width = "110px";
searchSel.style.height = "30px";
searchSel.style.cssFloat = "right";
searchSel.style.marginRight = "10px";
searchSel.style.marginTop = "5px";
searchSel.style.fontSize = "0.4em";

var optionAll = document.createElement("option");
optionAll.setAttribute("value",'');
optionAll.appendChild( document.createTextNode("All Forums") );
searchSel.appendChild(optionAll);

var optionGen = document.createElement("option");
optionGen.setAttribute("value",'%2F+intitle%3A"Forums+>+General+discussion"');
optionGen.appendChild( document.createTextNode("General Discussion") );
searchSel.appendChild(optionGen);

var optionIde = document.createElement("option");
optionIde.setAttribute("value",'%2F+intitle%3A"Forums+>+Course+ideas"');
optionIde.appendChild( document.createTextNode("Course Ideas") );
searchSel.appendChild(optionIde);

var optionDev = document.createElement("option");
optionDev.setAttribute("value",'%2F+intitle%3A"Forums+>+What%27s+New"');
optionDev.appendChild( document.createTextNode("Upcoming Developments") );
searchSel.appendChild(optionDev);

document.getElementsByTagName("h1")[0].appendChild(searchSel);
document.getElementsByTagName("h1")[0].appendChild(searchInp);
document.getElementsByTagName("h1")[0].appendChild(searchBtn);
