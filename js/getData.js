/*
* Laurie Waxman
* Thesis 
* 28.03.16
*
* parseDate && daysEllapsed from:
* http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
*
*/

var canvas = document.getElementById("main");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;

var systemHealth = document.getElementById("system_health");
var systemVisitors = document.getElementById("system_visitors");
var systemLastVisited = document.getElementById("system_date");
var systemDeadDeebs = document.getElementById("system_dead");
var systemYourFault = document.getElementById("system_yourFault");

var thisDeebInfo = document.getElementById('deeb');
var thisDeebName = document.getElementById('deeb_name');
var thisDeebHealth = document.getElementById('deeb_health');

var archive = document.getElementById('archive');


var jsonObjects = []; //array of all deebs from file
var deebs = []; //array of deebs to draw
var critterArray = []; //array of all critters to draw
var runCount = 0; 
var archiveImages = [];


var myImages = []; 
var myDeebs; 
var systemInfo; 
var points = 100;
var days = 0; 

function parseDate(str) {
    var mdy = str.split('/')
    return new Date(mdy[2], mdy[1]-1, mdy[0]);
}

function daysEllapsed(first, second) {
    return Math.abs( Math.round((second-first)/(1000*60*60*24)) );
}

var infoToggle = document.getElementById("infoToggle");
var info = document.getElementById("info");

infoToggle.onclick = function(){
	if(info.offsetLeft < 0){
		infoToggle.innerHTML = "x";
		info.style.left = "0px";
	}else{
		infoToggle.innerHTML = "i";
		info.style.left = "-"+info.clientWidth+"px";
	}
}

///////////////////////////////////////////////////////////////////////////////////////// MOUSE POSITIONS

//save mouse position to variables
var mouseX = w+200;
var mouseY = h+200;
document.onmousemove = function(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}
document.onmouseleave = function(e){
	mouseX = w+200;
	mouseY = h+200;
}




