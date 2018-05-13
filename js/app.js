//Scorecard Variables
var points = 0;
var gemBlueTotal = 0;
var gemGreenTotal = 0;
var gemOrangeTotal = 0;

// Enemies our player must avoid
var Enemy = function(x , y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random()*301|0;
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
  var thePlayer = this;
  if(this.y == 0){
    points += 100;
    this.points();
    this.restart();
    newEnemy();
  };

  allEnemies.forEach(function(enemy){
    var xPosition = Math.abs(player.x - enemy.x);
    var yPosition = Math.abs(player.y - enemy.y);
    if(xPosition<=50 && yPosition<=25){
        thePlayer.restart();
        if($('ul.lives li').length > 0){
          $('ul.lives li:last-child').remove();
        }
        else{player.gameOver();}
    }});
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed){

  if(keyPressed == 'up' && 100 > this.y <= 400){
    this.y -= 50;
  }
  if(keyPressed == 'down' && this.y < 400){
    this.y += 50;
  }
  if(keyPressed == 'left' && this.x >= 50){
    this.x -= 50;
  }
  if(keyPressed == 'right' && this.x < 400){
    this.x += 50;
  }
};

//adding of points

Player.prototype.points = function(){
  $('h3.points').replaceWith('<h3 class="points">' + points + '</h3>')
}
//restart - player to return to Point of Origin
Player.prototype.restart = function(){
  this.x = 200;
  this.y = 400;
};

Player.prototype.gameOver = function(){
  console.log('GAMEOVER');
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

(function createEnemies(){
  allEnemies.push(new Enemy(100, 100));
}());

//new Enemy to be created
function newEnemy(){
  var xEnemy= Math.abs((Math.floor(Math.random()*(40)-6))*10);
  var yEnemy= Math.abs((Math.floor(Math.random()*(3)+1))*100);
  if(allEnemies.length < 12){
  allEnemies.push(new Enemy(xEnemy, yEnemy));
  }
};

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
