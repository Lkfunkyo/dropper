function Character(obj) {
  var x = obj.pos.x || width / 2;
  var y = obj.pos.y || height / 2;

  rectMode(CENTER);

  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.accel = createVector(0, 0);

  this.dropped = [];

  this.w = obj.w || 100;
  this.h = obj.h || 20;

  this.sWeight = obj.sWeight || 1;

  this.s = obj.s || 1;
  this.col = obj.col || color(255);

  this.display = function() {
    push();

    translate(this.pos.x, this.pos.y);
    
    
    stroke(this.s);
    strokeWeight(this.sWeight);
    
    fill(this.col);
    
    rect(0, 0, this.w, this.h);

    pop();
  };

  this.run = function() {
    for (var i = 0; i < this.dropped.length; i++) {
      if (this.dropped[i].pos.x > width + this.dropped[i].w / 2 || this.dropped[i].pos.x < -this.dropped[i].w || this.dropped[i].pos.y > height + this.dropped[i].h / 2 || this.dropped[i].pos.y < -this.dropped[i].w) {
        this.dropped.splice(i, 1);
      }

      if (this.dropped.length > 0) {
        this.dropped[i].display();

        this.dropped[i].run();
        this.dropped[i].applyGravity();
      }
    }

    this.vel.add(this.accel);
    this.pos.add(this.vel);
  };
  
  this.move = function(vector){
    var vec = vector.copy();
    
    this.pos.add(vec);
  };

  this.applyVelocity = function(vector) {
    var vel = vector.copy();

    this.vel.add(vel);
  };

  this.applyForce = function(f) {
    var force = f.copy();

    this.accel.mult(0);

    this.accel.add(force);
  };

  this.applyGravity = function() {
    this.accel.add(createVector(0, 0.005));
  };
  
  this.stayInScreen = function(){
    if(this.pos.x > width-this.w/2 || this.pos.x < this.w/2){
      this.vel.x *= -0.8;
    }
    if(this.pos.y > height-this.h/2 || this.pos.y < this.h/2){
      this.vel.y *= -0.8;
    }
    
    if(this.pos.x > width-this.w/2){
      this.pos.x = width-this.w/2;
    } else if(this.pos.x < this.w/2){
      this.pos.x = this.w/2;
    }
    
    if(this.pos.y > height-this.h/2){
      this.pos.y = height-this.h/2;
    } else if(this.pos.y < this.h/2){
      this.pos.y = this.h/2;
    }
  };

  this.drop = function() {
    this.dropped.push(new Character(new randomCharacter(createVector(this.pos.x, this.pos.x), createVector(this.pos.y + this.h/2, this.pos.y + this.h/2), createVector(15, 60), createVector(5, 12), this.s, this.sWeight, this.col)));
  };
}

function randomCharacter(xVec, yVec, wVec, hVec, s, sWeight, col) {
  var obj = new generateCharacter(random(xVec.x, xVec.y), random(yVec.x, yVec.y), random(wVec.x, wVec.y), random(hVec.x, hVec.y), s, sWeight, col);

  var x = obj.pos.x || width / 2;
  var y = obj.pos.y || height / 2;

  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.accel = createVector(0, 0);


  this.w = obj.w || 100;
  this.h = obj.h || 20;

  this.s = obj.s;
  this.sWeight = obj.sWeight;

  this.col = obj.col;
}

function generateCharacter(x, y, w, h, s, sW, c) {
  this.pos = createVector(x, y);
  this.w = w;
  this.h = h;
  this.s = s;
  this.sW = sW;
  this.col = c;
}