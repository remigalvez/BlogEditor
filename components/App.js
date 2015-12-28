var React = require('react');
var io = require('socket.io-client');

// Define app components
var Header = require('./parts/Header');

var App = React.createClass({
	
	getInitialState() {
		return {
			// Define state variables
			connected: false,
			admin: true,
			title: '',
			feeds: []
		};
	},

	componentWillMount() {
		// TODO: replace localhost by server address
		this.socket = io('http://localhost:5000/');
		this.socket.on('connect', this.connect);
		this.socket.on('initial', this.initial);
		this.socket.on('post', this.updateFeed);
	},

	emit(eventName, payload) {
		this.socket.emit(eventName, payload);
	},

	connect() {
		this.setState({ connected: true });
	},

	initial(payload) {
		this.setState(payload);
	},

	updateFeed(payload) {
		this.setState({ feeds: payload });
	},

	render() {

		var s = this.state;
		s.emit = this.emit;

		var RouteHandler = React.Children.map(this.props.children, function (child) {
			return React.cloneElement(child, s);
		});

		return (
			<div>
				<Header {...this.state} />
				{ RouteHandler }
			</div>
		);
	}
});

module.exports = App;