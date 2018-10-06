//forces
let gravity, wind;

//actions
let jump;

//entities
let entities = [];

//config
let numEntities = 1

function setup() { 
    createCanvas(1000, 400);
    
    entity = new Cannon(0, height, 100);
    // gravity = createVector(0, 0.0001);
    // wind = createVector(0.0001, 0.0001);
    // jump = createVector(0, -0.005);
    
    // createEntities();   
  } 
  
  function draw() { 
    background(0);    
    entity.update();
    showStats();
  }

  function mouseClicked(){
    entity.fire();
    console.log('Firing', entity)
  }

  function keyPressed(){
    if(keyCode === 82){
      entity.reload();
    }
  }

  function showStats(){
      fill(255);
      stroke(127)
      text(`Ammo: ${entity.ammo_count}`,25,25)
      if(entity.ammo_count < 1){
        fill(255, 0 ,0);
        stroke(127, 0 , 0)
        text('RELOAD',25,50)
      }
  }
  
  function createEntities(){
    for(let i = 0; i < numEntities; i++){
        entities.push(new Bomb(0, height, 50, {stroke: color(random(255), random(255), random(255))}))
      }
  }

  function updateEntities(callback) {
    for(let i = 0; i < numEntities; i++){
      try {
        callback(entities[i]);
      } catch (error){}
      entities[i].update();
      entities[i].shoot();
    }
  }