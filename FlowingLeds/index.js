const Led = require('../Led');
const Button = require('../Button');

const orderedPins = [ 6, 12, 24, 19, 20, 13, 16, 25, 26, 21 ];

class FlowingLeds {
  constructor() {
    this.count = 0;
    this.direction = 'up';
    this.orderedPins = [ 6, 12, 24, 19, 20, 13, 16, 25, 26, 21 ];
    this.leds = this.createLeds();

    this.close = this.close.bind(this);
    this.flow = this.flow.bind(this);
  }

  createLeds() {
    return this.orderedPins.map(pin => new Led(pin));
  }

  turnOnAll() {
    this.leds.forEach(led => led.turnOn());
  }

  turnOffAll() {
    this.leds.forEach(led => led.turnOff());
  }

  close() {
    this.leds.forEach(led => led.unexport());
  }

  flow() {
    setInterval(() => {
      this.turnOffAll();
      if (this.count === 0) this.direction = 'up';
      else if(this.count >= this.leds.length) this.direction = 'down';
      if (this.direction === 'down') this.count--;
      this.leds[this.count].turnOn();
      if (this.direction === 'up') this.count++;
    }, 100);
  }
}

const flowingLeds = new FlowingLeds();
// flowingLeds.turnOnAll();

flowingLeds.flow();
// setTimeout(flowingLeds.close, 5000);

process.on('SIGINT', flowingLeds.close); //function to run when user closes using ctrl+c
