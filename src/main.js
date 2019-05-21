

var friction = 2;

// gameBoard is the object that houses the canvas
var gameBoard = {
	
	canvas : document.createElement("canvas"),
	// Initialize the gameBoard
	initialize : function(){
		this.canvas.setAttribute("style", "margin:auto; display:block");
		document.body.appendChild(this.canvas);
		this.gc = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.keys = [];
		// Add action listeners for the mouse
		window.addEventListener('mousemove', function (e) {
     		gameBoard.mouseX = e.pageX;
      		gameBoard.mouseY = e.pageY;
    	});
    	window.addEventListener('keyup', function (e) {
     		gameBoard.keys = gameBoard.keys.filter(item => item != e.keyCode);
    	});
    	window.addEventListener('keydown', function (e) {
    		if(!gameBoard.keys.includes(e.keyCode)){
     			gameBoard.keys.push(e.keyCode);
     		}
    	});
	},
	// Set the desired resolution for the canvas, in width over height
	setResolution : function(res){
		this.resolution = res;
	},
	// Draw static objects
	draw : function(){
		this.gc.fillStyle = '#000000';
		this.gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
	},
	// Resize the canvas depending on how much space is available
	resize : function(){
		// If the width to height ratio is larger than desired, use height as the basis for size
		if((window.innerWidth / (window.innerHeight - 20)) > this.resolution){
			this.canvas.width = (window.innerHeight - 20) * this.resolution;
			this.canvas.height = window.innerHeight - 20;
		}
		// If the width to height ratio is smaller than desired, use width as the basis for size
		else if((window.innerWidth / (window.innerHeight - 20)) < this.resolution){
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerWidth / this.resolution;
		}
		// If the width to height ratio is the same as the desired ratio, both can be used
		else{
			this.canvas.width = window.innerWidth;
			this.canvas.height = (window.innerHeight - 20);
		}
	},
	// Clear all the drawing in the gameBoard
	clear : function(){
		this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}

gameBoard.initialize();
gameBoard.setResolution(4 / 3);

let walls = [createWall(20, 20, 5, 30), createWall(20, 20, 30, 5)];

// Define a GameObject for all interactable elements of the game
function GameObject(){
	this.deltaX = 0;
	this.deltaY = 0;
	this.x = 0;
	this.y = 0;
	this.width = 10;
	this.height = 10;
	this.draw = function(){};
	this.move = function(){};
	this.update = function(){};
}

// Create a Player
function initPlayer(){
	let player = new GameObject();
	player.y = gameBoard.canvas.height / 2;
	player.move = function(){
		var topSpeed = 50;
		if(gameBoard.keys.includes(38) && this.deltaY > -topSpeed){
			this.deltaY += -1;
		}
		if(gameBoard.keys.includes(37) && this.deltaX > -topSpeed){
			this.deltaX += -1;
		}
		if(gameBoard.keys.includes(40) && this.deltaY < topSpeed){
			this.deltaY += 1;
		}
		if(gameBoard.keys.includes(39) && this.deltaX < topSpeed){
			this.deltaX += 1;
		}
		if(!(gameBoard.keys.includes(38) || gameBoard.keys.includes(40))){
			this.deltaY -= Math.sign(this.deltaY) * friction;
		}
		if(!(gameBoard.keys.includes(37) || gameBoard.keys.includes(39))){
			this.deltaX -= Math.sign(this.deltaX) * friction;
		}
	}
	player.draw = function(gc){
		gc.fillStyle = "#FF0000";
		gc.fillRect(this.x, this.y, this.width, this.height);
	}
	player.update = function(gc){
		this.move();
		this.draw(gc);
		console.log(this.deltaX);
		this.x += this.deltaX;
		this.y += this.deltaY;
	}
	return player;
}

function createWall(x, y, width, height){
	let wall = new GameObject();
	wall.x = x;
	wall.y = y;
	wall.width = width;
	wall.height = height;
	wall.draw = function(gc){
		gc.fillStyle = "#555555";
		gc.fillRect(this.x, this.y, this.width, this.height);
	}
	return wall;
}

// Update the gameBoard
function update(){
	gameBoard.clear();
	gameBoard.resize();
	gameBoard.draw();
	player.update(gameBoard.gc);
	for(var i = 0; i < walls.length; i ++){
		walls[i].draw(gameBoard.gc);
	}
}

let player = initPlayer();
setInterval(update, 20);
