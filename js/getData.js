/*
* Laurie Waxman
* Thesis 
* 28.03.16
*/


var systemHealth = document.getElementById("system_health");
var systemVisitors = document.getElementById("system_visitors");
var systemLastVisited = document.getElementById("system_date");

var thisDeebInfo = document.getElementById('deeb');
var thisDeebName = document.getElementById('deeb_name');
var thisDeebHealth = document.getElementById('deeb_health');

var systemInfo; 
var points = 100;

var xmlGetSystemInfo = new XMLHttpRequest();
xmlGetSystemInfo.open('GET', 'assets/creatures.json');
xmlGetSystemInfo.onreadystatechange = function() {
	if(xmlGetSystemInfo.readyState==4){
		var myData = JSON.parse(xmlGetSystemInfo.responseText);
		systemInfo = myData.info;
		systemInfo.visitors += 1; 
		systemInfo.points -= 0.5;

		console.log(systemInfo);

		systemHealth.innerText = systemInfo.points; 
		systemVisitors.innerText = systemInfo.visitors; 
		systemLastVisited.innerText = systemInfo.lastVisit; 

		points = systemInfo.points;
		if(points<0) points = 0; 
		else if(points>200) points = 200; 
	}
}
xmlGetSystemInfo.send();
