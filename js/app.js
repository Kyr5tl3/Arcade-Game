//Scorecard Variables
var points = 0;
var gemBlueTotal = 0;
var gemGreenTotal = 0;
var gemOrangeTotal = 0;
var totalPoints = 0;
var highscore = 0; //localStorage.getItem("highscore");

//append highscore to Scorecard
(function addHighscore(){
$('div.myHighscore').append('<h2 class="highscore"> Highscore: ' + highscore + '</h2>');
}());


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
  else{this.x = -50;}
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
  if(this.y == -50){
    points += 100;
    this.points();
    this.restart();
    // newEnemy();
    createGems();
  }

  allEnemies.forEach(function(enemy){
    var xPosition = Math.abs(player.x - enemy.x);
    var yPosition = Math.abs(player.y - enemy.y);
    if(xPosition<=50 && yPosition<=25){
        thePlayer.restart();
        if($('ul.lives li').length > 1){
          $('ul.lives li:last-child').remove();
        }
        else{$('ul.lives li:last-child').remove();
        player.gameOver();}
    }});

    allGems.forEach(function(gem){
      var xPosition = Math.abs(player.x - gem.x + 25);
      var yPosition = Math.abs(player.y - gem.y + 75);
      if(xPosition<=5 && yPosition<=5){
        var thisGem = allGems.indexOf(gem);
        allGems.splice(thisGem,1);
        gem.points();
        player.points();
        }
      });
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
  var calcX = Math.abs((Math.floor(Math.random()*(9)+1))*50);
  var calcY = Math.abs((Math.floor(Math.random()*(9)+1))*50);
  var xGem = 0;
  var yGem = 0;
    if(calcX < 505){xGem = Math.floor(calcX-25);
    } else{xGem = calcX;}
    if(calcY < 100){yGem = calcY + 75;
    } else{yGem = Math.floor(calcY-25);}
  var gemArray = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
  var selectGem = Math.floor(Math.random()*(3));
  var createGem = gemArray[selectGem];
  var imgGem = createGem;
  allGems.push(new Gem(xGem, yGem, imgGem));
}

function createGems(){
  if(allGems.length < 3){
  var len = allGems.length;
 for(i=3; len<i; i--){
   newGem();
 }
}}

//Gem points
Gem.prototype.points = function(){
  if(this.sprite == 'images/Gem Blue.png'){
    gemBlueTotal += 25;
    $('h3.pointsBlue').replaceWith('<h3 class="pointsBlue">' + gemBlueTotal + '</h3>');
  }
  if(this.sprite == 'images/Gem Green.png'){
    gemGreenTotal += 50;
    $('h3.pointsGreen').replaceWith('<h3 class="pointsGreen">' + gemGreenTotal + '</h3>');
  }
  if(this.sprite == 'images/Gem Orange.png'){
    $('h3.pointsOrange').replaceWith('<h3 class="pointsOrange">' + gemOrangeTotal + '</h3>');
    gemOrangeTotal += 75;
  }
};

//adding of point
Player.prototype.points = function(){
  totalPoints = points + gemBlueTotal + gemGreenTotal + gemOrangeTotal;
  $('h3.points').replaceWith('<h3 class="points">' + totalPoints + '</h3>');
};
//restart - player to return to Point of Origin
Player.prototype.restart = function(){
  this.x = 200;
  this.y = 400;
};

//Highscore

// function highscore(){
//   if(highscore !== null){
//     if (totalPoints > highscore) {
//         localStorage.setItem("highscore", totalPoints);
//     }
// }
//     else{
//       localStorage.setItem("highscore", totalPoints);
//     }
// }

// Instantiate objects.
var allEnemies = [];

var enemyCreation = (function createEnemies(){
  allEnemies.push(new Enemy(100, 100));
  return createEnemies;
}());

//new Enemy to be created
function newEnemy(){
  var xEnemy= Math.abs((Math.floor(Math.random()*(40)-6))*10);
  var yEnemy= Math.abs((Math.floor(Math.random()*(3)+1))*100);
  if(allEnemies.length < 12){
  allEnemies.push(new Enemy(xEnemy, yEnemy));
  }
}

var player = new Player(200,400);


//create lives
//5 lives
var createLife = function(){for(i=1; i<=5; i++){
$('ul.lives').append('<li><img class="heart" src="images/Heart.png"></li>');
}};
//reset the game
function gameReset(){
  points = 0;
  gemBlueTotal = 0;
  gemGreenTotal = 0;
  gemOrangeTotal = 0;
  totalPoints = 0;
  allGems = [];
  allEnemies = [];
  createLife();
  enemyCreation();
  createGems();
  $('div.modal').hide();
}

//game over

function blink(){
  $('.blink').fadeOut(500).fadeIn(500);
}

setInterval(blink, 1000);

Player.prototype.gameOver = function(){
  $('div.modal').show();
  $('div.modal-content').append('<h1 class="blink">GAME OVER</h1>');
  if(totalPoints > highscore){
      $('div.modal-content').append('<h2>New High Score!!!</h2>');
      $('div.modal-content').append('<h2>' + highscore + '</h2>');
  } else {$('div.modal-content').append('<h2>Your Score</h2>');
          $('div.modal-content').append('<h2>'+ totalPoints +'</h2>');
          $('div.modal-content').append('<h2>Highest Score</h2>');
          $('div.modal-content').append('<h2>' + highscore + '</h2>');}
  $('div.modal-content').append('<button class="button01">Play Again?</h1>');
  $('.button01').click(gameReset);
};


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
