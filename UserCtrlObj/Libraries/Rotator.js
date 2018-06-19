class Rotator extends Character{
    constructor(x,y){
        super(x,y);
        this.rotation = 0;    
    }

    move(directions){        
        this.rotate(directions);

    }

    rotate(directions){
        if(directions.left){
            this.rotation -= 1;
        }
        if(directions.right){
            this.rotation += 1;
        }
        
        if(this.rotation > 360 || this.rotation < -360){
            this.rotation = 0
        }
    }

    show(){
        stroke(0, 255, 0);
        strokeWeight(1);
        fill(234, 54, 124);
        translate(this.x, this.y);
        rotate(this.rotation);
        rect(-(this.w / 2 ), -(this.h /2) , this.h, this.w);
    }
}