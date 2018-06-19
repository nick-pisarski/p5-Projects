class Particle{
    constructor(position, options = {}){
        this.acceleration = 0.025
        this.friction = 0.01;
        this.velocity = createVector(0, 0);
        this.position = position.copy();

        this.strokeColor = options.stroke || color(200, 0, 0);
        this.strokeWidth = options.strokeWeight || 1;
        this.fillColor = options.fill || color(0, 200, 0);
    }

    update(keys){
        const acceleration = keys.mult(this.acceleration);
        this.velocity.add(acceleration);
        this.velocity.mult(1 - this.friction)
        this.position.add(this.velocity);
        this.checkBoundary();
        this.render();
    }

    setColor(){
        stroke(this.strokeColor);
        strokeWeight(this.strokeWidth);
        fill(this.fillColor);
    }

    checkBoundary(){
        if(this.position.x < 0){
            this.position.x = width;
        }
        if(this.position.x > width){
            this.position.x = 0;
        }
        if(this.position.y < 0){
            this.position.y = height;
        }
        if(this.position.y > height){
            this.position.y = 0;
        }
    }

    render(){
        this.setColor();
        translate(this.position.x, this.position.y)
        ellipse(0, 0, 20, 20);
        rotate(PI*this.position.heading());
        stroke(255, 0, 0)
        line(0, 0, 25, 0);
    }
}

class ArrowParticle extends Particle{
    constructor(position, options = {}){
        super(position, options)
        this.r = createVector(0, -50); 
        this.setVertices();
    }

    update(keys){
        Particle.prototype.update.call(this,keys);
        this.setVertices();
        this.render();
    }

    setVertices(){
        let r = this.r.copy().rotate(this.position.heading());
        this.p1 = this.position.copy().add(r);
        this.p2 = this.position.copy().add(r.rotate(2*PI / 3));
        this.p3 = this.position.copy().add(r.rotate(2*PI / 3));
    }

    drawDirection(){
        stroke(255,0,0);
        line(this.position.x, this.position.y, this.p1.x, this.p1.y);
    }

    drawVertices(){
        strokeWeight(5);
        stroke(255, 0, 0)
        point(this.p1.x,this.p1.y)
        stroke(0, 255, 0)
        point(this.p2.x,this.p2.y)
        stroke(0, 0, 255)
        point(this.p3.x,this.p3.y)
    }
    render(){
        this.setColor();
        triangle(this.p1.x, this.p1.y,this.p2.x, this.p2.y,this.p3.x, this.p3.y);
        this.drawDirection();
        this.drawVertices();
        
        
    }
}

