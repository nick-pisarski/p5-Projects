class Curve {
    constructor(strokeWeight=1, strokeColor,) {
        this.path = [];
        this.current = createVector();
        this.color = strokeColor || color(random(255), random(255), random(255));
        this.strokeWeight = strokeWeight;
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

    drawCurrentPoint(){
        stroke(255);
        strokeWeight(5);
        point(this.current.x, this.current.y);

        this.current = createVector();
    }

    draw() {
        stroke(this.color);        
        strokeWeight(this.strokeWeight);
        noFill();
        beginShape();
        for (let i = 0; i< this.path.length; i++) {
            vertex(this.path[i].x, this.path[i].y)
        }
        endShape();

        this.drawCurrentPoint();
        
    }
}