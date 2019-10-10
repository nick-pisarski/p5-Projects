const UP = 87;
const DOWN = 83;
const LEFT = 65;
const RIGHT = 68
;
class Controls{
    constructor(up = UP, down = DOWN, left = LEFT, right = RIGHT) {
        this.upKeyCode = up;
        this.downKeyCode = down;
        this.leftKeyCode = left;
        this.rightKeyCode = right;        
    }

    readKeys(vector = false){
        //[up, down, left, right]
        let d = {
            up: 0,
            down: 0,
            left: 0,
            right: 0
        }

        if(keyIsDown(this.upKeyCode)){
            d.up = -1;
        }
        //down
        if(keyIsDown(this.downKeyCode)){
            d.down = 1;
        }
        //left
        if(keyIsDown(this.leftKeyCode)){
            d.left = -1;
        }
        //right
        if(keyIsDown(this.rightKeyCode)){
            d.right = 1;
        }

        if(!vector){

            return d;
        }
        return this.getVector(d)
    }

    getVector(d){
        const y = d.up + d.down;
        const x = d.left + d.right;
        return createVector(x, y);
    }
    
       
}
