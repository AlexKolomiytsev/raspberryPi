const Gpio = require('onoff').Gpio;

class SoundSensor {
  constructor(pin) {
    this.sensor = new Gpio(pin, 'in', 'both', { debounceTimeout: 200 });

    this.close = this.close.bind(this);
  }

  watch() {
    this.sensor.watch((err) => {
      if (err) {
        console.log('err -- ', err);
      }
      console.log(`Sound delected at ${new Date().toISOString()}`);
    })
  }

  close() {
    this.sensor.unexport();
    this.sensor.unwatchAll();
  }
}

const soundSensor = new SoundSensor(5);

soundSensor.watch();

process.on('SIGINT', soundSensor.close);


