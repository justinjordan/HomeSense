const express = require('express');
const path = require('path');
var server = express();

const Api = require('./server/api');

const port = 3000;

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
server.listen(port, () => console.log('Server running on port ' + port + '.'));
