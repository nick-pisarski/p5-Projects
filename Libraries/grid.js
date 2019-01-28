class Tile {
  constructor( grid, x, y ) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.data = {};
    this.size = this.grid.tileSize;
    this.position = this.x + ( this.y * this.grid.width );
  }

  center() {
    return {
      x: this.x * this.size + ( this.size / 2 ),
      y: this.y * this.size + ( this.size / 2 )
    }
  }

  coordinates() {
    return {
      x: this.x * this.size,
      y: this.y * this.size
    }
  }

  // Returns all the adjacent neighbors
  // should add a callback to be called to all further filtering
  neighbors( diagonal = false ) {
    const neighbors = [];
    const checkNeighor = ( acc, current ) => {
      if ( this.grid.inBounds( current.x, current.y ) ) {

        // add filtering callback here
        acc.push( this.grid.find( current.x, current.y ) );
      }
      return acc;
    };

    // cardinal
    const cardinals = [
      { x: this.x, y: this.y - 1 },
      { x: this.x + 1, y: this.y },
      { x: this.x, y: this.y + 1 },
      { x: this.x - 1, y: this.y },
    ];

    cardinals.reduce( checkNeighor, neighbors );

    if ( diagonal ) {
      //diagonals
      const diagonals = [
        { x: this.x + 1, y: this.y - 1 },
        { x: this.x + 1, y: this.y + 1 },
        { x: this.x - 1, y: this.y + 1 },
        { x: this.x - 1, y: this.y - 1 },
      ]

      diagonals.reduce( checkNeighor, neighbors );
    }

    return neighbors;
  }
}

class Grid {
  /**
   * Stores 2D data in a 1D array - Used for storing tiles on canvas
   * @param {number} canvasWidth - width of canvas
   * @param {number} canvasHeight - height of canvas
   * @param {number} tileSize - size of tiles
   */
  constructor( canvasWidth, canvasHeight, tileSize ) {
    this.list = [];
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.width = canvasWidth / tileSize;
    this.height = canvasHeight / tileSize;
    this.tileSize = tileSize;

    this.build();
  }

  /**
   * clears the list
   */
  clear() {
    this.list = [];
  }

  getTiles() {
    return this.list;
  }

  /**
   * Builds the grid with Tile objects
   */
  build() {
    for ( let r = 0; r < this.height; r++ ) {
      for ( let c = 0; c < this.width; c++ ) {
        this.list.push( new Tile( this, c, r ) )
      }
    }
  }

  /**
   * Finds data in the array based on x,y coords
   * @param {number} x x coord can be col value or pixel value
   * @param {number} y y coord can be col value or pixel value
   * @param {boolean*} pixel default: false, weather is pixel data or row and column data
   */
  find( x, y, pixel = false ) {
    const i = this.getI( x, y, pixel );
    return i > this.list.length - 1 ? null : this.list[ i ];

  }

  /**
   * returns a tile from the grd
   * @param {num} pos position in the grid
   */
  get( pos ) {
    return this.list[ pos ] ? this.list[ pos ] : false;
  }

  /**
   * Calculates the position in the array based on x,y coords
   * @param {number} x x coord can be col value or pixel value
   * @param {number} y y coord can be col value or pixel value
   * @param {boolean*} pixel default: false, weather is pixel data or row and column data
   */
  getI( x, y, pixel = false ) {
    if ( pixel ) {
      return Math.trunc( x / this.tileSize ) + ( Math.trunc( y / this.tileSize ) * this.width )
    }
    return x + ( y * this.width )
  }

  /**
   * Checks if the given coordinates are in the grid
   * @param {number} x x coord can be col value or pixel value
   * @param {number} y y coord can be col value or pixel value
   * @param {boolean*} pixel default: false, weather is pixel data or row and column data
   */
  inBounds( x, y, pixel = false ) {
    if ( pixel ) {
      return x < this.canvasWidth && x >= 0 && y >= 0 && y < this.canvasHeight;
    }
    return x < this.width && x >= 0 && y >= 0 && y < this.height;
  }

  iterate( callback ) {
    this.list.forEach( tile => callback( tile ) );
  }
}
