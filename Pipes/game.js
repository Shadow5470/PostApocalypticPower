'use strict'
alert("Welcome to the hydropower plant. You need to redirect the water through the pipes to make sure that it can run to the hydropower station. Make sure that you use every pipe!")
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

class Batch {
	list = [];

	constructor(game) {
		this.game = game;
	}

	add(object) {
		this.list.push(object);
		//console.log(this.list);
	}

	draw() {
		this.game.ctx.clearRect(0, 0, this.game.canvasSize, this.game.canvasSize);
		for (let each in this.list) {
			this.list[each].draw();
		}
	}
}


class Progress {
	correctPipes = 0;
	winEvent = new Event("game_won");

	constructor(game) {
		this.game = game;
		this.pipeNumber = game.map.length;
	}

	init(obj) {
		if (obj.state === obj.correctState) {
			this.add();
		}
	}

	add() {
		this.correctPipes++;
		this.checkProgress();
	}

	sub() {
		this.correctPipes--;
		this.checkProgress();
	}

	checkProgress() {
		let percentage = this.correctPipes / this.pipeNumber * 100;
		console.log("progress: ", percentage, "%");

		if (percentage === 100) {
			//window.alert("game won");
			document.dispatchEvent(this.winEvent);
			this.game.evaluateClick = function() {
				console.log("game already won");
			};
		}
	}
}


class Game {
	spriteSheet = new Image()
	pipeList = {}

	constructor(id, spriteSheetSrc, map, gameloop) {
		this.map = map;
		this.canvas = document.getElementById(id);
		this.inteli_resize()
		this.calculateXY()
		this.ctx = this.canvas.getContext("2d");
		this.batch = new Batch(this);
		this.progress = new Progress(this);

		//spriteSheetSrc = "spritesheet.png"

		let game = this;
		this.spriteSheet.onload = function() {
			gameloop(game);
		}

		this.spriteSheet.src = spriteSheetSrc;
		this.initClick();
	}

	inteli_resize() {
		let bodyHeight = document.body.clientHeight;
		let bodyWidth = document.body.clientWidth;

		if (bodyHeight < bodyWidth) {
			this.canvasSize = bodyHeight;
		}else {
			this.canvasSize = bodyWidth;
		}

		this.canvas.width = this.canvasSize;
		this.canvas.height = this.canvasSize;
	}

	calculateXY() {
		let boundingRect = this.canvas.getBoundingClientRect();
		this.y = document.scrollY + boundingRect.top;
		this.x = document.scrollX + boundingRect.left;
	}

	loadMap(map) {
		for (let each of this.map) {
			new Pipe(this, each[0], each[1]);
		}
	}

	refresh() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	registerClick(pipe) {
		this.pipeList[pipe.position] = pipe;
		//console.log(this.pipeList);
	}

	initClick() {
		let game = this;
		this.canvas.addEventListener("click", function(event) {
			game.evaluateClick(event);
		}, false)
	}

	calculateClicked(event) {
		let canvasBound = this.canvas.getBoundingClientRect()
		let x = event.clientX - canvasBound.x
		let y = event.clientY - canvasBound.y
		let pipeTileSize = this.canvasSize / 4;
		let positionX = Math.trunc(x / pipeTileSize);
		let positionY = Math.trunc(y / pipeTileSize);
		let position = [positionX, positionY];
		return this.pipeList[position];
	}

	evaluateClick(event) {
		let pipe = this.calculateClicked(event);
		if (pipe != undefined) {
			pipe.rotate();
			this.batch.draw();
			pipe.checkState();
		}
	}
}


class Background {
	constructor(game) {
		this.game = game;
		this.game.batch.add(this);
	}

	draw() {
		this.game.ctx.drawImage(this.game.spriteSheet, 0, 150, 500, 500, 0, 0, this.game.canvasSize, this.game.canvasSize);
	}
}


class Pipe {
	constructor(game, position, correctState) {
		this.game = game;
		this.correctState = correctState;
		this.determineType();
		this.incorrectState = this.calculateNextState(this.correctState);
		this.size = Math.trunc(game.canvasSize / 4);
		this.position = position;
		this.x = this.size * position[0];
		this.y = this.size * position[1];
		this.calculateShuffel();
		game.progress.init(this);
		game.batch.add(this);
		game.registerClick(this);
	}

	determineType() {
		if (this.correctState < 4) {
			this.type = "corner";
		}else {
			this.type = "horizontal";
		}
	}

	calculateShuffel() {

		if (this.type==="corner") {
			this.state = getRandomInt(0, 4);
		} else {
			this.state = getRandomInt(4, 6);
		}
	}

	checkState() {
		if (this.state === this.correctState) {
			this.game.progress.add();
		}

		if (this.state === this.incorrectState) {
			this.game.progress.sub();
		}

		//console.log(this.game.progress.correctPipes);
	}

	calculateNextState(state) {
		let nextState;

		if (this.type === "corner") {
			if(state === 3) {
				nextState = 0;
			}else {
				nextState = state + 1;
			}
		}

		if (this.type === "horizontal") {
			if (state === 5) {
				nextState = 4
			}else {
				nextState = state + 1;
			}
		}

		return nextState;
	}

	rotate() {
		this.state = this.calculateNextState(this.state)
	}

	draw() {
		let ctx = this.game.ctx
		let image = this.game.spriteSheet;
		let imgSize = image.width /6;
		ctx.drawImage(image, imgSize * this.state, 0, imgSize, imgSize, this.x, this.y, this.size, this.size);
		//console.log("drew in", this.x, this.y, this.size);
	}
}

function gameLoop(game) {

	new Background(game);

	/*for (let each of [0, 1, 2, 3]) {
		for (let one of [0, 1, 2, 3]) {
			new Pipe(game, 2, [each, one]);
		}
	}*/

	game.loadMap();
	game.batch.draw();
	console.log(game.progress.correctPipes);
}

function main() {
	let mapNum = getRandomInt(0, mapEasy.length);
	let gameMap = mapEasy[mapNum];
	let game = new Game("game", "with_back.svg", gameMap, gameLoop)
}

window.onload = main;
