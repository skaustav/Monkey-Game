
var PLAY = 1;
var END = 0;
var gameState  = PLAY;

var monkey , monkey_running, invisibleGround
var banana ,bananaImage, obstacle, obstacleImage, gameState;
var bananaGroup, obstacleGroup
var score = 0
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/ 2;
  console.log(ground.x);
  
  
  //creating an invisible ground so that the monkey dont crosses the screen
  invisibleGround = createSprite(200, 0, 400, 10);
  invisibleGround.visible = false;
  

    
  //creating the food and the obstacles group 
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  score = 0;
  
}


function draw() {
background(225);
  //displaying the scores
  fill("black");
  stroke("black");
  textSize(20);
  text("Survival Time = "+score, 100, 50);
  
  
  if(ground.x < 0){
    ground.x = ground.width/ 2;
  }
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
  }
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    
    score = score+1;
  }
  else
{
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    score = 0;
    fill("brown");
    text("GAME OVER", 200, 200)
    textSize(17);
  
    bananaGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
  }
}  

    
 monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  monkey.collide(invisibleGround);  
  
  //spawn the foods
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
}
function spawnBanana(){
  //spawning the bananas
  if(frameCount %60 == 0){
    banana = createSprite(200, 215);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(300, 10));
    banana.scale = 0.1;
    banana.velocityX = -2;
    
    banana.depth = monkey.depth
    monkey.depth = monkey.depth + 2;
    
    bananaGroup.add(banana);
  }
}
function spawnObstacles(){
  //spawning the obstacles
  if(frameCount %60 == 0){
    var obstacle = createSprite(210, 326);
    obstacle.addImage(obstacleImage) ;
    obstacle.scale = 0.1;
    obstacle.velocityX = -2
  
  var rand=Math.round(random(300, 10));
  switch(rand){
    case 1: obstacles.addImage(obstacleImage);
      break;
      default: break;
  }

    obstacleGroup.add(obstacle);
  }
}