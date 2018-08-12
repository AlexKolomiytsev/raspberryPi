const Gpio = require('onoff').Gpio;

class Button {
  constructor(pin) {
    this.button = new Gpio(pin, 'in', 'both');

    this.watch = this.watch.bind(this);
  }

  watch(callback) {
    this.watchCallback = callback;
    this.button.watch(callback);
  }

  unexport() {
    this.button.unexport();
    if (this.watchCallback) {
      this.button.unwatch(this.watchCallback);
    }
  }
}

module.exports = Button;
