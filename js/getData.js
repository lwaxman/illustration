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

var life = [];
life[0] = today; 
life[1] = points;

var lifeObject = JSON.stringify(life);