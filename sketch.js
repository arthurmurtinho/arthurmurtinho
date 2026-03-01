let ball1;
let img;
let header;

function preload() {
  img = loadImage('logos/bng.png');
}

function setup() {
  header = document.querySelector(".nameHeader");
   if (!header) {
    console.error("Header not found");
    return;
  }
  let canvas = createCanvas(header.clientWidth, header.clientHeight);
  canvas.parent("p5-bg");
  ball1 = new ball(img);
}

function draw() {
  clear(); // keep header white
  fill(100, 200, 255);
  noStroke();
  // circle(mouseX, mouseY, 50);
  ball1.bounce();
}

function windowResized() {
  resizeCanvas(header.offsetWidth, header.offsetHeight);
}

function mouseClicked() {
  ball1.changeVelocity();
}

class ball {
  constructor(img) {
    imageMode(CENTER);
    this.img = img
    this.position = createVector(0, 0);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    let patches = [];
    this.intersectX = [];
    this.intersectY = [];
  }

  changeVelocity() {
    this.velocity = createVector(random(-2, 2), random(-2, 2));
  }

  bounce() {
    image(this.img, this.position.x, this.position.y, 25, 25);
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
    if (this.intersectX.length > 10) {
      this.intersectX.splice(0, 1);
      this.intersectY.splice(0, 1);
    }
    this.position.add(this.velocity)
  }
}
console.log(header);