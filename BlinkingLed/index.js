const Led = require('../Led');

class BlinkingLED {
  constructor(pin) {
    if (!pin) throw new Error('No Pin Specified');
    this.led = new Led(pin);
    this.blinkingIntervalMS = 500;

    this.blinkLed = this.blinkLed.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    console.log(' :: Start blinking :: ');
    this.blinkInterval = setInterval(this.blinkLed, this.blinkingIntervalMS);
  }

  stop() {
    console.log(' :: Stop blinking :: ');
    clearInterval(this.blinkInterval);
    this.led.unexport();
  };

  blinkLed() {
    this.led.isTurnedOff
      ? this.led.turnOn()
      : this.led.turnOff()
  }
}

const led18 = new BlinkingLED(18);
led18.start();

setTimeout(led18.stop, 5000);
