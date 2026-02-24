let ball1;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("background");
  ball1 = new ball()
}

function draw() {
  background(255, 255, 255);
  fill(100, 200, 255);
  noStroke();
//   circle(mouseX, mouseY, 50);
  ball1.bounce();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



class ball {
    constructor() {
      this.position = createVector(0,0); 
      this.velocity = createVector(random(20), random(20));
      let patches = [];
      this.intersectX = [];
      this.intersectY = [];
    }
    

  bounce(){
    ellipse(this.position.x, this.position.y, 50, 50);
    stroke(10);
    for (let i = 0; i < this.intersectX.length; i++) {
      line(this.position.x, this.position.y, this.intersectX[i], this.intersectY[i]);
    }
    if ((this.position.x > width) || (this.position.x < 0)) {
        this.velocity.x *= -1;
      this.intersectX.push(this.position.x);
      this.intersectY.push(this.position.y);
      }
    if ((this.position.y > height) || (this.position.y < 0)) {
        this.velocity.y *= -1;
      this.intersectX.push(this.position.x);
      this.intersectY.push(this.position.y);
      }
    if (this.intersectX.length > 35) {
      this.intersectX.splice(0, 1);
      this.intersectY.splice(0, 1);
    }
    this.position.add(this.velocity)
    }
}
