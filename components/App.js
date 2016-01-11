var React = require('react');
var ReactDOM = require('react-dom');
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
			tags: [],
			feeds: [],
			comments: [],
			activeComments: []
		};
	},

	componentWillMount() {
		// TODO: replace localhost by server address
		this.socket = io('http://localhost:5000/');
		this.socket.on('connect', this.connect);
		this.socket.on('initial', this.initial);
		this.socket.on('get-comments', this.getComments);
		this.socket.on('publish-comment', this.onCommentPublished);
		this.socket.on('update-state', this.updateState);
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

	updateState(payload) {
		this.setState(payload);
	},

	getComments(payload) {
		var comments = this.state.comments;
		if (this.state.activeComments.indexOf(payload.feed_id) < 0) {
			this.state.activeComments.push(payload.feed_id);
		}
		// Push new comments to comments props
		payload.comments.forEach(function (comment) {
			comments.push(comment);
		});
		this.setState({ comments: comments });
	},

	onCommentPublished(payload) {
		if (this.state.activeComments.indexOf(payload.feed_id) >= 0) {
			var comments = this.state.comments;
			comments.push(payload.comment);
			this.setState({ comments: comments });
		}
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