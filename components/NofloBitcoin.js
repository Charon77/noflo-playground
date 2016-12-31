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
  
  let ticker = 'last';
  
  // Register ports and event handlers
  component.inPorts.add('ticker', { datatype: 'string', values: ['last', 'high', 'low'] }, function (event, payload) {
	  switch (event) {
		  case 'data': 
			ticker = payload;
			return ;
	  }
  });
  component.inPorts.add('in', { datatype: 'bang' }, function(event, payload) {
    switch (event) {
      case 'data':
        // Forward data when we receive it.
        // Note: send() will connect automatically if needed
        component.outPorts.promise.send(bitcoin.getPrice(ticker)
        	.then((lastPrice) => {
        	component.outPorts.out.send(lastPrice);
			return component.outPorts.out.disconnect();
        }));
      case 'disconnect':
        // Disconnect output port when input port disconnects
        component.outPorts.out.disconnect();
		return component.outPorts.promise.disconnect();
    }
  });
  component.outPorts.add('out', { datatype: 'all' });
  component.outPorts.add('promise', { datatype: 'all' });

  return component; // Return new instance
};