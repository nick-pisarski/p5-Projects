 // Quad Tree
 class Point {
   constructor( x, y, data ) {
     this.x = x;
     this.y = y;
     this.userData = data;
   }
 }

 class Rectangle {
   constructor( x, y, w, h ) {
     this.x = x;
     this.y = y;
     this.w = w;
     this.h = h;
   }

   contains( point ) {
     return (
       point.x >= this.x - this.w &&
       point.x <= this.x + this.w &&
       point.y >= this.y - this.h &&
       point.y <= this.y + this.h
     );
   }

   intersects( range ) {
     return !( range.x - range.w > this.x + this.w ||
       range.x + range.w < this.x - this.w ||
       range.y - range.h > this.y + this.h ||
       range.y + range.h < this.y - this.h );
   }

   render() {
     push();
     // point
     strokeWeight( 8 );
     stroke( 255, 0, 0 );
     point( this.x, this.y );
     rectMode( CENTER )
     rect( this.x, this.y, this.w, this.h );
     pop();
   }

 }

 class Circle {
   constructor( x, y, r ) {
     this.x = x;
     this.y = y;
     this.r = r;
     this.rSquared = this.r * this.r;
   }

   contains( point ) {
     // check if the point is in the circle by checking if the euclidean distance of
     // the point and the center of the circle if smaller or equal to the radius of
     // the circle
     let d = Math.pow( ( point.x - this.x ), 2 ) + Math.pow( ( point.y - this.y ), 2 );
     return d <= this.rSquared;

   }

   intersects( range ) {

     let xDist = Math.abs( range.x - this.x );
     let yDist = Math.abs( range.y - this.y );

     // radius of the circle
     let r = this.r;
     let w = range.w;
     let h = range.h;

     // no intersection
     if ( xDist > ( r + w ) || yDist > ( r + h ) )
       return false;

     // intersection within the circle
     if ( xDist <= w || yDist <= h )
       return true;

     // intersection on the edge of the circle
     let edges = Math.pow( ( xDist - w ), 2 ) + Math.pow( ( yDist - h ), 2 );
     return edges <= this.rSquared;
   }

   render() {
     push();
     strokeWeight( 2 );
     stroke( 255, 255, 0 );
     noFill();
     ellipseMode( CENTER );
     ellipse( this.x, this.y, this.r, this.r );
     pop();
   }
 }

 class QuadTree {
   constructor( boundary, capacity ) {
     if ( !boundary ) {
       throw TypeError( 'boundary is null or undefined' );
     }
     if ( !( boundary instanceof Rectangle ) ) {
       throw TypeError( 'boundary should be a Rectangle' );
     }
     if ( typeof capacity !== 'number' ) {
       throw TypeError( `capacity should be a number but is a ${typeof capacity}` );
     }
     if ( capacity < 1 ) {
       throw RangeError( 'capacity must be greater than 0' );
     }
     this.boundary = boundary;
     this.capacity = capacity;
     this.points = [];
     this.divided = false;
   }

   subdivide() {
     let x = this.boundary.x;
     let y = this.boundary.y;
     let w = this.boundary.w / 2;
     let h = this.boundary.h / 2;

     let ne = new Rectangle( x + w, y - h, w, h );
     this.northeast = new QuadTree( ne, this.capacity );
     let nw = new Rectangle( x - w, y - h, w, h );
     this.northwest = new QuadTree( nw, this.capacity );
     let se = new Rectangle( x + w, y + h, w, h );
     this.southeast = new QuadTree( se, this.capacity );
     let sw = new Rectangle( x - w, y + h, w, h );
     this.southwest = new QuadTree( sw, this.capacity );

     this.divided = true;
   }

   insert( point ) {
     if ( !this.boundary.contains( point ) ) {
       return false;
     }

     if ( this.points.length < this.capacity ) {
       this.points.push( point );
       return true;
     }

     if ( !this.divided ) {
       this.subdivide();
     }

     return ( this.northeast.insert( point ) || this.northwest.insert( point ) ||
       this.southeast.insert( point ) || this.southwest.insert( point ) );
   }

   query( range, found ) {
     if ( !found ) {
       found = [];
     }

     if ( !range.intersects( this.boundary ) ) {
       return found;
     }

     for ( let p of this.points ) {
       if ( range.contains( p ) ) {
         found.push( p );
       }
     }
     if ( this.divided ) {
       this.northwest.query( range, found );
       this.northeast.query( range, found );
       this.southwest.query( range, found );
       this.southeast.query( range, found );
     }

     return found;
   }

 }

 // Flocking boids NOT IMPLEMENTED
 class BoidTree extends QuadTree {
   insert( boid ) {
     if ( !this.boundary.contains( boid.position ) ) {
       return false;
     }

     if ( this.points.length < this.capacity ) {
       this.points.push( boid );
       return true;
     }

     if ( !this.divided ) {
       this.subdivide();
     }

     return ( this.northeast.insert( boid ) || this.northwest.insert( boid ) ||
       this.southeast.insert( boid ) || this.southwest.insert( boid ) );
   }

   query( range, found ) {
     if ( !found ) {
       found = [];
     }

     if ( !range.intersects( this.boundary ) ) {
       return found;
     }

     for ( let p of this.points ) {
       if ( range.contains( p.position ) ) {
         found.push( p );
       }
     }
     if ( this.divided ) {
       this.northwest.query( range, found );
       this.northeast.query( range, found );
       this.southwest.query( range, found );
       this.southeast.query( range, found );
     }

     return found;
   }
 }

 /********************************************************************************/

 // TILE GRID
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

   /**
    * Return adjacent Tiles
    * @param {function(Tile, number, Array):boolean} filterCallback - Function to help specify which neighbors to select
    * @param {boolean} [diagonal] - Boolean to include diagonal neighbors
    * @returns {Tile[]} Array of Tile Objects
    */
   neighbors( filterCallback = null, diagonal = false ) {
     const neighbors = [];
     const checkNeighbor = ( acc, current ) => {
       if ( this.grid.inBounds( current.x, current.y ) ) {
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

     cardinals.reduce( checkNeighbor, neighbors );

     if ( diagonal ) {
       //diagonals
       const diagonals = [
         { x: this.x + 1, y: this.y - 1 },
         { x: this.x + 1, y: this.y + 1 },
         { x: this.x - 1, y: this.y + 1 },
         { x: this.x - 1, y: this.y - 1 },
       ]

       diagonals.reduce( checkNeighbor, neighbors );
     }

     if ( filterCallback && typeof filterCallback == "function" ) {
       return neighbors.filter( filterCallback );
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
