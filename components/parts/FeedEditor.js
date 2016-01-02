var React = require('react');
var ReactDOM = require('react-dom');
var Display = require('./wrappers/Display');

var FeedEditor = React.createClass({

	getInitialState() {
		return {
			preview: false
		}
	},

	publish() {
		// Get input values
		var title = ReactDOM.findDOMNode(this.refs.title).value;
		var message = ReactDOM.findDOMNode(this.refs.message).value;
		// Clear input fields
		ReactDOM.findDOMNode(this.refs.title).value = '';
		ReactDOM.findDOMNode(this.refs.message).value = '';
		// Create JSON object
		var feed = {
			title: title,
			message: message
		}
		// Emit JSON object
		{this.props.emit('publish-feed', feed)};
	},

	boldify() {
		this.stylize('<b>', '</b>');
	},

	italicize() {
		this.stylize('<i>', '</i>');
	},

	underline() {
		this.stylize('<u>', '</u>');
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
		return (
			<div>
				<Display if={!this.state.preview}>
					<div className="style-elements">
						<button className="btn" onClick={this.boldify}><b>bold</b></button>
						<button className="btn" onClick={this.italicize}><i>italics</i></button>
						<button className="btn" onClick={this.underline}><u>underline</u></button>
					</div>
					<form action="javascript:void(0)" onSubmit={this.publish}>
						<input ref="title"
							   className="form-control"
							   placeholder="Title"
							   required />
						<textarea ref="message"
							   className="form-control"
							   placeholder="Write post..."
							   required />
						<button className="btn btn-primary">Post</button>
					</form>
				</Display>

			</div>

		);
	}
});

module.exports = FeedEditor;