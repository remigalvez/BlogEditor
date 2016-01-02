var pg = require('pg');
var db = process.env.DATABASE_URL || 'postgres://localhost:5432/apv_db';

module.exports = {

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
				callback(feeds);
				done();
			})
		});
	},

	getComments: function (key, callback) {
		var comments = [];
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			var query = client.query(
				'SELECT * FROM comments' + 
				' WHERE feed_id = $1' + 
				' ORDER BY timestamp', 
				[key]
			);

			query.on('row', function (row) {
				// TODO: Get comments
				comments.push(row);
			});

			query.on('end', function () {
				callback(comments);
				done();
			});

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
				'INSERT INTO feed(title, message, timestamp) ' +
				'values($1, $2, $3) RETURNING id;', [data.title, data.message, data.timestamp],
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
				callback(id);
				done();
			});
		});
	},

	pushComment: function (data, callback) {
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			var id = -1;

			var query = client.query(
				'INSERT INTO comments' + 
				' (user_id, user_name, feed_id, comment, timestamp)' +
				' values ($1, $2, $3, $4, $5) RETURNING id;',
				[data.user_id, data.user_name, data.feed_id, data.comment, data.timestamp],
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
				callback(id);
				done();
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
				callback();
				done();
			});

			// Delete comments
			var comments_query = client.query(
				'DELETE FROM comments' + 
				' WHERE feed_id = $1;',
				[ id ] 
			);

			comments_query.on('end', function () {
				done();
			});

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
				' SET title=$1, message=$2' + 
				' WHERE id=$3',
				[ payload.title, payload.message, payload.id ]
			);

			query.on('end', function () {
				callback();
				done();
			});

		});
	}

}