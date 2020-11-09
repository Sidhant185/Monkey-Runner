var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score, life;
var ground;
var banana,obstacle;
function preload(){
monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(800,400);
  monkey = createSprite(90,350,30,30);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.15;
  ground = createSprite(400,390,800,20);
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
  life = 3;
}
function draw() {
  background("white");
  textSize(20);
  text("Score = "+score,20,20);
  text("LIFE = "+life,700,20);
  if (gameState===PLAY){
  Food();
  Obstacle();
  if (keyDown("space")&&monkey.y>300){
    monkey.velocityY=-20;
  }
  monkey.velocityY=monkey.velocityY+0.9;
  if (monkey.isTouching(FoodGroup)){
    score = score+1;
    FoodGroup.destroyEach();
}
   if (monkey.isTouching(obstacleGroup)){
   life = life-1;
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
}
    if (life<1){
      gameState=END;
    }
  }
  else if (gameState==END){
    textSize(30);
    text("Game Over",320,200);
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
    monkey.visible=false;    
  }
  monkey.collide(ground);
  drawSprites();
}
function Food(){
  if (frameCount%90===0){
   food = createSprite(810,Math.round(random(50,250)),30,30);
   food.addImage("banana",bananaImage);  
   food.velocityX=-(10+score/5);
   food.scale=0.15;
    FoodGroup.add(food);
  }
  
}
function Obstacle(){
  if (frameCount%60===0){
   obstacle = createSprite(810,Math.round(random(350,400)),30,30);
   obstacle.addImage("obstacles",obstacleImage);  
   obstacle.velocityX=-(10+score/5);
   obstacle.scale=0.5;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,170);
  }
  
}