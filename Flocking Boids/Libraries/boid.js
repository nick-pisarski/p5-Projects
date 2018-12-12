// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    // configurations
    this.maxForce = 0.3;
    this.maxSpeed = 5;
  }

  align(boids) {
    let steering = createVector();
    for (let other of boids) {
      steering.add(other.velocity);
    }
    if (boids.length > 0) {
      steering.div(boids.length);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering.mult(alignSlider.value());
  }

  separation(boids) {
    let steering = createVector();
    for (let other of boids) {
      const d = this.position.dist(other.position);
      let diff = p5.Vector.sub(this.position, other.position);
      diff.div(d * d);
      steering.add(diff);
    }
    if (boids.length > 0) {
      steering.div(boids.length);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering.mult(separationSlider.value());
  }

  cohesion(boids) {
    let steering = createVector();
    for (let other of boids) {
      steering.add(other.position);
    }
    if (boids.length) {
      steering.sub(this.position);
      steering.div(boids.length);

      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering.mult(cohesionSlider.value());
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  flock(boids) {
    let neighbors = this.getNeighborBoids(boids);

    const alignment = this.align(neighbors);
    const cohesion = this.cohesion(neighbors);
    const separation = this.separation(neighbors);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update(flock) {
    this.edges();
    this.flock(flock);

    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(6);
    stroke(255);
    point(this.position.x, this.position.y);

    if (showPerception) {
      strokeWeight(1);
      stroke(0, 255, 0);
      noFill()
      ellipse(this.position.x, this.position.y, perceptionRange, perceptionRange)
    }
  }

  getNeighborBoids(boids) {
    return boids.filter(boid => {
      return this.isDifferentBoid(boid) && this.isInRange(boid);
    });
  }

  isDifferentBoid(boid) {
    return boid !== this;
  }

  isInRange(boid) {
    return dist(this.position.x, this.position.y, boid.position.x, boid.position.y) < perceptionRange;
  }

}