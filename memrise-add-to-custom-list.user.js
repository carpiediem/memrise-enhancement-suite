// ==UserScript==
// @name           Memrise - Add Things to a Custom List
// @description    This script adds a drop down menu to the gardening review page that will allow you to add the word to any list you created.  Memrise only allows lists for languages, not other topics.
// @match          http://www.memrise.com/*garden/*
// @version        0.2
// @updateURL      https://userscripts.org/scripts/source/174888.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174888.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {
  $.getJSON('http://www.memrise.com/api/course/learning/', function(data) {
    
  
    var h = '<div id="addToList" class="btn-group pull-right" style="position:absolute;top:130px;right:0px;">';
    h +=    '  <button class="dropdown-toggle btn btn-icos-active" data-toggle="dropdown">';
    h +=    '    <span class="ico ico-plus"></span>';
    h +=    '    Add to a List';
    h +=    '    <span class="ico ico-arr-down ico-s ico-right"></span>';
    h +=    '  </button>';
    h +=    '  <ul class="dropdown-menu">';
    for (i in data.courses) {
      var course = data.courses[i];
      if (!course.is_list) continue;
      h += '    <li class="reviewList"><a id="course-' + course.id + '" href="' + course.url + '">' + course.name + '</a></li>';
      $.getJSON('http://www.memrise.com/ajax/session/?course_id=' + course.id + '&level_index=1&session_slug=preview', function(data) {
        $("#course-"+data.session.course_id).attr("data-level",data.session.level_id);
      });
    }
    h +=    '    <li class="divider"></li>';
    h +=    '    <li><a href="/course/create/" title="Lists can only be made for languages, not other topics.  You\'ll need to add 3 things to the list when you first create it.">Create a New List</a></li>';
    h +=    '  </ul>';
    h +=    '</div>';
    $("#right-area").append(h);
    $("li.reviewList a").click(function(e){
      e.preventDefault();
      
      var level_id = $(this).attr("data-level");
      var thing_id = MEMRISE.garden.box.box_dict.thing_id;
      var c = MEMRISE.garden.session_data.things[thing_id].columns;
      
      console.log("Adding new thing to a review list ("+thing_id+").");
      var req = {type: "POST",
                 url:  "http://www.memrise.com/level/things/add/",
                 data: "level_id=" + level_id + "&columns=" + encodeURIComponent('{"1":{"val":"'+c[1].val+'"},"2":{"val":"'+c[2].val+'"},"3":{"val":"'+c[3].val+'"}}') + "&attrs=%7B%7D",
                 success: function(data, textStatus, jqXHR){console.log(data)},
                };
      console.log(req);
      $.ajax(req);
    });
  });
  
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};
injectWithJQ(onLoad);
