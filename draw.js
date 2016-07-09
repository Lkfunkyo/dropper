var characters = [];
var topDropper;
var bg;

function setup() {
  createCanvas(displayWidth, displayHeight - 105);
  
  bg = color(255);
  
  background(bg);
  
  characters.splice(0, characters.length)

  topDropper = {
    pos: createVector(width / 2, 50),
    w: 100,
    h: 20,

    sWeight: random(3, 7),
    s: color(random(30, 120), random(100, 255), random(200, 230), random(50, 255)),

    col: color(random(255), random(255), random(255), 60)
  };

  characters.push(new Character(topDropper));
}

function draw() {
  background(bg);

  for (var i = 0; i < characters.length; i++) {
    characters[i].display();
    characters[i].run();
    characters[i].stayInScreen();
  }
  
  characters[0].vel.limit(15);
  characters[0].droppedInScreen();
  
  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) {
      characters[0].applyForce(createVector(-1, 0));
    } else if(keyCode == RIGHT_ARROW){
      characters[0].applyForce(createVector(1, 0));
    } 
    if(keyCode == UP_ARROW){
      characters[0].applyForce(createVector(0, -1));
    } else if(keyCode == DOWN_ARROW){
      characters[0].applyForce(createVector(0, 1));
    }
  }
}

function mouseClicked() {
  characters[0].drop(15);
}

function keyTyped() {
  if (key == 'r') {
    setup();
  }
}