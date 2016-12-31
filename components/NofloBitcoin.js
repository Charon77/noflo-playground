/* jshint strict: true , esversion:6, multistr: true */

const 
	bitcoin = require('node-bitcoin'),
	noflo = require('noflo')
;


exports.getComponent = () => {
  "use strict";
  "multistr";
  const component = new noflo.Component();
  component.description = "This component receives data on a single input\
  port and sends the same data out to the output port";

  // Register ports and event handlers
  component.inPorts.add('in', { datatype: 'bang' }, function(event, payload) {
    switch (event) {
      case 'data':
        // Forward data when we receive it.
        // Note: send() will connect automatically if needed
        return component.outPorts.out.send(data);
      case 'disconnect':
        // Disconnect output port when input port disconnects
        return component.outPorts.out.disconnect();
    }
  });
  component.outPorts.add('out', { datatype: 'all' });

  return component; // Return new instance
};