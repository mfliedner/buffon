const Simulation = function(c, w, h) {
  this.context = c;
  this.width  = w;
  this.height = h;

  this.nboards = 8;
  this.interval = Math.floor(this.height / this.nboards);
  this.needleLength = this.interval;

  this.count = 0;
  this.hit = 0;
  this.running = false;
  this.max = 0;
};

// generates empty grid of `nboards` horizontally
// oriented floor boards on canvas
Simulation.prototype.setGrid = function () {
  const ctx = this.context;
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 1;
  ctx.clearRect(0, 0, this.width, this.height);
  ctx.beginPath();
  for (let i = 1; i < this.nboards; i++) {
    ctx.moveTo(0, i*this.interval);
    ctx.lineTo(this.width, i*this.interval);
    ctx.stroke();
  }
}

// inititiates needle drop simulation on Grid
Simulation.prototype.run = function () {

  // set up canvas with horizontal with `nboards` floor boards
  this.setGrid();

  const self = this;

  // start simulation
  document.getElementById('start').addEventListener('click', function()
    {
      self.running = true;
      setTimeout(self.dropNeedle.bind(self), 200);
    }
  );

  // stop simulation
  document.getElementById('stop').addEventListener('click', function()
    {
      self.running = false;
    }
  );

  // reset simulation
  document.getElementById('new').addEventListener('click', function()
    {
      self.running = false;
      self.count = 0;
      self.hit = 0;
      self.showStats();

      // reset grid to empty
      self.setGrid();

      setTimeout(self.dropNeedle.bind(self), 200);
    }
  );

  // run fixed length simulation
  document.getElementById('max').addEventListener('click', function()
    {
      self.max = document.getElementById('max').value;
    }
  );
};

Simulation.prototype.dropNeedle = function () {
  const ctx = this.context;
  const r = this.needleLength / 2;
  const yrange = this.interval / 2.0 + this.height;

  if (this.max > 0 && this.count >= this.max) {
    this.running = false;
  }

  if (this.running) {
    this.count++;

    // generate new needle with random position and orientation
    const x = Math.floor(this.width * Math.random());
    const y = Math.floor(yrange * Math.random());
    const phi = 2 * Math.PI * Math.random();

    // determine hit or miss
    const x1 = x - r * Math.cos(phi);
    const y1 = y - r * Math.sin(phi);
    const y1a = Math.floor(y1 + this.interval) % (2*this.interval);
    const x2 = x + r * Math.cos(phi);
    const y2 = y + r * Math.sin(phi);
    const y2a = Math.floor(y2 + this.interval) % (2*this.interval);
    if ( (y1a - this.interval) * (y2a - this.interval) < 0 ) {
      this.hit++;
      ctx.strokeStyle = "green";
    } else {
      ctx.strokeStyle = "red";
    }

    // draw new needle with appropriate color
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.floor(x1), Math.floor(y1));
    ctx.lineTo(Math.floor(x2), Math.floor(y2));
    ctx.stroke();

    this.showStats();

    setTimeout(this.dropNeedle.bind(this), 10);
  }
};

// report updated result on document
Simulation.prototype.showStats = function() {
    const miss = this.count - this.hit;
    let fraction = 1;
    if (this.count > 0) {
      fraction = this.hit / this.count;
    }
    let estimate = 2 * this.needleLength / this.interval / fraction;
    estimate = estimate.toFixed(7);
    document.getElementById('count').innerHTML = this.count;
    document.getElementById('hits').innerHTML = this.hit;
    document.getElementById('misses').innerHTML = miss;
    document.getElementById('estimate').innerHTML = estimate;
};

module.exports = Simulation;
