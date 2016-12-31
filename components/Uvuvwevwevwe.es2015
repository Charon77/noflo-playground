var noflo = require("noflo");

exports.getComponent = function() {
  var component = new noflo.Component;
  component.description = "This component receives data on a single input\
  port and sends the same data out to the output port";
  component.icon = "male"

  // Register ports and event handlers
  component.inPorts.add('in', { datatype: 'bang', addressable: true }, (event, payload, index) => {
    switch (event) {
      case 'data':
        // Forward data when we receive it.
        // Note: send() will connect automatically if needed
        let ugwem = "Uvuvwevwevwe Unyetenyevwe Ugwemugwem Osas"
        console.log(index, ugwem);
        return component.outPorts.out.send(index + ugwem);
      case 'disconnect':
        // Disconnect output port when input port disconnects
        return component.outPorts.out.disconnect();
    }
  });
  component.outPorts.add('out', { datatype: 'all' });

  return component; // Return new instance
};