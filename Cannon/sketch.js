
let entity, gravity, wind, drag, friction;
let entities = [];
let numEntities = 3
function setup() { 
    createCanvas(400, 400);
    // entity = new Entity(width/2, height/2);
    gravity = createVector(0, 0.0001);
    wind = createVector(0.0001, 0.0001);
    drag = createVector(0.1, 0.1)
    
    for(let i = 0; i < numEntities; i++){
      entities.push(new Entity(random(width-2), 0, random(20, 60), {stroke: color(random(255), random(255), random(255))}))
    }
  } 
  
function draw() { 
  background(0);

  for(let i = 0; i < numEntities; i++){
    entities[i].applyForce(gravity);

    if(mouseIsPressed){
      entities[i].applyForce(wind)
    }
    entities[i].update();
  }
}

// function mousePressed(){
//   entity.applyForce(wind);
// }