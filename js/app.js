// Enemies our player must avoid
var Enemy = function(laneNumber) {
    // Variables applied to each of our instances go here
	// Make a fast or slow enemy

	// Start enemies at left completely off the game field
	// Start enemy up to 4 widths off-screen
	this.x = (Math.random() * 404) * -1;
	// Assign the lane and speed
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
	console.log(this.y);

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
		// Move the enemy back beyond left edge of board
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
		this.score = this.score + 10;
		this.y = 400;

	}

	// check lane1 enemy
	if (this.y == 236 && this.x < enemy3.x + 40 && this.x > enemy3.x - 40) {
		// this.tradgedy();
	}

	if (this.y == 154 && this.x < enemy2.x + 40 && this.x > enemy3.x - 40) {
		//tradgedy
	}

	if (this.y == 72 && this.x < enemy1.x + 40 && this.x > enemy3.x - 40) {
		//tradgedy
	}
	// console.log(this.score);
}

Player.prototype.handleInput = function(input) {

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

	player.update()
}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.tradgedy = function() {

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
