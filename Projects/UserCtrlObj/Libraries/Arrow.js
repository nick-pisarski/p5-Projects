class Arrow extends Character {
    constructor(x, y, base) {
        super(x, y);

        this.base = base;
        this.radius = sqrt(3 * sq(this.base))/4;
        this.height = this.radius * 2;
        this.rotateAngle = 0;

        //styling object;
        this.color = color(0, 255, 0);
        this.stroke = color(255, 0, 0);
        this.strokeWeight = 1;

    }

    // move(keys) {
    //    this.rotate(keys);
    // }

    

    rotate(keys){
        if(keys.left){
            this.rotateAngle -= 1;
        }
        if(keys.right){
            this.rotateAngle += 1;
        }
        
        if(this.rotateAngle > 360 || this.rotateAngle < -360){
            this.rotateAngle = 0
        }
    }

    setCoords() {
        const coords = [
            {
                x: 0,
                y: -this.radius
            },
             {
                x: this.base / 2,
                y: this.radius
            },
            {
                x: -this.base / 2,
                y: this.radius
            }
        ]
        this.p1 = createVector(0, this.radius);
        // this.v1.rotate(this.rotation);
        // console.clear();
        console.log(this.v1);

        stroke(0, 255, 0);
        strokeWeight(5);
        point(this.v1.x, this.v1.y);




        return coords;
    }

    setColors(){
        stroke(this.stroke);
        strokeWeight(this.strokeWeight)
        fill(this.color);
    }

    show() {
        const coords = this.getCoords();
        this.setColors();
        
        translate(this.x, this.y);
        // rotate(this.rotation);
        triangle(coords[0].x, coords[0].y, coords[1].x, coords[1].y, coords[2].x, coords[2].y);


        this.showCenter(this.stroke, this.strokeWeight);
    }

    update(keys){
        this.move(keys);
        this.rotate(keys);
        this.show();
    }
}