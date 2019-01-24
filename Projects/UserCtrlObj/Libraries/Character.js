
const DEFAULT_SIZE = 50;
class Character{
    constructor(x, y, h = DEFAULT_SIZE, w = DEFAULT_SIZE){
        this.x = x;
        this.y = y;
        this.speed = 5;
    }

    move(directions){
        
        const yVal  = this.speed * (directions.up + directions.down);
        const xVal = this.speed * (directions.left + directions.right);
        if(yVal != 0){
            this.y -= yVal;
        }
        if(xVal != 0){
            this.x -= xVal;
        }

        if(this.x < 0){
            this.x = width;
        }
        if(this.x > width){
            this.x = 0;
        }
        if(this.y < 0){
            this.y = height;
        }
        if(this.y > height){
            this.y = 0;
        }
    }

    showCenter(strokeColor = 0, strokeThickness = 2){
        stroke(strokeColor);
        strokeWeight(strokeThickness);
        point(this.x, this.y);
    }

    show(){
        strokeWeight(1);
        stroke(0,255,0)
        fill(0,255,0)
        rect(this.x - 10, this.y -10 , 10, 10);
        this.showCenter();        
    }
}

