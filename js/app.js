// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += speed*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-cat-girl.png'
};

Player.prototype.update = function(dt) {
  this.x += speed*dt
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed){
  if(keyPressed == 'up' && y < 500){
    this.y += 50;
  }
  if(keyPressed == 'down' && y > 100){
    this.y -= 50;
  }
  if(keyPressed == 'left' && x > 0){
    this.x -= 50;
  }
  if(keyPressed == 'right' && x < 400){
    this.x += 50;
  }
};

Player.prototype.restart = function(){
  this.x = 303;
  this.y = 50;
  this.speed = 50;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

(function createEnemies(){
  allEnemies.push(new Enemy(20, 100, 2));
  allEnemies.push(new Enemy(-40, 400, 3));
  allEnemies.push(new Enemy(160, 300, 5));
  allEnemies.push(new Enemy(-110, 100, 1));
  allEnemies.push(new Enemy(-40, 200, 4));
  allEnemies.push(new Enemy(20, 300, 1));
  allEnemies.push(new Enemy(360, 200, 3));
  allEnemies.push(new Enemy(-150, 400, 6));
}());

var player = new Player(303, 50, 50);


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
