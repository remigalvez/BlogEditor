var pg = require('pg');
var db = process.env.DATABASE_URL || 'postgres://localhost:5432/apv_db';

_this = {

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
				[ key ]
			);

			query.on('row', function (row) {
				// TODO: Get comments
				comments.push(row);
			});

			query.on('end', function () {
				if (callback) { callback(comments); }
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
				if (callback) { callback(id); }
				done();
			});
		});
	},



	deleteComments: function (data, callback) {
		pg.connect(db, function (err, client, done) {
			var query = client.query(
				'DELETE FROM comments' + 
				' WHERE feed_id = $1;',
				[ data.feed_id ] 
			);

			query.on('end', function () {
				if (callback) { callback(); }
				done();
			});
		});
	}

};

module.exports = _this;