let d;
let r;
let padding;
let angle = 0.0;
let shapes = []; //shapes[row][col]

const cols = 10;
const rows = cols;


function setup() {
  createCanvas(800, 800);
  d = (width / cols);
  padding = d * .1;
  r = (d / 2) - padding;

  //build shapes
  for (let i = 0; i < rows - 1; i++) {
    shapes[i] = [];
    for (let j = 0; j < cols - 1; j++) {
      shapes[i][j] = new Curve();
    }
  }
}

function draw() {
  background(0);

  //columns
  for (let j = 0; j < cols - 1; j++) {
    const cx = d + (j * d + (d / 2));
    const cy = d - (d / 2);
    const x = cx + r * cos(angle * (j + 1) - HALF_PI);
    const y = cy + r * sin(angle * (j + 1) - HALF_PI);
    drawCircle(cx, cy);
    drawPoint(x, y)
    drawLine(x, 0, x, height);

    for (let i = 0; 1 < rows - i; i++) {
      shapes[i][j].setX(x);
    }
  }

  // rows
  for (let i = 0; i < rows - 1; i++) {
    const cy = d + (i * d + (d / 2));
    const cx = d - (d / 2);
    const x = cx + r * cos(angle * (i + 1) - HALF_PI);
    const y = cy + r * sin(angle * (i + 1) - HALF_PI);
    drawCircle(cx, cy);
    drawPoint(x, y)
    drawLine(0, y, width, y);

    for (let j = 0; j < cols - 1; j++) {
      shapes[i][j].setY(y);
    }

  }

  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      shapes[i][j].addPoint();
      shapes[i][j].draw();
    }
  }

  angle -= 0.01;

  if (angle < -TWO_PI) {
    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        shapes[j][i].reset();
      }
    }
    angle = 0;
  }
}

function drawCircle(x, y) {
  stroke('rgba(255,255,255,0.25)')
  strokeWeight(1)
  noFill()
  ellipse(x, y, r * 2)
}

function drawPoint(x, y) {
  stroke(0, 255, 0)
  strokeWeight(6);
  point(x, y);
}

function drawLine(x1, y1, x2, y2) {
  stroke('rgba(255,255,255,0.1)')
  strokeWeight(2);
  line(x1, y1, x2, y2);
}