var express = require('express');
var path = require('path');
var app = express();
var port = 5000;

var feeds = [
	{ message: 'Hi guys, welcome to my channel!' },
	{ message: 'Check this article out!' }
];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

var server = app.listen(port);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	socket.emit('initial', {
		feeds: feeds
	});

	socket.on('post', function (payload) {
		// Send payload to database
		console.log('Feed posted: %j', payload);
		feeds.push(payload);
		this.emit('post', feeds);
	});
});

console.log('Server running on port %d', port);