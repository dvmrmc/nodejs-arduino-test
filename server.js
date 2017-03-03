var SerialPort = require('serialport');
var portName = "/dev/cu.usbmodem1411";
var port = new SerialPort(portName, {
  baudRate: 9600,
  autoOpen:true,
  flowControl: false,
  parser: SerialPort.parsers.readline('\r\n')
});

port.on('data', function(input) {
    console.log("Node receives: ", input);
});
port.on('open', function(open_error) {

    if(open_error){
        console.error(open_error.message);
    } else {
        console.log("OPEN");
    }
});

setTimeout(function() {
    console.log("SENDING");
    if(port.isOpen()) {
        port.write('Hello from Node!', function(write_error) {
            if(write_error) {
                console.error(write_error.message);
            }
            console.log("SENT");
        });
    } else {
        console.error("PORT CLOSED");
    }
}, 3000);
