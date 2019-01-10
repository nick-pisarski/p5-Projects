const W = [0, -1];
const E = [0, 1];
const N = [-1, 0];
const S = [1, 0];
const CARD_MOVES = [N, S, E, W];
const NW = [-1, -1];
const NE = [-1, 1];
const SE = [1, 1];
const SW= [1, -1];

const DIAG_MOVES = [NW, NE, SW, SE];

function Tile(grid, row, col, x, y , height, width, isWall, options) {
    //reference to the parent
    this.grid = grid;
    
    //grid array position (row, col)
    this.row = row;
    this.col = col;

    //canvas position
    this.x = x;
    this.y = y;
    this.height = height; 
    this.width = width; 
    this.wall = isWall;

    //values for a* pathing
    this.options = options;
    this.visited = false;

    this.getPosition = function(){ 
        const position = {x: this.x, y: this.y};
        return position;
    }

    //return node or null if request is out of bounds
    this.getNode = function(y, x) {
        if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[0].length) {
            return null;
        }
        return this.grid[y][x];
    }    

    this.getNeighbors = function(diagonals){        
        const neighbors = [];
        for (var i = 0; i < 4; i++) {
            const cardDirection = CARD_MOVES[i];
            const cardNode = this.getNode(this.row + cardDirection[0], this.col + cardDirection[1]);
            if (cardNode != null) {
                if (!cardNode.wall) {
                    neighbors.push(cardNode);
                }
            }

            //make so that it cannot go across diagonals
            if(diagonals){
                const diagDirection = DIAG_MOVES[i];
                const diagNode = this.getNode(this.row + diagDirection[0], this.col + diagDirection[1]);
                if (diagNode != null) {
                    if (!diagNode.wall) {
                        neighbors.push(diagNode);
                    }
                }
            }
        }
        
        return neighbors;
    }

    this.show = function(fillColor = color(102,173,107)){
        noStroke();
        fill(fillColor);
        if(this.wall){
            fill(224,172,109)
        } 
        rect(this.x, this.y, this.width, this.height);

    }
    
}
