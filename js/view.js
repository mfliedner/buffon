const Simulation = require('./simulation');

const View = function ($el) {
  this.context = canvas.getContext('2d');
  this.width = canvas.width;
  this.height = canvas.height;
}

View.prototype.init = function() {
  const simulation = new Simulation(this.context, this.width, this.height);
  simulation.grid();
};

module.exports = View;
