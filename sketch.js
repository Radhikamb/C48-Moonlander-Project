var moonlander, moonlanderimg, bg;
var ground;
var vy = 0;
var vx = 0;
var fuel = 100;
var g = 0.05;
var timer;
var thrust, crash, land, normal, obstacleimg, lzimg, rcsleft, rcsright;
var obstacle, ground, lz;

function preload() {
  //to load all of your assets
  bg = loadImage("Assets/bg.png");
  moonlanderimg = loadImage("Assets/normal.png");

  thrust = loadAnimation("Assets/b_thrust_1.png", "Assets/b_thrust_2.png", "Assets/b_thrust_3.png");
  crash =  loadAnimation("Assets/crash1.png", "Assets/crash2.png", "Assets/crash3.png");
  land = loadAnimation("Assets/landing1.png", "Assets/landing2.png", "Assets/landing_3.png");
  normal = loadImage("Assets/normal.png");
  obstacleimg = loadImage("Assets/obstacle.png");
  lzimg = loadImage("Assets/lz.png");
  rcsleft = loadAnimation("Assets/left_thruster_1.png", "Assets/left_thruster_2.png");
  rcsright = loadAnimation("Assets/right_thruster_1.png", "Assets/right_thruster_2.png");

  thrust.playing = true;
  thrust.looping = false;
  crash.looping = false;
  land.looping = false;
  rcsleft.looping = false;
  rcsright.looping = false;


}

function setup() {
  //to create objects which gets executed once in your code and remains on your code
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500;

  thrust.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;
  rcsleft.frameDelay = 5;

  moonlander = createSprite(100,50,30,30);
  moonlander.addImage(moonlanderimg);
  moonlander.scale = 0.1;
  moonlander.setCollider("rectangle", 0, 0, 200, 200);
  //moonlander.debug = true;
  //adding animations to the moonlander

  moonlander.addAnimation('thrusting', thrust);
  moonlander.addAnimation('crashing', crash);
  moonlander.addAnimation('landing', land);
  moonlander.addAnimation('left', rcsleft);
  moonlander.addAnimation('right', rcsright);
  moonlander.addAnimation('normal', normal);

  obstacle = createSprite(320, 530, 50, 100);
  obstacle.addImage(obstacleimg);
  obstacle.scale = 0.5;
  obstacle.setCollider("rectangle", 0, 100, 300, 300);

  lz = createSprite(880, 610, 50, 30);
  lz.addImage(lzimg);
  lz.scale = 0.3;
  lz.setCollider("rectangle", 0, 180, 400, 100);
  rectMode(CENTER);
  textSize(15);
  

  ground = createSprite(500,690,1000,20);
 
}

function draw() {
  //to write your actual logic of the code and gets executed for every frame 
  //background("blue");
  image(bg, 0, 0);
  push();
  fill(255);
  text("VERTICAL VELOCITY: " +round(vy), 800, 75);
  text("FUEL: "+fuel, 800, 25);
  text("HORIZONTAL VELOCITY: " +round(vx,2), 800, 50);
  pop();
    //fall down
    vy += g;
  moonlander.position.y = moonlander.position.y + vy;
  moonlander.position.x = moonlander.position.x + vx;
  
//obstacle detection
  if(moonlander.collide(obstacle) == true){
      moonlander.changeAnimation('crashing');
      stop();
  }

  if(moonlander.collide(ground) == true){
      moonlander.changeAnimation('crashing');
      stop();
  }
  
  var d = dist(moonlander.position.x, moonlander.position.y, lz.position.x, lz.position.y);
  console.log(d);

  if(d <= 35 && (vy<2 && vy>-2) && (vx<2 && vx>-2)) {
    console.log("landed");
    vx = 0;
    vy = 0;
    g = 0;
    moonlander.changeAnimation('landing');
  }




  drawSprites();
}

function keyPressed (){
  if(keyCode == UP_ARROW && fuel>0) {
    upward_thrust();
    moonlander.changeAnimation('thrusting');
    thrust.nextFrame();
     //moonlander.velocityY = moonlander.velocityY
   } 
   if(keyCode == LEFT_ARROW && fuel>0) {
      moonlander.changeAnimation('right');
      left_thrust();
      
   } 
   if(keyCode == RIGHT_ARROW && fuel>0) {
    moonlander.changeAnimation('left');
      right_thrust();
   }
}

  function upward_thrust () {
    vy = -1;
    fuel -=1;

}

function right_thrust() {
    vx += 0.2;
    fuel -= 1;
}

function left_thrust(){
  vx = vx-0.2;
  fuel -= 1;
}

function stop() {
  vx = 0;
  vy = 0;
  fuel = 0;
  g = 0;
}