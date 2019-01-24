function createShapeVertices(sides) {
    const shape = [];
    const r = (min(HEIGHT, WIDTH) / 2) - 10;
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;

    const rotation = TWO_PI / sides;
    let angle = 0

    while (angle <= TWO_PI) {
        const point = {
            x: cx + r * cos(angle + QUARTER_PI),
            y: cy + r * sin(angle + QUARTER_PI)
        }
        shape.push(point);

        angle += rotation;
    }

    return shape;
}