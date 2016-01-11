var React = require('react');
var ReactDOM = require('react-dom');
var TagEditor = require('./TagEditor');
var TextEditor = require('./TextEditor');
var Display = require('./wrappers/Display');

var FeedEditor = React.createClass({
	// Set initial state values
	getInitialState() {
		return {
			actionSubmit: false,
			title: '',
			message: '',
			tags: [],
			tagsReceived: false,
			messageReceived: false
		}
	},
	// Called on state change -- Handle data submission to server
	componentWillUpdate(nextProps, nextState) {
		if (this.state == nextState) return;
		// Check if data was received from children
		if (nextState.actionSubmit && 
			nextState.messageReceived && 
			nextState.tagsReceived) {

			// Create feed object
			var feed = {
				title: nextState.title,
				tags: nextState.tags,
				message: nextState.message
			}

			if (this.props.feed) {
				feed.id = this.props.feed.id;
			}
			// Emit feed to server
			{this.props.sendFeed(feed)};
			// Reset states
			this.setState({ 
				actionSubmit: false,
				title: '',
				message: '',
				tags: [],
				tagsReceived: false,
				messageReceived: false
			});
		}
	},
	// Set `submit' state to true to notify child elements of submit event
	actionSubmit() {
		this.setState({ actionSubmit: true });
	}, 
	// Passed to `TagEditor' child -- called from child element on submit
	getTags(tags) {
		this.setState({ 
			tags: tags, 
			tagsReceived: true
		});
	},
	// Passed to `FeedEditor' child -- called from child element on submit
	getMessage(message, element) {
		// Get input values
		var title = ReactDOM.findDOMNode(this.refs.title).value;
		// Check empty fields
		if (message.trim() === "" || title.trim() === "") {
			return;
		}
		// Clear input fields
		ReactDOM.findDOMNode(this.refs.title).value = '';
		// Clear text field
		element.innerHTML = '';
		// Update states with received data
		this.setState({
			title: title,
			message: message,
			messageReceived: true
		});
	},

	render() {
		var title = (this.props.feed !== undefined) ? this.props.feed.title : '';
		return (
			<div>
				<input ref="title"
					   className="form-control"
					   placeholder="Title"
					   defaultValue={title}
					   required />
				<TagEditor sendTags={this.getTags} submit={this.state.actionSubmit} received={this.state.tagsReceived} feed={this.props.feed} />
				<TextEditor sendInnerHTML={this.getMessage} submit={this.state.actionSubmit} received={this.state.messageReceived} feed={this.props.feed} />
				<button className="btn btn-primary" onClick={this.actionSubmit}>Post</button>
			</div>

		);
	}
});

module.exports = FeedEditor;