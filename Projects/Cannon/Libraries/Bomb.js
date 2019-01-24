class Bomb extends Entity {
    constructor(x, y) {
        super(x, y);
        this.is_shot = false;
        this.destroyed = false;
    }

    shoot(force) {
        if (!this.is_shot) {
            this.applyForce(force)
            this.is_shot = true;
        }
    }

    //add update function to remove entities if they are off screen
    checkBoundary() {
        const x = this.position.x;
        const y = this.position.y;
        if (x < 0 || x > width || y < 0 || y > height) {
            this.destroyed = true;
        }
    }

    render() {
        if (!this.destroyed) {
            this.setColor();
            push();
            translate(this.position.x, this.position.y);
            rotate(this.velocity.heading());
            rectMode(CENTER);
            rect(0, 0, this.mass, round(this.mass / 4));
            pop();
        }
        // this.showForceDirection();

    }

}