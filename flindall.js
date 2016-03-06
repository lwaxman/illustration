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

/////////////////////////////////////////////////////////////////////////////////////////////////// DEEBS

var deeb = {};
deeb.count = 0; 
deeb.xPos = 0;
deeb.yPos = 0;
deeb.bodyWidth = 100; 
deeb.bodyHeight = 130; 
deeb.startHeight = 130; 
deeb.slugPeriod = 60;
deeb.speed = 5;
deeb.eyeSize = 20;
deeb.direction = 1;
deeb.mouthWidth = 10;
deeb.fill = "#DEEBEE";
deeb.setup = function(x, y){
	this.count=random(0,10,false);
	this.xPos = x; 
	this.yPos = y;
	this.eyeSize = random(20,30, false);
	this.mouthWidth = random(5,15);
	this.bodyWidth += random(-20, 20); 
	this.bodyHeight += random(-20, 20); 
	this.slugPeriod = random(40,70);
	this.drawBody(x, y);
}
deeb.update = function(){
	this.count++;
	this.xPos+=this.speed;
	this.drawBody(this.xPos, this.yPos);
	var amplitude = 7;
	var y = Math.sin( (this.count/this.slugPeriod*2*Math.PI)+Math.PI ) * amplitude;
	console.log(this.bodyHeight, y);
	this.bodyHeight = this.startHeight+y;
}
deeb.drawBody = function(x, y){
	fill("#DEEBEE");
	pEllipse(x, y-(this.bodyHeight/2), this.bodyWidth, this.bodyHeight);
	fill("#d3e4e8");
	fEllipse(x, y-(this.bodyHeight/2), this.bodyWidth*0.8, this.bodyHeight*0.9);
	// fill("red");
	fill("#DEEBEE");
	fRect(x-(this.bodyWidth/2), y-(this.bodyHeight/2), this.bodyWidth, this.bodyHeight/2);
	fill("#d3e4e8");
	fRect(x-(this.bodyWidth*0.8/2), y-(this.bodyHeight/2), this.bodyWidth*0.8, this.bodyHeight/2);

	pLine(x-(this.bodyWidth/2), y-(this.bodyHeight/2), x-(this.bodyWidth/2), y);
	pLine(x+(this.bodyWidth/2), y-(this.bodyHeight/2), x+(this.bodyWidth/2), y);
	pLine(x-(this.bodyWidth/2),y,x+(this.bodyWidth/2),y)
	this.face();
}
deeb.face = function(){
	fill("white");
	pEllipse(this.xPos-20, this.yPos-(this.bodyHeight*0.95), this.eyeSize, this.eyeSize);
	pEllipse(this.xPos+20, this.yPos-(this.bodyHeight*0.95), this.eyeSize, this.eyeSize);
	fill("black");
	ellipse(this.xPos-20, this.yPos-(this.bodyHeight*0.95), 2);
	ellipse(this.xPos+20, this.yPos-(this.bodyHeight*0.95), 2);


	pLine(this.xPos-this.mouthWidth, this.yPos-(this.bodyHeight*0.8), this.xPos+this.mouthWidth, this.yPos-(this.bodyHeight*0.8))
}

/////////////////////////////////////////////////////////////////////////////////////////////////// MUNCH

var munch = {};
munch.count = 0; 
munch.xPos = 0;
munch.yPos = 0;
munch.bodyWidth = 100; 
munch.bodyHeight = 130; 
munch.startHeight = 130; 
munch.slugPeriod = 60;
munch.speed = 5;
munch.eyeSize = 20;
munch.direction = 1;
munch.fill = "#DCEDB2";
munch.setup = function(x, y){
	this.count=random(0,10,false);
	this.xPos = x; 
	this.yPos = y;
	this.eyeSize = random(20,30, false);
	this.bodyWidth += random(-20, 20); 
	this.bodyHeight += random(-20, 20); 
	this.slugPeriod = random(40,70);
	this.drawBody(x, y);
}
munch.update = function(){
	this.count++;
	this.xPos+=this.speed;
	this.drawBody(this.xPos, this.yPos);
	var amplitude = 7;
	var y = Math.sin( (this.count/this.slugPeriod*2*Math.PI)+Math.PI ) * amplitude;
	console.log(this.bodyHeight, y);
	this.bodyHeight = this.startHeight+y;
}
munch.drawBody = function(x, y){
	fill(this.fill);
	pEllipse(x, y-(this.bodyHeight/2), this.bodyWidth, this.bodyHeight);
	fRect(x-(this.bodyWidth/2), y-(this.bodyHeight/2), this.bodyWidth, this.bodyHeight/2);
	pLine(x-(this.bodyWidth/2), y-(this.bodyHeight/2), x-(this.bodyWidth/2), y);
	pLine(x+(this.bodyWidth/2), y-(this.bodyHeight/2), x+(this.bodyWidth/2), y);
	pLine(x-(this.bodyWidth/2),y,x+(this.bodyWidth/2),y)
	this.eyes();
}
munch.eyes = function(){
	fill("white");
	pEllipse(this.xPos-20, this.yPos-(this.bodyHeight*0.95), this.eyeSize, this.eyeSize);
	pEllipse(this.xPos+20, this.yPos-(this.bodyHeight*0.95), this.eyeSize, this.eyeSize);
	fill("black");
	ellipse(this.xPos-20, this.yPos-(this.bodyHeight*0.95), 2);
	ellipse(this.xPos+20, this.yPos-(this.bodyHeight*0.95), 2);
}


/////////////////////////////////////////////////////////////////////////////////////////////////// OBJECTS

var activeDeebs = 40; 

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
		if(objects[i].speed>0){
			if(objects[i].xPos > width+objects[i].bodyWidth){
				objects[i].xPos = -100; 
			}
		}else{
			if(objects[i].xPos < -100){
				objects[i].xPos = w+100; 
			}
		}
		objects[i].update();
	}
}, 33);

