//forces
let gravity, wind;

//actions
let jump;

//entities
let entities = [];

//config
let numEntities = 1

function setup() { 
    createCanvas(600, 600);
    
    entity = new Entity(width/2, height);
    gravity = createVector(0, 0.0001);
    wind = createVector(0.0001, 0.0001);
    jump = createVector(0, -0.005);
    
    createEntities();   
  } 
  
  function draw() { 
    background(0);

    updateEntities((entity) => {
      entity.applyForce(gravity);  
      if(mouseIsPressed){
          entity.applyForce(jump);
        }
    })
  }

function createEntities(){
   for(let i = 0; i < numEntities; i++){
      entities.push(new Entity(random(width-2), 0, random(20, 60), {stroke: color(random(255), random(255), random(255))}))
    }
}

function updateEntities(callback) {
   for(let i = 0; i < numEntities; i++){
     try {
       callback(entities[i]);
     } catch (error){}
    entities[i].update();
  }
}