'use strict'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

class Game {
	spriteSheet = new Image()
	pipeList = {}

	constructor(id, spriteSheetSrc, gameloop) {
		this.canvas = document.getElementById(id);
		this.inteli_resize()
		this.calculateXY()
		this.ctx = this.canvas.getContext("2d");

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

	refresh() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	registerClick(pipe) {
		this.pipeList[pipe.position] = pipe;
		console.log(this.pipeList);
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
		let positionX = Math.trunc(x/pipeTileSize);
		let positionY = Math.trunc(y/pipeTileSize);
		let position = [positionX, positionY];
		return this.pipeList[position];
	}

	evaluateClick(event) {
		let pipe = this.calculateClicked(event);
		pipe.rotate();
		pipe.draw();
	}
}


class Pipe {
	constructor(game, type, position) {
		this.game = game;
		this.type = type;
		this.size = game.canvasSize / 4;
		this.position = position;
		this.x = this.size * position[0];
		this.y = this.size * position[1];
		this.calculate_shuffel()
		this.draw();
		game.registerClick(this);
	}

	calculate_shuffel() {

		if (this.type==="corner") {
			this.state = getRandomInt(0, 4);
		} else {
			this.state = getRandomInt(4, 6);
		}
	}

	rotate() {
		if(this.type==="corner") {
			if(this.state === 3) {
				this.state = 0;
			}else {
				this.state++;
			}
		}else {
			if(this.state === 5) {
				this.state = 4
			}else {
				this.state++;
			}
		}
	}

	draw() {
		let ctx = this.game.ctx
		let image = this.game.spriteSheet;
		let imgSize = image.width /6;
		ctx.drawImage(image, imgSize * this.state, 0, imgSize, imgSize, this.x, this.y, this.size, this.size);
		console.log("drew in", this.x, this.y, this.size);
	}
}

function gameLoop(game) {

	for (let each of [0, 1, 2, 3]) {
		for (let one of [0, 1, 2, 3]) {
			new Pipe(game, "corner", [each, one]);
		}
	}
}

function main() {
	let game = new Game("game", "spritesheet.png", gameLoop)
}

window.onload = main;
