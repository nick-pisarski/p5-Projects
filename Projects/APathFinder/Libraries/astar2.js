function AStar( map, start, end, allowDiagonal = false, distance = 'MAN' ) {
  this.map = map;
  this.start = start;
  this.end = end;
  this.lastCheckedNode = start;

  this.openSet = [];
  this.openSet.push( start );
  this.closedSet = [];
  this.distance = distance;
  this.allowDiagonal = allowDiagonal;

  //function to determine score for two node
  this.heuristic = function ( a, b ) {
    if ( this.disatnce === 'VISUAL' )
      return sqrt( abs( a.col - b.col ) + abs( a.row - b.row ) );
    return abs( a.col - b.col ) + abs( a.row - b.row )
  };

  // Function to delete element from the array
  this.removeFromArray = function ( arr, elt ) {
    const index = arr.indexOf( elt );
    arr.splice( index, 1 );
  }

  this.path = function () {
    path = [];
    var temp = this.lastCheckedNode;
    path.push( temp );
    while ( temp.options.previous ) {
      path.push( temp.options.previous );
      temp = temp.options.previous;
    }
    return path
  }

  this.step = function () {
    if ( this.openSet.length > 0 ) {
      let winner = 0;
      for ( let i = 1; i < this.openSet.length; i++ ) {
        if ( this.openSet[ i ].options.f < this.openSet[ winner ].options.f ) {
          winner = i;
        }

        if ( this.openSet[ i ].options.f === this.openSet[ winner ].options.f ) {
          if ( this.openSet[ i ].options.g > this.openSet[ winner ].options.g ) {
            winner = i;
          }
        }
      }

      let current = this.openSet[ winner ];
      this.lastCheckedNode = current;

      //check if its the end
      if ( current === this.end ) {
        console.log( 'Done!' );
        return 1;
      }

      this.removeFromArray( this.openSet, current );
      this.closedSet.push( current );

      //checking the neighbors
      //need to repopulate open set;
      current.show( color( 0, 127, 255 ) );

      const neighbors = current.getNeighbors( this.allowDiagonal );

      neighbors.forEach( ( neighbor ) => {
        if ( !this.closedSet.includes( neighbor ) ) {
          var tempG = current.options.g + this.heuristic( current, neighbor );
          if ( !this.openSet.includes( neighbor ) ) {
            this.openSet.push( neighbor );
          } else if ( tempG >= neighbor.options.g ) {
            return;
          }
          neighbor.options.g = tempG;
          neighbor.options.h = this.heuristic( neighbor, this.end );
          neighbor.options.f = neighbor.options.g + neighbor.options.h;
          neighbor.options.previous = current;
        }
      } );

      return 0;
    } else {
      console.log( 'No Solution' );
      return -1;
    }
  }
}
