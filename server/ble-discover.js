const Bleacon = require('bleacon');

Bleacon.on('discover', (bleacon) => {
  console.log(bleacon);
});

Bleacon.startScanning();

