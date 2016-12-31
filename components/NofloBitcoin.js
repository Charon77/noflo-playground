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
  component.inPorts.add('ticker', { required: true, datatype: 'string', values: ['last', 'high', 'low'] });
  
  component.inPorts.add('in', { datatype: 'bang' });
  
  component.outPorts.add('out', { datatype: 'all' });
  
  noflo.helpers.WirePattern(
	component,
	{
		in: ["ticker", "in"],
		out: "out",
		async: true
	},
	function(data, groups, outPort, asyncDone) {
		bitcoin.getPrice(data.ticker)
		.then((lastPrice) => {
			asyncDone();
			return component.outPorts.out.send(lastPrice);			
		})
	}
  );
  
  return component; // Return new instance
};