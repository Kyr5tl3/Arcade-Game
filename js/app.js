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

// Update the enemy's position
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

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function (x , y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-cat-girl.png';
};

//Player update function
Player.prototype.update = function(dt) {
  var thePlayer = this;
  if(this.y == 0){
    points += 100;
    this.points();
    this.restart();
    newEnemy();
    newGem();
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

//Player render function - renders character on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handling function - using keys to navingate the players
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

//Gems
var Gem = function(x , y, img) {
    this.x = x;
    this.y = y;
    this.sprite = img;
};

// Draw gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 80);
};

//new Gem
var allGems = [];

function newGem(){
  var calcX = Math.abs((Math.floor(Math.random()*(6)+1))*50);
  var calcY = Math.abs((Math.floor(Math.random()*(7)+1))*50);
  var xGem = 0;
  var ygem = 0;
    if(calcX < 600){xGem = Math.floor(calcX-25);
    };
    if(calcY > 100){yGem = Math.floor(calcY-25);
    };
  var gemArray = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
  var selectGem = Math.floor(Math.random()*(2));
  var createGem = gemArray[selectGem];

  if(allGems.length < 3){
  var imgGem = createGem;
  allGems.push(new Gem(xGem, yGem, imgGem));
  }
};

//adding of point
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

// Instantiate objects.
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
