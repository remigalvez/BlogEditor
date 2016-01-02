var React = require('react');
var ReactDOM = require('react-dom');

var CommentEditor = React.createClass({

	publish() {
		// Get comment
		var message = ReactDOM.findDOMNode(this.refs.comment).value;
		// Clear input field
		ReactDOM.findDOMNode(this.refs.comment).value = '';
		// Create JSON object
		var comment = {
			user_id: 0,
			user_name: 'Remi',
			feed_id: this.props.feed.id,
			comment: message
		};
		// Publish comment
		{this.props.emit('publish-comment', comment)};
	},

	render() {
		return (
			<form action="javascript:void(0)" onSubmit={this.publish}>
				<input ref="comment"
					   className="form-control"
					   placeholder="Enter comment..."
					   required />
			</form>
		);
	}
});

module.exports = CommentEditor;