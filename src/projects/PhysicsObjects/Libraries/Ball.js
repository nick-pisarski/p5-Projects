class Ball extends BoundPEntity{
    constructor(x, y, mass, r) {
        super(x, y, mass, false);
        this.r = r;
    }

    display(){
        push()
        noStroke();
        fill(255, 255, 255, 75)
        ellipseMode(CENTER);
        ellipse(this.position.x, this.position.y, this.r, this.r);
        pop()
    }
    
}