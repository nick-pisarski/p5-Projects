class Entity{
    constructor(x, y, mass = 10, options = {}) {
        this.position = createVector(x, y);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.mass = mass;
        
        // this.coDrag = 1-0.001;
        // this.coFriction = 1-0.001;

        this.strokeColor = options.stroke || color(200, 0, 0);
        this.strokeWidth = options.strokeWeight || 1;
        this.fillColor = options.fill || color(0, 200, 0);
    }

    applyForce(force){
        this.acceleration.add(force.copy());
    }

    setColor(){
        stroke(this.strokeColor);
        strokeWeight(this.strokeWidth);
        fill(this.fillColor);
    }

    checkBoundary(){
        if(this.position.x < this.mass/2){
            this.position.x = this.mass/2;
            this.velocity.x = this.velocity.x * -1;
        }
        if(this.position.x > width -this.mass/2){
            this.position.x = width-this.mass/2;
            this.velocity.x = this.velocity.x * -1;
        }
        if(this.position.y < this.mass/2){
            this.position.y = this.mass/2;
            this.velocity.y = this.velocity.y * -1;
        }
        if(this.position.y > height -this.mass/2){
            this.position.y = height -this.mass/2;
            this.velocity.y = this.velocity.y * -1;
        }
    }

    update(){
        const force = this.acceleration.copy().mult(this.mass)
        this.velocity.add(force);
        this.position.add(this.velocity);
        this.checkBoundary();
        this.render();
        this.acceleration.mult(0);
        this.render();
    }
    

    showForceDirection(){
        const force = this.position.copy().add(this.velocity.copy()).sub(this.position.copy());
        
        //force color
        stroke(255,255,0);
        strokeWeight(4);

        // mulitply by scale to make visiable
        force.mult(this.mass);

        push()
        translate(this.position.x, this.position.y)

        line(0, 0, force.x, force.y);

        //draw end points
        stroke(255, 0, 0);
        point(0, 0);
        point(force.x, force.y);

        noStroke()
        fill(255, 0, 0)
        text(`F: ${force.mag().toFixed(1)}`, 5, 0)
        pop()
    }

    render(){
        this.setColor();
        ellipse(this.position.x, this.position.y, this.mass, this.mass);
        this.showForceDirection()
        
    }
}