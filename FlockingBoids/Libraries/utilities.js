function createShapeVertices( sides, cx, cy, r ) {
  const shape = [];

  const rotation = TWO_PI / sides;
  let angle = 0

  while ( angle < TWO_PI ) {
    const point = {
      x: cx + r * cos( angle + QUARTER_PI ),
      y: cy + r * sin( angle + QUARTER_PI )
    }
    shape.push( point );

    angle += rotation;
  }

  return shape;
}
