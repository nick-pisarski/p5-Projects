class ProjectItem {
  constructor( title, description, folder, resources ) {
    this.title = title;
    this.description = description;
    this.folder = folder;
    this.resources = resources;
  }
}

class Resource {
  constructor( title, url ) {
    this.title = title;
    this.url = url;
  }
}

// Projects
const PROJECT_LIST = [
  new ProjectItem( "Falling Balls", "Create Ball objects that are affected by physics", "DroppingBalls" ),
  // new ProjectItem( "A* Path Finder", "A simulation demostrating an A* search algorithm", "APathFinder",
  //   [
  //     new Resource( 'Wikipedia - A* Search', 'https://en.wikipedia.org/wiki/A*_search_algorithm' )
  //   ] ),
  // new ProjectItem( "Cannon", "A project to create a cannon to shoot projectiles.", "Cannon" ),
  new ProjectItem( "Chaos Game",
    "Creation of the Chaos Game. Need to add HTML elements to control various aspects.",
    "ChaosGame",
    [
      new Resource( 'Wikipedia - Chaos Game', 'https://en.wikipedia.org/wiki/Chaos_game' )
    ] ),
  // new ProjectItem( "Flocking Boids", "A small flocking simulation that implements Craig Reynold's flocking behavior",
  //   "FlockingBoids",
  //   [
  //     new Resource( 'Wikipedia - Boids', 'https://en.wikipedia.org/wiki/Boids' ),
  //     new Resource( 'Wikipedia - Flocking Behavior', 'https://en.wikipedia.org/wiki/Flocking_(behavior)' ),
  //     new Resource( 'Craig Reynold\'s flocking behavior', 'http://www.red3d.com/cwr/boids/' )
  //   ] ),
  new ProjectItem( "Lissajous Curves *", "A recreation of the Lissajous Curve Table", "LissajousCurve",
    [
      new Resource( 'Wikipedia - Lissajous', 'https://en.wikipedia.org/wiki/Lissajous_curve' )
    ] ),
  // new ProjectItem( "Physics Objects", "Project to create a libray of objects that use physics.", "PhysicsObjects" ),
  // new ProjectItem( "User Controlled Object",
  //   "Project to create a objects that are controlled by the user and affected by physics.", "UserCtrlObj" ),
]
