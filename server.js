const express = require('express');
const path = require('path');
const ip = require('ip');
var server = express();

const Api = require('./server/api');
global.db = require('./server/db');

const SensorMonitor = require('./server/sensormonitor');

const port = 3000;

class App
{
	init()
	{
		// Monitor Sensors
		var monitor = new SensorMonitor();
		monitor.start((data) => {
			console.log(data);
		});

		server.use(express.static(path.join(__dirname, 'dist')));
		server.get('/_api', (req, res) => {

			var params = [];

			res.setHeader('Content-Type', 'application/json');
			var api = new Api({
				params: params
			}, (data) => {
				// Success
				res.send(JSON.stringify({result: data}));
			}, (err) => {
				// Failure
				res.send(JSON.stringify({error: err}));
			});
		});
		server.get('/_api/*', (req, res) => {
			var params = req.params[0].split('/');

			res.setHeader('Content-Type', 'application/json');
			var api = new Api({
				req: req,
				server_info: {
					port: port,
					addr: ip.address(),
				},
				params: params
			}, (data) => {
				// Success
				res.send(JSON.stringify({result: data}));
			}, (err) => {
				// Failure
				res.send(JSON.stringify({error: err}));
			});
		});
		server.get('/*', (req, res) => {
			res.sendFile(__dirname + '/dist/index.html');
		});
		server.listen(port, () => {
			console.log('Server running on port ' + port + '.')
		});
	}
}

var app = new App();
app.init();
