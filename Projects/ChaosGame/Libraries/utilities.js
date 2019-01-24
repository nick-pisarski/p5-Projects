function createShapeVertices(sides) {
    const shape = [];
    const r = (min(HEIGHT, WIDTH) / 2) -10;
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;
  
    const rotation = TWO_PI / sides;
    let angle = 0
  
    for (let i = 0; i < sides; i++) {
      const point = {
        x: cx + r * cos(angle),
        y: cy + r * sin(angle)
      }
      shape.push(point);
  
      angle += rotation;
    }
  
    return shape;
  }