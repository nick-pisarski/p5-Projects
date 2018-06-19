class Ball {

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.on_screen = true;
    }

    radius() {
        return this.r;
    }

    show() {
        const i = getColor(this.x);
        const j = getColor(this.y);
        const r = this.radius();
        stroke(i, j, 255);
        fill(i, j, 255);
        ellipse(this.x, this.y, r, r);
    }

    update() {
        if (this.on_screen) {
            if (this.y < height && this.x < width) {
                this.y += gravity + random(0, 3);
                this.show();
            } else {
                this.on_screen = false;
            }
        }
    }
}


class ShrinkingBall extends Ball {
    constructor(x, y, radius) {
        const r = radius || 20
        super(x, y, r)
    }

    radius() {
        this.r *= 0.99;
        return this.r;
    }

    update() {
        if(this.r > 2){
            if (this.y >= height) {
                this.y = 0;
                this.x = random(0, width);
            } else {
                this.y += gravity + random(0, 3);
            }
            this.show();
        } else {
            this.on_screen = false;
        }
    }
}