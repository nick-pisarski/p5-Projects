class Curve {
    constructor() {
        this.path = [];
        this.current = createVector();
    }

    setX(x) {
        this.current.x = x;
    }

    setY(y) {
        this.current.y = y;
    }

    addPoint() {
        this.path.push(this.current);
    }

    reset() {
        this.path = []
    }

    draw() {
        stroke(255);
        strokeWeight(1);
        noFill();
        beginShape();
        for (let i = 0; i< this.path.length; i++) {
            vertex(this.path[i].x, this.path[i].y)
        }
        endShape();

        strokeWeight(4);
        point(this.current.x, this.current.y);

        this.current = createVector();
    }
}