var pg = require('pg');
var db = process.env.DATABASE_URL || 'postgres://localhost:5432/apv_db';

var comments = require('./dbComments');
var tags = require('./dbTags');
	
_this = {

	getFeeds: function (callback) {
		var feeds = [];
		pg.connect(db, function (err, client, done) {
			if (err) {
				// Handle error
				console.log(err);
				done();
			}

			var query = client.query(
				'SELECT * FROM feed' +
				' ORDER BY timestamp;'
			);

			query.on('row', function (row) {
				feeds.push(row);
			});

			query.on('end', function () {
				if (callback) { callback(feeds); }
				done();
			})
		});
	},

	pushFeed: function (data, callback) {
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			var id = -1;

			var query = client.query(
				'INSERT INTO feed(title, tags, message, timestamp) ' +
				'values($1, $2, $3, $4) RETURNING id;', [data.title, data.tags, data.message, data.timestamp],
				function (err, result) {
					if (err) {
						// TODO: Handle error
						console.log(err);
					} else {
						id = result.rows[0].id;
					}
				}
			);

			query.on('end', function () {

				// Push tags to different schema

				var tags = {
					feed_id: id,
					tags: data.tags
				};

				tags.pushTags(tags, function () {
					if (callback) { callback(id); }
					done();
				});
			});


		});
	},

	deleteFeed: function (id, callback) {
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			// Delete feed
			var feed_query = client.query(
				'DELETE FROM feed' +
				' WHERE id = $1;',
				[ id ]
			);

			feed_query.on('end', function () {
				if (callback) { callback(); }
				done();
			});

			// Delete comments
			comments.deleteComments({ feed_id: id });

			tags.deleteTags({ feed_id: id});
			

		});
	},

	editFeed: function (payload, callback) {
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			var query = client.query(
				'UPDATE feed' + 
				' SET title=$1, tags=$2, message=$3' + 
				' WHERE id=$4',
				[ payload.title, payload.tags, payload.message, payload.id ]
			);

			tags.deleteTags({ feed_id: payload.id }, function () {
				tags.pushTags({ 
					feed_id: payload.id,
					tags: payload.tags
				});
			});

			query.on('end', function () {
				if (callback) { callback(); }
				done();
			});

		});
	}

};

module.exports = _this;