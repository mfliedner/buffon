const Simulation = require('./simulation');

const View = function ($el) {
  this.canvas = document.getElementById($el);
  this.context = canvas.getContext('2d');
  this.container = document.getElementById('container');

  this.stopped = false;
}

View.prototype.init = function() {
  // this.resizeCanvas();
  // window.addEventListener('resize', this.resizeCanvas);

  const simulation = new Simulation(this.context);
  simulation.grid();

  document.getElementById('start').addEventListener('click', function()
    {
      this.stopped = false;
      startSim();
    }
  );
  document.getElementById('stop').addEventListener('click', function()
    {
      this.stopped = true;
    }
  );
};

View.prototype.resizeCanvas = function(e) {
  $(this.canvas).attr('width', $(this.container).width());
  $(this.canvas).attr('height', $(this.container).height());
};

module.exports = View;
