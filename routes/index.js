var express = require('express');
var router = express.Router();
// var pg = require('pg');

var feedComponent = require('../views/components/feed.js');
var rFeedComponent = React.createFactory(feedComponent);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/feed', function (req, res, next) {
	var rfc = rFeedComponent();
	var staticMarkup = React.renderToString(rfc);
	res.render('pages/index', {feedMarkup: staticMarkup});
});

// router.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// });

module.exports = router;
