var React = require('react');
var ReactDOM = require('react-dom');
var TagEditor = require('./TagEditor');
var TextEditor = require('./TextEditor');
var Display = require('./wrappers/Display');

var FeedEditor = React.createClass({
	// Set initial states
	getInitialState() {
		return {
			submit: false,
			title: '',
			message: '',
			tags: [],
			tagsUpdated: false
		}
	},

	// Called on state change
	componentWillUpdate() {
		// Check if data was received from children
		if (this.state.message !== '' && this.state.tagsUpdated) {
			// Create feed object
			var feed = {
				title: this.state.title,
				tags: this.state.tags,
				message: this.state.message
			}
			// Emit feed to server
			{this.props.emit('publish-feed', feed)};
			// Reset states
			this.setState({ 
				submit: false,
				title: '',
				message: '',
				tags: [],
				tagsUpdated: false
			});
		}
	},

	// Set `submit' state to true to notify child elements of submit event
	submit() {
		this.setState({ submit: true });
	}, 

	// Passed to `TagEditor' child -- called from child element on submit
	getTags(tags) {
		this.setState({ 
			tags: tags, 
			tagsUpdated: false
		});
	},

	// Passed to `FeedEditor' child -- called from child element on submit
	publish(message, element) {
		// Get input values
		var title = ReactDOM.findDOMNode(this.refs.title).value;
		// Check empty fields
		if (message.trim() === "" || title.trim() === "") {
			return;
		}
		// Clear input fields
		ReactDOM.findDOMNode(this.refs.title).value = '';
		// Update states with received data
		this.setState({
			title: title,
			message: message
		});
		// Clear text field
		element.innerHTML = '';
	},

	render() {
		return (
			<div>
				<input ref="title"
					   className="form-control"
					   placeholder="Title"
					   required />
				<TagEditor sendTags={this.getTags} submit={this.state.submit} feed={this.props.feed} />
				<TextEditor sendInnerHTML={this.publish} submit={this.state.submit} feed={this.props.feed} />
				<button className="btn btn-primary" onClick={this.submit}>Post</button>
			</div>

		);
	}
});

module.exports = FeedEditor;