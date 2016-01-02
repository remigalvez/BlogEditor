var express = require('express');
var path = require('path');
var app = express();
var port = 5000;
var db = require('./db');

var moment = require('moment');

var feeds = [];

db.getFeeds(function (data) {
	feeds = data;
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

var server = app.listen(port);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	// Initial call to setup the app
	socket.emit('initial', {
		feeds: feeds
	});

	// Call to publish feed
	socket.on('publish-feed', function (payload) {
		// Send payload to database
		payload.timestamp = moment().format();
		payload.vote_up = 0;
		payload.vote_down = 0; 
		console.log('Feed posted: %j', payload);

		db.pushFeed(payload, function (id) {
			payload.id = id;
			feeds.push(payload);
			io.sockets.emit('update-feed', feeds);
		});
	});

	// Call to get comments
	socket.on('get-comments', function (payload) {
		db.getComments(payload.key, function (comments) {
			socket.emit('get-comments', { comments: comments });
		});
	});

	// Call to publish single comment
	socket.on('publish-comment', function (payload) {
		payload.timestamp = moment().format();
		payload.vote_up = 0;
		payload.vote_down = 0;

		db.pushComment(payload, function (id) {
			// TODO: notify all clients of change
			payload.id = id;
			socket.emit('publish-comment', { comments: [payload] });
		});
	});

	// Call to delete feed and feed comments
	socket.on('delete-feed', function (payload) {
		db.deleteFeed(payload.id, function () {
			// Call to get all feeds
			broadcastFeeds();
		});
	});

	// Call to edit feed
	socket.on('edit-feed', function (payload) {
		db.editFeed(payload, function () {
			// Call to get all feeds
			broadcastFeeds();
		});
	});

});

var broadcastFeeds = function () {
	db.getFeeds(function (data) {
		feeds = data;
		io.sockets.emit('update-feed', feeds);
	});
}

console.log('Server running on port %d', port);