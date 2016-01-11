var pg = require('pg');
var db = process.env.DATABASE_URL || 'postgres://localhost:5432/apv_db';

var user = require('./dbUser');
var feed = require('./dbFeed');
var comments = require('./dbComments');
var tags = require('./dbTags');

_this = {

	/////////////////////
	//// GET METHODS ////
	/////////////////////

	getFeeds: function (callback) {
		return feed.getFeeds(callback);
	},

	getComments: function (key, callback) {
		return comments.getComments(key, callback);
	},

	getTags: function (callback) {
		return tags.getTags(callback);
	},

	//////////////////////
	//// PUSH METHODS ////
	//////////////////////

	pushFeed: function (data, callback) {
		return feed.pushFeed(data, callback);
	},

	pushTags: function (data, callback) {
		return tags.pushTags(data, callback);
	},

	pushComment: function (data, callback) {
		return comments.pushComment(data, callback);
	},

	////////////////////////
	//// DELETE METHODS ////
	////////////////////////

	deleteFeed: function (id, callback) {
		return feed.deleteFeed(id, callback);
	},

	deleteComments: function (data, callback) {
		return comments.deleteComments(data, callback);
	},

	deleteTags: function (data, callback) {
		return tags.deleteTags(data, callback);
	},

	//////////////////////
	//// EDIT METHODS ////
	//////////////////////

	editFeed: function (payload, callback) {
		return feed.editFeed(payload, callback);
	},

	//////////////////////
	//// USER METHODS ////
	//////////////////////

	createUser: function (payload, callback) {
		return user.createUser(payload, callback);
	}


}

module.exports = _this;