var pg = require('pg');
var db = process.env.DATABASE_URL || 'postgres://localhost:5432/apv_db';

_this = {
	createUser: function (payload, callback) {
		pg.connect(db, function (err, client, done) {
			if (err) {
				// TODO: Handle error
				console.log(err);
				done();
			}

			var id = -1;

			var query = client.query(
				'INSERT INTO users(username, email, password)' +
				' values($1, $2, $3)' +
				' RETURNING id;', [payload.username, payload.email, payload.password],
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
				user = {
					id: id,
					username: payload.username,
					liked: [],
					comments: []
				};

				callback(user);
			});


		});
	}
}

module.exports = _this;