/*
* Laurie Waxman
* Thesis 
* 28.03.16
*
* parseDate && daysEllapsed from:
* http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
*
*/

var systemHealth = document.getElementById("system_health");
var systemVisitors = document.getElementById("system_visitors");
var systemLastVisited = document.getElementById("system_date");
var systemDeadDeebs = document.getElementById("system_dead");
var systemYourFault = document.getElementById("system_yourFault");

var thisDeebInfo = document.getElementById('deeb');
var thisDeebName = document.getElementById('deeb_name');
var thisDeebHealth = document.getElementById('deeb_health');

var systemInfo; 
var points = 100;

function parseDate(str) {
    var mdy = str.split('/')
    return new Date(mdy[2], mdy[1]-1, mdy[0]);
}

function daysEllapsed(first, second) {
    return Math.abs( Math.round((second-first)/(1000*60*60*24)) );
}



var xmlGetSystemInfo = new XMLHttpRequest();
xmlGetSystemInfo.open('GET', 'assets/creatures.json');
xmlGetSystemInfo.onreadystatechange = function() {
	if(xmlGetSystemInfo.readyState==4){

		var myData = JSON.parse(xmlGetSystemInfo.responseText);

		systemInfo = myData.info;

		// console.log("original:", systemInfo);
		systemInfo.visitors += 1; 
		systemInfo.points += 30;

		var today = new Date();
		var visited = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
		var lastVisited = systemInfo.lastVisit;

		points = systemInfo.points;
		if(points<0) points = 0; 
		else if(points>400) points = 400; 

		systemHealth.innerText = systemInfo.points; 
		systemVisitors.innerText = systemInfo.visitors; 
		systemLastVisited.innerText = daysEllapsed( parseDate(visited), parseDate(lastVisited)); 

		systemInfo.points -= daysEllapsed( parseDate(visited), parseDate(lastVisited))*2;
		systemInfo.lastVisit = visited;

		// console.log("updated:", systemInfo);
	}
}
xmlGetSystemInfo.send();

var infoToggle = document.getElementById("infoToggle");
var info = document.getElementById("info");
info.style.left = "-"+info.clientWidth+"px";

infoToggle.onclick = function(){
	if(info.offsetLeft < 0){
		infoToggle.innerHTML = "x";
		info.style.left = "0px";
	}else{
		infoToggle.innerHTML = "i";
		info.style.left = "-"+info.clientWidth+"px";
	}
}


