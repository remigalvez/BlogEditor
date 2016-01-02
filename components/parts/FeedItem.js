var React = require('react');
var ReactDOM = require('react-dom');
var CommentContainer = require('./CommentContainer');
var Display = require('./Display');
var autosize = require('autosize');

var ta;

var FeedItem = React.createClass({

	getInitialState() {
		return {
			editor: false
		}
	},
	// Enable auto resize of text area components
	componentDidMount() {
		this.enableAutoResize('textarea');
	},
	// Enable auto resize of text area components
	componentDidUpdate() {
		this.enableAutoResize('textarea');
	},

	editPost(a) {
		this.setState({ editor: true });
	},

	deletePost() {
		var confirmed = confirm('Are you sure you want to permanently delete:\n\n"' + this.props.feed.title + '" ?');
		if (confirmed) {
			this.props.emit('delete-feed', { id: this.props.feed.id });
		}
	},
	// Format message with line breaks
	formatMessage(line, i) {
		var key = this.props.feed.id + '-' + i;
		return (
			<p key={key} dangerouslySetInnerHTML={{__html: line}}><br /></p>
		);
	},

	updateFeed() {
		// Get input values
		var title = ReactDOM.findDOMNode(this.refs.title).value;
		var message = ReactDOM.findDOMNode(this.refs.message).value;
		// Exit editor mode
		this.setState({ editor: false });
		// Create JSON object
		var feed = this.props.feed;
		feed.title = title;
		feed.message = message;
		// Emit edit
		{this.props.emit('edit-feed', feed)}
	},

	cancel(e) {
		this.setState({ editor: false });
	},

	enableAutoResize(element) {
		ta = document.querySelectorAll(element);
		autosize(ta);
	},

	boldify() {
		this.stylize('<strong>', '</strong>');
	},

	italicize() {
		this.stylize('<em>', '</em>');
	},

	stylize(openTag, closeTag, placeholder) {
		var el = ReactDOM.findDOMNode(this.refs.message);
		var message = el.value;
		
		var start = el.selectionStart;
		var end = el.selectionEnd;
		
		var placeholder = placeholder || '{Enter your text here}';

		el.focus();

		// Check if text is selected & surround with html tags
		if (end - start > 0) {
			el.value = message.slice(0, start) 
						+ openTag 
						+ message.slice(start, end) 
						+ closeTag 
						+ message.slice(end);
			el.selectionStart = end + openTag.length;
			el.selectionEnd = end + openTag.length;
		} else {
			el.value = message.slice(0, start) 
						+ openTag 
						+ placeholder 
						+ closeTag 
						+ message.slice(end);

			el.selectionStart = start + openTag.length;
			el.selectionEnd = start + openTag.length + placeholder.length;
		}
	},

	render() {
		var message = this.props.feed.message.replace(/\n/g, '<br />');
		return (
			<div style={{marginTop: "20px"}}>

				<Display if={this.props.admin}>
					<button className="btn btn-secondary" onClick={this.editPost}>Edit</button>
					<button className="btn btn-ternary" onClick={this.deletePost}>Delete</button>
				</Display>

				<Display if={this.state.editor}>
					<div className="style-elements">
						<button className="btn" onClick={this.boldify}><b>bold</b></button>
						<button className="btn" onClick={this.italicize}><i>italics</i></button>
						<button className="btn" onClick={this.italicize}><em>underline</em></button>
					</div>
					<form action="javascript:void(0)" onSubmit={this.updateFeed}>
						<input ref="title"
						   className="form-control"
						   placeholder="Title"
						   defaultValue={this.props.feed.title}
						   required />
						<textarea ref="message"
								  className="form-control"
								  placeholder="Write post..."
								  defaultValue={this.props.feed.message} 
								  required />
						<button className="btn btn-success">Done</button>
					</form>
					<button className="btn" onClick={this.cancel}>Cancel</button>
				</Display>

				<Display if={!this.state.editor}>
					<h3>{this.props.feed.title}</h3>
					<p dangerouslySetInnerHTML={{__html: message}} /> 
					<CommentContainer {...this.props} />
				</Display>

			</div>
		);
	}
});

module.exports = FeedItem;