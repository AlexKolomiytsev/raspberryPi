const Gpio = require('onoff').Gpio;
const { HIGH, LOW } = Gpio;

class Led {
  constructor(pin) {
    this.led = new Gpio(pin, 'out');

    this.changeState = this.changeState.bind(this);
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
  }

  changeState(value) {
    this.led.writeSync(value);
  }

  turnOn() {
    this.changeState(HIGH);
  }

  turnOff() {
    this.changeState(LOW);
  }

  unexport() {
    this.turnOff();
    this.led.unexport();
  }

  get currentState() {
    return this.led.readSync();
  }

  get isTurnedOn() {
    return this.currentState === HIGH;
  }

  get isTurnedOff() {
    return this.currentState === LOW;
  }
}

module.exports = Led;
