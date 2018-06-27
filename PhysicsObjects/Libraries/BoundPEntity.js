class BoundPEntity extends PEntity {
    constructor(x, y, mass, ceiling = true) {
        super(x, y, mass);
        this.ceiling = ceiling;
    }

    checkBoundary() {
        // Left
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = this.velocity.x * -1;
        }
        // Right
        if (this.position.x > width) {
            this.position.x = width;
            this.velocity.x = this.velocity.x * -1;
        }
        // Bottom
        if (this.position.y > height) {
            this.position.y = height;
            this.velocity.y = this.velocity.y * -1;
        }
        // Top
        if (this.ceiling) {
            if (this.position.y < 0) {
                this.position.y = 0;
                this.velocity.y = this.velocity.y * -1;
            }
        }
    }

    updatePosition() {
        PEntity.prototype.updatePosition.call(this)
        this.checkBoundary();
    }
}