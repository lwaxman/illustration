/*
* 
* Laurie Waxman
* Thesis 
* 05.03.16
* 
* The land of Flindall has just been discovered. 
* 
*/

var scale = 1.5;

var deeb = {};
deeb.count = 0; 
deeb.xPos = 0;
deeb.yPos = 0;
deeb.bodyWidth = 100; 
deeb.bodyHeight = 130; 
deeb.speed = 5;
deeb.eyeSize = 20;
deeb.direction = 1;
deeb.fill = "#DEEBEE";
deeb.setup = function(x, y){
	this.xPos = x; 
	this.yPos = y;
	this.eyeSize = random(20,30, false);
	this.bodyWidth += random(-20, 20); 
	this.bodyHeight += random(-20, 20); 
	this.drawBody(x, y);
}
deeb.update = function(){
	this.xPos+=this.speed;
	this.drawBody(this.xPos, this.yPos);
}
deeb.drawBody = function(x, y){
	fill(this.fill);
	pEllipse(x, y-(this.bodyHeight/2), this.bodyWidth, this.bodyHeight);
	this.eyes();
}
deeb.eyes = function(){
	fill("white");
	pEllipse(this.xPos-20, this.yPos-(this.bodyHeight*0.95), this.eyeSize, this.eyeSize);
	pEllipse(this.xPos+20, this.yPos-(this.bodyHeight*0.95), this.eyeSize, this.eyeSize);
	fill("black");
	ellipse(this.xPos-20, this.yPos-(this.bodyHeight*0.95), 2);
	ellipse(this.xPos+20, this.yPos-(this.bodyHeight*0.95), 2);
}

var activeDeebs = 45; 

var objects = [];
for(var oCount=activeDeebs; oCount>0; oCount--){
	var tempDeeb = Object.create(deeb);
	tempDeeb.speed = random(1, 3, false);
	if(random(0,1)<1){
		tempDeeb.speed=-tempDeeb.speed;
	}
	tempDeeb.setup(random(-100,w), random(0,h,false));
	objects.push( tempDeeb );
}

setInterval(function(){
	background();
	objects.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});
	for(var i=0; i<objects.length; i++){
		var tempDeeb = Object.create(deeb);
		tempDeeb.speed = random(1, 3, false);
		if(objects[i].speed>0){
			if(objects[i].xPos > width+objects[i].bodyWidth){
				tempDeeb.setup(-100, random(100, h));
				objects.push( tempDeeb );
				objects.splice(i, 1);
			}
		}else{
			tempDeeb.speed=-tempDeeb.speed;
			if(objects[i].xPos < -100){
				tempDeeb.setup(w+100, random(100, h,false));
				objects.push( tempDeeb );
				objects.splice(i, 1);
			}
		}
		// console.log(objects.length);
		objects[i].update();
	}
}, 33);

