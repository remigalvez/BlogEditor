var pg = require('pg');
var db = process.env.DATABASE_URL || 'postgres://localhost:5432/apv_db';

_this = {

	getTags: function (callback) {
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			var tagData = [];

			var query = client.query(
				'SELECT tag, COUNT(*)' +
				' FROM tags' + 
				' GROUP BY tag;'
			);

			query.on('row', function (payload) {
				tagData.push(payload);
			});

			query.on('end', function () {
				if (callback) { callback(tagData); }
				done();
			});
		});
	},

	pushTags: function (data, callback) {
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			// Combien tag values into single line
			// ie. (feed_id, value_1), (feed_id, value_2), ..., (feed_id, value_n)
			var values = '(' + data.feed_id + ', \'' + data.tags[0] + '\')';
			for (var i = 1; i < data.tags.length; i++) {
				values = values + ', (' + data.feed_id + ', \'' + data.tags[i] + '\')';
			}

			// Parse query
			var q = 'INSERT INTO tags(feed_id, tag)' + 
					' VALUES' + values + ';';

			// Send query
			var query = client.query(q);

			query.on('end', function () {
				if (callback) { callback(); }
				done();
			});

		});
	},

	deleteTags: function (data, callback) {
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			var query = client.query(
				'DELETE FROM tags' + 
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