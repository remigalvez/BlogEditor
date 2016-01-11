var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/app');

// Define Router variables
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// Define app variables
var FeedPage = require('./components/FeedPage');
var LoginPage = require('./components/LoginPage');
var TextEditor = require('./components/parts/TextEditor');
var TagBar = require('./components/parts/TagBar');
var loader = require('./components/loaders/loader');

// Route app
ReactDOM.render((
	<Router>
		<Route component={App}>
			// Insert routes here
			<Route path='/' component={FeedPage} />
			<Route path='/login' component={LoginPage} />
			<Route path='/editor' component={TextEditor} />
			<Route path='/tag' component={TagBar} />
			<Route path='/loader' component={loader} />
		</Route>
	</Router>
), document.getElementById('react-container'));