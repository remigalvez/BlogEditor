var express = require('express');
var path = require('path');
var app = express();
var port = 5000;
var db = require('./db/db');

var moment = require('moment');
// Store all feeds
var feeds = [];
db.getFeeds(function (data) {
	feeds = data;
});
// Store all tags with count
var tags = [];
db.getTags(function (data) {
	tags = data;
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

var server = app.listen(port);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	// Initial call to setup the app
	socket.emit('initial', {
		feeds: feeds,
		tags: tags
	});

	// Call to publish feed
	socket.on('publish-feed', function (payload) {
		payload.timestamp = moment().format();
		payload.vote_up = 0;
		payload.vote_down = 0; 

		db.pushFeed(payload, function (id) {
			payload.id = id;
			broadcastState();
		});
	});

	// Call to get comments
	socket.on('get-comments', function (payload) {
		db.getComments(payload.key, function (comments) {
			socket.emit('get-comments', { 
				feed_id: payload.key, 
				comments: comments 
			});
		});
	});

	// Call to publish single comment
	socket.on('publish-comment', function (payload) {
		payload.timestamp = moment().format();
		payload.vote_up = 0;
		payload.vote_down = 0;

		db.pushComment(payload, function (id) {
			payload.id = id;
			io.sockets.emit('publish-comment', { 
				feed_id: payload.feed_id,
				comment: payload
			});
		});
	});

	// Call to delete feed and feed comments
	socket.on('delete-feed', function (payload) {
		db.deleteFeed(payload.id, function () {
			broadcastState();
		});
	});

	// Call to edit feed
	socket.on('edit-feed', function (payload) {
		db.editFeed(payload, function () {
			broadcastState();
		});
	});

	// Call to create user
	socket.on('create-user', function (payload) {
		db.createUser(payload, function (user) {
			console.log(user);
		});
	});

});

var broadcastState = function () {
	updateState(function () {
		console.log(feeds);
		io.sockets.emit('update-state', {
			tags: tags, 
			feeds: feeds,
		});
	});
};

var updateState = function (callback) {
	updateFeeds(function () {
		updateTags(function () {
			callback();
		});
	});	
};

var updateFeeds = function (callback) {
	db.getFeeds(function (data) {
		feeds = data;
		callback();
	});
};

var updateTags = function (callback) {
	db.getTags(function (data) {
		tags = data;
		callback();
	});
};

console.log('Server running on port %d', port);