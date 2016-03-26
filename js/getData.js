/*
* 
*  
*
*
*/

var points = 100;

if(points>200){ points=200; }
else if(points<0){ points=0; }

var today = new Date();

var system = [];
system[0] = today; 
system[1] = points;

var system = {};
system.points = 100;
system.deebsAlive = 100; 
system.deebsDead = 0; 
system.visitors = 0; 
system.lastVisit = today; 

var lifeObject = JSON.stringify(system);
