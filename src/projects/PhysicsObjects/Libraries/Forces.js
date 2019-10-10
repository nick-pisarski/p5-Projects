class Force{
    constructor(force, pixelRatio = 6, convertToPixels = true) {
        this.convertToPixels = convertToPixels;
        this.pixel_ratio = pixelRatio;
        if(convertToPixels){
            this.force = this.convertForce(force);
        } else {
            this.force = force;
        }
    }

    convertForce(force){
        const frame_rate = frameRate() || FRAME_RATE;
        const x = force.x * this.pixel_ratio * (1 / frame_rate);
        const y = force.y * this.pixel_ratio * (1 / frame_rate);
        return createVector(x, y);
    }
    
}