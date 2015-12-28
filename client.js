var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/app');
// Define Router variables
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// Define app variables
var FeedPage = require('./components/FeedPage');

// Route app
ReactDOM.render((
	<Router>
		<Route component={App}>
			// Insert routes here
			<Route path='/' component={FeedPage}/>
		</Route>
	</Router>
), document.getElementById('react-container'));