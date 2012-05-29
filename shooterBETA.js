//**********************************
//Shooter.js Created by Parker Bourassa
//**********************************
//TODO privatize more variables.

//var static{//Change these to not be global 
var player;// = addRect(200, 200, 64, 64, '#FFC02B');
var target;// = addRect(30,30,64,64,'#01fe31');
var red ;//= addRect((400-30),(300-30),30,30,'#fd1131');

var score ;//= 0;
var then ;//= Date.now();
var start = Date.now();
var bullet = [];
var enemy = [];

//BOX STUFF
function Box() {
	this.ready = false;
	this.pics = [];
	this.state = 0;
	this.x = 0;
   	this.y = 0;
   	this.w = 10;
   	this.h = 10;
	this.fill = "#fff";
	var $this = this;
	this.load = function(array){
		var foo = [];
		for(var i = 0; i < array.length; i++){
			foo.push(loadPic(array[i]));
		}
		$this.pics = foo;
		$this.ready = true;
	};
	this.draw = function(ctx) {
		if (this.ready) {
			if(this.state < this.pics.length){
				display.ctx.drawImage(this.pics[this.state], this.x - this.w/2, this.y-this.h/2);
				this.state += 1;
			}
			else{
				display.ctx.drawImage(this.pics[this.state-1], this.x - this.w/2, this.y-this.h/2);
				this.state = 0;
			}
		}
		else{
        		display.ctx.fillStyle = this.fill;
        		display.ctx.fillRect(this.x-this.w/2, this.y-this.h/2, this.h, this.w);
		}
	};
}

function addRect(x, y, w, h, fill) {
    var rect = new Box();
    rect.x = x;
    rect.y = y;
    rect.w = w;
    rect.h = h;
    rect.fill = fill;
    return rect;
}

//BULLET STUFF
function Bullet(){
	var speed = 10;
	this.move = function(){
		this.x += speed;
	};
}
Bullet.prototype = new Box();

function shoot(x,y){
	var foo = new Bullet();
	foo.x = x;
	foo.y = y;
	return foo;
}

//ENEMY STUFF
function Ship(){
	this.fill = "#666";
	this.wait = 1;
	this.position = {x:430,y:320};
	this.xFreq = 1;//decimals?
	this.xAmp = 60;
	this.yFreq = 1;
	this.yAmp = 60;
	this.action = {x:this.xFreq, y:this.yFreq};
	this.update = function(){
		//action = {x:this.xFreq, y:this.yFreq};
		if (this.x < this.position.x -this.xAmp){
			this.action.x = this.xFreq;
		}
		if (this.x > this.position.x +this.xAmp){
			this.action.x = -this.xFreq;
		}
		if (this.y < this.position.y -this.yAmp){
			this.action.y = this.yFreq;
		}
		if (this.y > this.position.y +this.yAmp){
			this.action.y = -this.yFreq;
		}
		this.y += this.action.y;
		this.x += this.action.x;
	};
	this.kill = function(){
		
	};
}
Ship.prototype = new Box();

function createShip(x,y,w,h,wait,position,xFreq,xAmp,yFreq,yAmp){
	var foo = new Ship();
	foo.x = x;
   	foo.y = y;
   	foo.w = w;
   	foo.h = h;
	foo.wait = wait;
	foo.xFreq = xFreq;//decimals?
	foo.xAmp = xAmp;
	foo.yFreq = yFreq;
	foo.yAmp = yAmp;
	foo.action = {x:xFreq, y:yFreq};
	return foo;
}

//bullet[0] = new Box;//shoot(1,2);//new Bullet(100,100);//Why is this neccessary?

function loadPic(a){
	var foo;
	foo = new Image();
	foo.src = a;
	return foo;
}

//Image Stuff
//var bgReady = false;
//var bgImage = loadPic("STAGE.png");
//var coinLinks = ["collectable.png"];
//var links = ["player.png"];
//var badLinks = ["enemy.png"];

//target.load(coinLinks);
//player.load(links);
//red.load(badLinks);

function stuffToDraw(){
	if (game == 1){
		display.ctx.fillStyle = "#11f";
		//bgReady=true;
		if (false) {
			display.ctx.drawImage(bgImage, 0, 0);
		}
		if (true) {
			display.ctx.fillRect(0, 0, display.width, display.height);
		}
		//ENEMIES
		for (i=0;i<enemy.length;i++){
			if (enemy[i] instanceof Box){
				enemy[i].draw(display.ctx);
			}
		}	
		player.draw(display.ctx);
		//BULLETS
		for (i=0;i<bullet.length;i++){
			if (bullet[i] instanceof Box){
				bullet[i].draw(display.ctx);
			}
		}
		display.ctx.fillStyle = "#000";//text
		display.ctx.font = 'bold 15px sans-serif';
        display.ctx.textAlign = 'left';
		display.ctx.fillText("Score:"+score,2,12);
	}
	if (game ===0){
		display.ctx.fillStyle = "#f70";//background
		display.ctx.fillRect(50, 50, 300, 200);
		display.ctx.fillStyle = "#5fc23f";//Button
		display.ctx.fillRect(100, 150, 200, 70);
		display.ctx.fillStyle = "#000";//text
		display.ctx.font = 'bold 50px sans-serif';
		display.ctx.textAlign = 'center';
		if (score == 0){
			display.ctx.fillText("Play",200,200);
			display.ctx.fillText("Shooter",200,120);//make these boxes
		}
		if (score > 0){
			display.ctx.fillText("Again",200,200);
			display.ctx.fillText("Score:"+score,200,120);
		}
	}
};



function boxCollide(box1,box2){
	if (
		box1.x - box1.w/2 <= box2.x + box2.w/2
		&& box2.x - box2.w/2 <= box1.x + box1.w/2
		&& box1.y - box1.w/2 <= box2.y + box2.h/2
		&& box2.y - box2.w/2 <= box1.y + box1.h/2
	){
	return true;
	}
return false;
};

var update = function (modifier){
	//Player movement
	if (38 in keysDown && player.y > player.h/2) {  //up
		player.y -=256*modifier;
	}
	if (40 in keysDown && player.y < display.height-player.h/2) {  //down
		player.y +=256*modifier;
	}
	if (37 in keysDown && player.x > player.w/2) {  // <-
		player.x -=256*modifier;
	}
	if (39 in keysDown && player.x < display.width-player.w/2) {  // ->
		player.x +=256*modifier;
	}
	if (32 in keysDown) {  // Space Bar
		bullet.push(shoot(player.x,player.y));//Make discrete
	}
	if (player.y < player.h/2) {  //prevent jumping off screen
		player.y = player.h/2;
	}
	if (player.y > display.height-player.h/2) {  //down
		player.y = display.height-player.h/2;
	}
	if (player.x < player.w/2) {  // <-
		player.x =player.w/2;
	}
	if (player.x > display.width-player.w/2) {  // ->
		player.x = display.width-player.w/2;
	}
	var now = Date.now();
	var clock = parseInt(Math.round((now - start)/1000));//Math.round((Date.now - start)/1000);	
	
	for (i=0;i<enemy.length;i++){
		if (enemy[i] instanceof Box && enemy[i].wait <= clock){
			enemy[i].update();
		}
		for (n=0;n<bullet.length;n++){
			if (bullet[n] instanceof Box && boxCollide(bullet[n],enemy[i])){
				score += 1;
				//enemy[0].kill;
			}
			if(bullet[n] instanceof Box){
				bullet[n].move();
				//TODO kill offscreen bullets
			}
		}
	}

	//if (now > then){
		$("debug").innerHTML = clock;//(Math.round((now - start)/1000));
	//}
};

function myDown(e) {//100, 150, 200, 70
	getMouse(e);
	if ((display.my > 150 && display.my < 230 && display.mx>100 && display.mx < 300) && game==0){
		reset();
	}
		
}
$("canvas").onmousedown = myDown;

function frame (){
	if (game == 1){
		var now = Date.now();
		var delta = now - then;
		update(delta/1000);
		display.draw();
		then = now;
		//$("debug").innerHTML = 
	}
	if (game == 0){
		foo = window.clearInterval(foo);
		//alert(" Score: "+score);
		//game = 1;
		display.draw();
		//reset();
		
	}
};

function reset(){ //TODO fix this by abstracting from global
	player = addRect(200,150,64,64,'#F02FB6');
	target = addRect(330,220,30,30,'#01fe31');
	enemy.push(createShip(800,60,30,30,5,{x:430,y:320},1,60,1,60));
	enemy.push(createShip(800,260,30,30,1,{x:430,y:320},1,60,1,60));
	//level();
	//enemy.push(new Ship(800,600,30,30,5,{x:430,y:320},1,60,1,60));
	//enemy.push(new Ship(800,600,30,30,5,{x:430,y:320},1,60,1,60));
	game = 1;// 1 for in-progress, 0 for menu
	score = 0;
	then = Date.now();
	foo = setInterval(frame, 50);//framerate
	bgImage.onload = function () {
		bgReady = true;
	};
	target.load(coinLinks);
	player.load(links);
	red.load(badLinks);
}
var game = 0;
var foo = setInterval(frame, 1);//this doesn't effect framrate, only init.
display.init();
display.draw();
reset();
//document.getElementById("debug").innerHTML = (bullet[0] instanceof Box);