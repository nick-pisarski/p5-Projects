class PEntity {
    constructor(x, y, mass = 10, options = {}) {
        // physical properties
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.mass = mass;

        this.pixel_per_meter = options.pixel_per_meter || 6;

    }

    applyForce(force) {
        this.acceleration.add(force.copy().div(this.mass));
    }

    convertToPixels(force){
        const fr = frameRate() || FRAME_RATE;
        const x = force.x * this.pixel_per_meter * (1/fr);
        const y = force.y * this.pixel_per_meter * (1/fr);
        return createVector(x, y)
    }   

    updatePosition() {       
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    showInfo() {
        const coords = `(${nf(this.position.x, 3, 1)}, ${nf(this.position.y, 3, 1)})`;
        const mass =   `M: ${round(this.mass)}`;
        const vecs =   `Vel: ${nf(this.velocity.mag(), 1, 1)}`;
        push();
        fill(255, 0, 0);
        text(coords, this.position.x + 5, this.position.y - 15);
        text(mass,   this.position.x + 5, this.position.y);
        text(vecs,   this.position.x + 5, this.position.y + 15);
        pop();
    }

    drawCenter(options = {}) {
        stroke(options.color || 0);
        strokeWeight(options.strokeWeight || 3);
        point(this.position.x, this.position.y);
    }

    displayVelocity(options = {}) {
        const vel = this.velocity.copy().add(this.position);
        const c = options.color ? options.color : color(255, 255, 255);
        push();
        stroke(c);
        strokeWeight(options.strokeWeight || 2);
        line(this.position.x, this.position.y, vel.x, vel.y);
        pop();

    }

}