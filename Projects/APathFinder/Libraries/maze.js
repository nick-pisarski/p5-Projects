function Maze(tile_size = 10){
    this.rows = height/tile_size;
    this.cols = width/tile_size;
    this.grid =  [];
    this.tile_size = tile_size;

    this.buildGrid = function(chanceToBeWall){
        for(let row = 0; row < this.rows; row++){
            this.grid[row] = [];
            for(let col = 0; col < this.cols; col++){                  
                const isWall = random() <= chanceToBeWall;
                const x_pos = col * this.tile_size;
                const y_pos = row * this.tile_size;
                const options = {
                    f: 0,
                    g: 0,
                    h: 0,
                    vh: 0,
                }
                this.grid[row].push(new Tile(this.grid, row, col, x_pos, y_pos, this.tile_size, this.tile_size, isWall, options));
            }
        }
    }

    this.showGrid = function(){
        for(let row= 0; row < this.rows; row++){
            for(let col = 0; col < this.cols;  col++){
                this.grid[row][col].show();
            }
        }
    }
}
