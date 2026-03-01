let ball1;
let img;
let header;

function preload() {
  img = loadImage('logos/bg.png');
}

function setup() {
  header = document.querySelector(".nameHeader");
  let canvas = createCanvas(header.offsetWidth, header.offsetHeight);
  canvas.parent("p5-bg");
  ball1 = new ball();
}

function draw() {
  clear(); // keep header white
  fill(100, 200, 255);
  noStroke();
  circle(mouseX, mouseY, 50);
  ball1.bounce();
}

function windowResized() {
  resizeCanvas(header.offsetWidth, header.offsetHeight);
}



class ball {
  constructor(img) {
    this.img = img
    this.position = createVector(0, 0);
    this.velocity = createVector(random(2), random(2));
    let patches = [];
    this.intersectX = [];
    this.intersectY = [];
  }


  bounce() {
    img(this.img, this.position.x, this.position.y);
    // ellipse(this.position.x, this.position.y, 50, 50);
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
