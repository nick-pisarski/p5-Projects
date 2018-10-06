function drawCircle(x, y, d) {
    stroke('rgba(255,255,255,0.25)')
    strokeWeight(1)
    noFill()
    rectMode(CENTER);
    ellipse(x, y, d, d);
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
  
  function buildShapesArray(strokeWeight){
    for (let i = 0; i < rows; i++) {
      shapes[i] = [];
      for (let j = 0; j < cols; j++) {
        shapes[i][j] = new Curve(strokeWeight);
      }
    }
  }
  
  function getCirclePoint(x, y, r, i){
    return {
      x: x + r * cos(angle * (i + 1) - HALF_PI),
      y: y + r * sin(angle * (i + 1) - HALF_PI)
    } 
  }

  function updateAngle(){
    angle -= speed;
  
    if (angle < -TWO_PI) {
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          shapes[j][i].reset();
        }
      }
      angle = 0;
    }
  }

  function drawShapes(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          shapes[i][j].addPoint();
          shapes[i][j].draw();
        }
      }
  }