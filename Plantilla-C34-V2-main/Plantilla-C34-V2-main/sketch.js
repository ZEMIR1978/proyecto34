const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var tower,towerImg,canvas,angle,ground;
var bullets = []
var aliens=[]
var score = 0
var alienAnimation = []

var alienSpritedata, alienSpritesheet;
var backgroundMusic,backgroundImg,shootSound,alienPistolSound,turret;

var isGameOver = false;
var isLaughting = false;

function preload(){
backgroundImg = loadImage("Bg.jpg")
towerImage = loadImage("tower.png");
alienSpritedata = loadJSON("boat.json");
alienSpritesheet = loadImage("Alien.png")
shootSound = loadSound("TurretSound.mp3")
alienPistolSound = loadSound("pistolsound.mp3")



}



function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  turret = new Turret (180, 200, 100, 50, angle);

  var alienFrames = alienSpritedata.frames;
  for (var i = 0; i < alienFrames.length; i++) {
    var pos = alienFrames[i].position;
    var img = alienSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    alienAnimation.push(img);
  }


  showAliens();

   for (var i = 0; i < bullets.length; i++) {
    showBullets(bullets[i], i);
    collisionWithAlien(i);
  
  }

 
}



function draw() 
{
  background(169);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop();

  
  

  

  turret.display();
  

  fill("#6d4c41");
  textSize(40);
  text(`Puntuación:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);
}

function collisionWithAlien(index) {
  for (var i = 0; i < aliens.length; i++) {
    if (bullets[index] !== undefined && aliens[i] !== undefined) {
      var collision = Matter.SAT.collides(bullets[index].body, aliens[i].body);

      if (collision.collided) {
        score+=5
          aliens[i].remove(i);
        

        Matter.World.remove(world, bullets[index].body);
        delete bullets[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var bullet = new Bullet(cannon.x, cannon.y);
    bullet.trajectory = [];
    Matter.Body.setAngle(bullet.body, cannon.angle);
    bullets.push(bullet);
    shootSound.play()
  }
}

function showBullets(bullet, index) {
  if (bullet) {
    bullet.display();
    bullet.animate();
    if (bullet.body.position.x >= width || bullet.body.position.y >= height - 50) {
        bulle.remove(index);
        shootSound.play()
      
    }
  }
}


function showAliens() {
  if (aliens.length > 0) {
    if (
      aliens.length < 4 &&
      aliens[aliens.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var alien = new Boat(
        width,
        height - 100,
        170,
        170,
        position,
        alienAnimation
    )}}};

    for (var i = 0; i < aliens.length; i++) {
      Matter.Body.setVelocity(aliens[i].body, {
        x: -0.9,
        y: 0
      });

      aliens[i].display();
      aliens[i].animate();
      var collision = Matter.SAT.collides(this.tower, aliens[i].body);
      
      if (collision.collided && !aliens[i].isBroken) {
        if(!isLaughting && !alienPistolSound.isPlaying()){
          alienPistolSound.play()
          isLaughting = true

        }
        isGameOver = true;
        gameOver();
        } else {
        var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
        boats.push(boat);
      }
    
    


function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    balls[balls.length - 1].shoot();
    cannonExplosion.play()
  }
}
    }

function gameOver() {
  swal(
    {
      title: `¡Fin del juego!`,
      text: "¡Gracias por jugar!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();

      }
    }
  );
}
