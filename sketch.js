var scale = 1.5;

cup = {}
cup.count = 0; 
cup.xPos = 0;
cup.yPos = 0;
cup.bodyWidth = 0; //random(250,350)/scale;
cup.bodyHeight = 0; //random(200, 500)/scale;
cup.topWidth = 0;
cup.lidHeight = 0;
cup.rimHeight = 0;
cup.lipWidth = 0;
cup.lipSize = 0;
cup.lipAngle = 0;
cup.lipLength = 0;
cup.bW = 0;
cup.w = 0;
cup.coverHeight = 0;
cup.rem = 0;
cup.coverYBottom = 0;
cup.coverYTop = 0;
cup.coverYCenter = 0;
cup.coverWBottom = 0;
cup.coverWTop = 0;
cup.fill = "#FFF";
cup.setup = function(x, y){
	fill(this.fill);
	
	this.count = 0; 
	this.xPos = x; 
	this.yPos = y; 
	
	this.bodyWidth = random(250,350)/scale;
	this.bodyHeight = random(200, 500)/scale;

	this.topWidth = this.bodyWidth*random(0.7, 0.8, false);
	this.lidHeight = this.bodyWidth*random(0.13, 0.2, false);
	this.rimHeight = this.lidHeight*random(0.1, 0.3, false);
	this.lipWidth = this.topWidth*random(0.6,0.8, false);
	this.lipSize = this.lidHeight*random(0.6,0.8, false);
	this.lipAngle = random(0, 360);
	this.lipLength = random(60, 100);

	this.bW = this.bodyWidth*0.7;
	this.w = this.bodyWidth*0.95;

	this.coverHeight = this.bodyHeight*random(0.3,0.5,false); 
	this.rem = this.bodyHeight-this.coverHeight;
	this.coverYBottom = this.rem*random(0.2,0.8,false);
	this.coverYTop = this.coverYBottom+this.coverHeight;
	this.coverYCenter = this.coverHeight/2;
	this.coverWBottom = map(this.yPos-this.coverYBottom, this.yPos, this.yPos-this.bodyHeight, this.bW, this.bodyWidth);
	this.coverWTop = map(this.yPos-this.coverYTop, this.yPos, this.yPos-this.bodyHeight, this.bW, this.bodyWidth);

	this.update(this.xPos, this.yPos);
}
cup.update = function(x, y){
	this.drawBody(x, y, this.bodyWidth, this.bodyHeight);
	this.drawLid(x, y-this.bodyHeight, this.bodyWidth);
}
cup.drawBody = function(x, y, w, h){
	// cylinder
	fill(this.fill);
	topLeft = [x-(w/2), y-h];
	topRight = [x+(w/2), y-h];
	bottomLeft = [x-(this.bW/2), y+5];
	bottomRight = [x+(this.bW/2), y+5]
	pQuad(bottomLeft, topLeft, topRight, bottomRight);
	pEllipse(x, y, this.bW, 100/scale, 0, 190);
	// heat cover
	noFill();
	pEllipse(x, y-this.coverYTop, this.coverWTop, 100/scale, 0, 190);
	pEllipse(x, y-this.coverYBottom, this.coverWBottom, 100/scale, 0, 190);
	pEllipse(x, y-this.coverYBottom-this.coverYCenter+(50/scale), this.coverHeight*0.6, this.coverHeight*0.6);
}
cup.drawLid = function(x, y, w){
	fill(this.fill);
	pEllipse(x, y, w, 70, -20, 210); //lower rim
	pEllipse(x, y-this.rimHeight, w, 50, -20, 210); //upper rim
	topLeft = [x-(w/2)+this.rimHeight, y-this.rimHeight];
	topRight = [x-(this.topWidth/2), y-this.lidHeight];
	bottomLeft = [x+(this.topWidth/2), y-this.lidHeight];
	bottomRight = [x+(w/2)-this.rimHeight, y-this.rimHeight];
	pQuad( topLeft, topRight, bottomLeft, bottomRight);
	pEllipse(x, y-this.lidHeight, this.topWidth, this.lipSize*1.4); //top lip
	pEllipse(x, y-this.lidHeight, this.lipWidth, this.lipSize, this.lipAngle, this.lipAngle+this.lipLength); //inner lip
}

var activeObjects = 20; 

var objects = [];
for(var oCount=activeObjects; oCount>0; oCount--){
	var tempCup = Object.create(cup);
	// tempCup.fill = "red";
	tempCup.setup(100+(oCount*(width/activeObjects)), random(0, height));
	objects.push( tempCup );
}

var count = 0; 
setInterval(function(){
	background();
	objects.sort(function(obj1, obj2){
		return obj1.yPos - obj2.yPos;
	});
	for(var i=0; i<objects.length; i++){
		if(objects[i].count+objects[i].xPos > width+objects[i].bodyWidth){
			objects.splice(i, 1);
			var tempCup = Object.create(cup);
			// tempCup.fill = "blue";
			tempCup.count = 0; 
			tempCup.setup(0, random(0, width));
			objects.push( tempCup );
		}
		objects[i].update(objects[i].count+objects[i].xPos, objects[i].yPos);
		objects[i].count+=3;
	}
}, 33);
