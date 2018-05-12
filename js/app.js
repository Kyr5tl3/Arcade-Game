// Enemies our player must avoid
var Enemy = function(x , y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.random()*301|0;
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
    if(this.x < 505){
      this.x += this.speed * dt;
    }
    else{this.x = -50};
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x , y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt) {
  if(this.y == 0){
    this.restart();
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed){

  if(keyPressed == 'up' && 100 > this.y <= 400){
    this.y -= 50;
  }
  if(keyPressed == 'down' && 400 < this.y > 100){
    this.y += 50;
  }
  if(keyPressed == 'left' && this.x > -50){
    this.x -= 50;
  }
  if(keyPressed == 'right' && this.x < 400){
    this.x += 50;
  }
};

Player.prototype.restart = function(){
  this.x = 200;
  this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

(function createEnemies(){
  allEnemies.push(new Enemy(100, 100));
  allEnemies.push(new Enemy(-40, 300));
  allEnemies.push(new Enemy(160, 300));
  allEnemies.push(new Enemy(-110, 100));
  allEnemies.push(new Enemy(-40, 200));
  allEnemies.push(new Enemy(20, 300));
  allEnemies.push(new Enemy(360, 200));
  allEnemies.push(new Enemy(-150, 100));
}());

var player = new Player(200,400);


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
