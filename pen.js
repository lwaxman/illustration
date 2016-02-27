/*
* 
* Laurie Waxman
* 26.02.16
* 
* Felt-tip pen drawing functions for myself, for use in thesis. 
*
*/

var canvas = document.getElementById("main");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var random = function(min, max, r){
	if(r === undefined) r = true; 
	if(r){
		return rand = Math.round( Math.random()*(max-min)+min );
	}else{
		return rand = Math.random()*(max-min)+min;
	}
}

var deg = function(d){
	return d * Math.PI/180;
}

var fill = function(cl){
	c.fillStyle = cl;
	// c.strokeStyle = "rgba(255,255,255,0)";
}

var noFill = function(){
	c.fillStyle = "rgba(255,255,255,0)";
}

var stroke = function(cl){
	c.strokeStyle = cl;
}

var strokeWidth = function(){
	c.lineWidth = random(2,3,false);
}

var pLine = function(x1, y1, x2, y2){
	strokeWidth();
	var offset = 2; 
	c.beginPath();
	c.moveTo(x1, y1);
	c.lineTo(x1+((x2-x1)*0.33)+random(-offset, offset), y1+((y2-y1)*0.33)+random(-offset, offset));
	c.lineTo(x1+(2*(x2-x1)*0.33)+random(-offset, offset), y1+(2*(y2-y1)*0.33)+random(-offset, offset));
	c.lineTo(x2, y2);
	c.stroke();
	c.closePath();
}

var pRect = function(x, y, w, h){
	pLine(x, y, x+w, y);
	pLine(x+w, y, x+w, y+h);
	pLine(x+w, y+h, x, y+h);
	pLine(x, y+h, x, y);
}

var pEllipse = function(x, y, d, a){
	if(a===undefined) a = 360;
	var r = d/2;
	var lastx = x; 
	var lasty = y;
	c.beginPath();
	c.moveTo(x+r, y);
	if(r>25 && r<=100){
		inc = 15;
		offset = 1;
	}else if(r<=25){
		inc = 20;
		offset = 0.6;
	}else{
		inc = 10; 
		offset = 2; 
	}

	for(i=0; i<a; i+=inc){
		strokeWidth();
		centx = x + (r * Math.cos( deg(i) )) + random(-offset, offset);
		centy = y + (r * Math.sin( deg(i) )) + random(-offset, offset);
		c.lineTo(centx, centy);
		x = lastx; 
		y = lasty;
	}
	if(a===360){
		c.lineTo(x+r, y);	
	}
	c.fill();
	c.stroke();
	c.closePath();
}

