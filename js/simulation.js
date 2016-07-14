const Simulation = function(c) {
  this.c = c;
  this.r = 50;
  this.count = 0;
  this.hit = 0;
}

Simulation.prototype.grid = function () {
  this.c.clearRect(0, 0, 1200, 800);
  this.c.beginPath();
  this.c.strokeStyle = "rgba(255,255,0,0.95)";
  this.c.lineWidth = 1;
  for (let i = 1; i <= 7; i++) {
    this.c.moveTo(0, i*100);
    this.c.lineTo(1200, i*100);
    this.c.stroke();
  }
  setTimeout(this.needle.bind(this), 200);
};

Simulation.prototype.needle = function () {
  const ref = 2 / Math.PI;
  this.count++;
  const x = Math.floor(1200.0 * Math.random());
  const y = Math.floor(850.0 * Math.random());
  const phi = 2 * Math.PI * Math.random();
  const x1 = x - this.r * Math.cos(phi);
  const y1 = y - this.r * Math.sin(phi);
  const y1a = Math.floor(y1 + 100) % 200;
  const x2 = x + this.r * Math.cos(phi);
  const y2 = y + this.r * Math.sin(phi);
  const y2a = Math.floor(y2 + 100) % 200;
  if ( (y1a - 100) * (y2a - 100) < 0 ) {
    this.hit++;
    this.c.strokeStyle = "rgb(0,255,0)";
  } else {
    this.c.strokeStyle = "rgb(255,0,0)";
  }
  const fraction = this.hit / this.count;
  const miss = this.count - this.hit;
  this.c.lineWidth = 1;
  this.c.beginPath();
  this.c.moveTo(Math.floor(x1), Math.floor(y1));
  this.c.lineTo(Math.floor(x2), Math.floor(y2));
  this.c.stroke();
  this.c.clearRect(0, 720, 1200, 800);
  this.c.font="40px Georgia"; this.c.strokeStyle="rgb(0,255,0)";       this.c.lineWidth=1; this.c.strokeText(this.hit,400,760);
  this.c.font="20px Georgia"; this.c.strokeStyle="rgba(0,255,0,0.5)";  this.c.strokeText("hit",400,790);
  this.c.font="40px Georgia"; this.c.strokeStyle="rgb(255,0,0)";       this.c.strokeText(miss,520,760);
  this.c.font="20px Georgia"; this.c.strokeStyle="rgba(255,0,0,0.5)";  this.c.strokeText("miss",520,790);
  this.c.font="40px Georgia"; this.c.strokeStyle="rgb(255,255,255)";   this.c.strokeText(this.count,640,760);
  this.c.font="20px Georgia"; this.c.strokeStyle="rgba(255,255,255,0.5)";  this.c.strokeText("count",640,790);
  this.c.font="20px Georgia"; this.c.strokeStyle="rgb(255,255,0)";     this.c.strokeText(fraction,10,760);
  this.c.font="20px Georgia"; this.c.strokeStyle="rgb(255,255,0)";     this.c.strokeText("hit/count",250,760);
  this.c.font="20px Georgia"; this.c.strokeStyle="rgba(255,255,0,0.5)";this.c.strokeText(ref,10,790);
  this.c.font="20px Georgia"; this.c.strokeStyle="rgba(255,255,0,0.5)";this.c.strokeText("=2/Pi",250,790);
  setTimeout(this.needle.bind(this), 10);
};

module.exports = Simulation;
