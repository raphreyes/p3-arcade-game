// Enemies our player must avoid
var Enemy = function(laneNumber) {
	// Start enemies at left completely off the game field
	// Start enemy up to 4 widths off-screen
	this.x = (Math.random() * 404) * -1;

	// Assign the enemy lane and speed
	this.lane = laneNumber;
	if(this.lane == 1) {
		this.y = 228;
		this.speed = 1;
	} else {
		if(this.lane == 2) {
			this.y = 145;
			this.speed = 2;
		} else {
			this.y = 60;
			this.speed = 3;
		}
	}
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// Top lane enemies move faster
	this.x = (this.x + this.speed);

	// if the enemy moves off right edge,
	// move them back to left side
	if(this.x > 505) {
		// Move the enemy random distance beyond left edge of board
		this.x = (Math.random() * 404) * -1;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.x = 200;
	this.y = 400;
	this.sprite = "images/char-boy.png";
	this.score = 0;
}

Player.prototype.update = function() {
	// Check for goal
	if (this.y == -10) {
		this.reset();
	}

	// check lane1 enemy
	if (this.y == 236) {
		if (enemy1.x >= this.x - 20 && enemy1.x <= this.x + 20) {
			this.tradgedy();
		}
	}
	// check lane2 enemy
	if (this.y == 154) {
		if (enemy2.x >= this.x - 20 && enemy2.x <= this.x + 20) {
			this.tradgedy();
		}
	}
	//check lane3 enemy
	if (this.y == 72) {
		if (enemy3.x >= this.x - 20 && enemy3.x <= this.x + 20) {
			this.tradgedy();
		}
	}
	// console.log(this.score);
}

Player.prototype.handleInput = function(input) {
	this.condition = "normal";
	// move player up unless they are at the top
	if (input == "up" && this.y > -10) {
		this.y = this.y - 82;
	}
	// move player down unless they are at the bottom
	if (input == "down" && this.y < 400) {
		this.y = this.y + 82;
	}
	// move player left unless they are at the left edge
	if (input == "left" && this.x > -2) {
		this.x = this.x - 101;
	}
	// move player right unless they are at the right edge
	if (input == "right" && this.x < 402) {
		this.x = this.x + 101;
	}
	// console.log("player:" + this.x, this.y, this.condition);
}

Player.prototype.render = function() {
	// if player collides with enemy
	if (this.condition == "ouch") {
			this.sprite = "images/char-boy-r45.png";
	}

	if (this.condition == "win") {
			this.sprite = "images/char-boy-gold.png";
	}

	if (this.condition == "normal") {
		this.sprite = "images/char-boy.png";
	}

	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	console.log(this.score);
	scr.fillStyle = "#000";
	scr.font = "bold 24px sans-serif";
	scr.fillText = (this.score, 24, 48);

}

Player.prototype.tradgedy = function() {
	// knock player down if there is collision
	this.condition = "ouch";
	var penalty =  player.y + 82;
	setTimeout(function(){
		player.y = player.y + 6;
		console.log(player.y);
		player.condition = "normal";
		player.y =  penalty;
	}, 250)
	player.score =  player.score - 1;
}


// Player reaches top, reset to botom
Player.prototype.reset = function() {
	this.condition = "win";
	setTimeout(function(){
		player.y = 400;
		player.condition = "normal"
	}, 1000)
	player.score = player.score + .5;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

// Create enemy with lane number
allEnemies = [
	enemy1 = new Enemy(1),
	enemy2 = new Enemy(2),
	enemy3 = new Enemy(3)
]


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
