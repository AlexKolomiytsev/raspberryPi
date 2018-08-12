const Button = require('../Button');
const Led = require('../Led');

class ButtonLed {
  constructor(buttonPin, ledPin) {
    this.button = new Button(buttonPin);
    this.led = new Led(ledPin);

    this.watch = this.watch.bind(this);
    this.close = this.close.bind(this);
  }

  watch() {
    this.button.watch((err, value) => {
      if (err) {
        console.error('There was an error', err);
        return;
      }

      this.led.changeState(value);
    })
  }

  close() {
    this.led.unexport();
    this.button.unexport();
  }
}

const buttonLed = new ButtonLed(23, 18);
buttonLed.watch();

process.on('SIGINT', buttonLed.close); //function to run when user closes using ctrl+c
