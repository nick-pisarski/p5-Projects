class Cannon {
    constructor(x, y,  ammo_capacity = 3) {

        this.position = createVector(x,y);
        this.barrel = new Barrel(this.position.x + 25, this.position.y -25) 
        this.ammo_capacity = ammo_capacity;
        this.ammo = [];
        this.add_ammo(this.ammo_capacity);
        this.ammo_count = this.ammo.length; 
    }

    add_ammo(amount){
        this.ammo_count += amount
    }

    reload() {
        this.add_ammo(this.ammo_capacity - this.ammo_count);
        this.ammo_count = this.ammo_capacity;
    }

    fire(){
        //firepower should be the barrels directional velocity multiplied by power multiplier
        let firepower = createVector(random(0.05, 0.5), random(-0.009, -0.05));
        // let firepower = this.barrel.angle.mult(random(1, 5));
        if(!this.ammo_count < 1 ){
            let bomb = new Bomb(this.barrel.position.x + 25, this.barrel.position.y -25, 50, {stroke: color(random(255), random(255), random(255))})
            bomb.shoot(firepower);
            this.ammo.unshift(bomb)
            this.ammo_count--;
        }
    }

    update(){        
        for (let i = this.ammo.length-1; i > -1; i--) {
            this.ammo[i].update();     
            if(this.ammo[i].destroyed){
                this.ammo.splice(i);
            }     
        }
        this.render();
        this.barrel.update();
    }

    render(){
        stroke(255,0,255);
        strokeWeight(1);
        fill(0, 255, 0)
        rect(this.position.x, this.position.y-25, 25, 25);
    }
    
}

class Barrel{
    constructor(x, y) {
        this.position = createVector(x,y);
        this.angle = createVector(1 , 1);
    }

    update(){
        this.render()
    }
    


    render(){
        this.angle  = this.position.copy().sub(createVector(-25, 25));
        // this.angle.rotate(-PI/32)
        push()
        stroke(127);
        strokeWeight(4);
        // translate(this.position.x, this.position.y);
        line(this.position.x, this.position.y, this.angle.x, this.angle.y)
        pop()

    }
    
}