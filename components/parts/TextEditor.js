var React = require('react');
var ReactDOM = require('react-dom');
var Display = require('./wrappers/Display');
var PopupWindow = require('./wrappers/PopupWindow');

var TextEditor = React.createClass({

	getInitialState() {
		return {
			image: false
		};
	},

	boldify() { 
		var el = ReactDOM.findDOMNode(this.refs.editor);
		document.execCommand('bold');
		el.focus();
	}, 
	
	italicize() { 
		var el = ReactDOM.findDOMNode(this.refs.editor);
		document.execCommand('italic');
		el.focus();
	}, 
	
	underline() { 
		var el = ReactDOM.findDOMNode(this.refs.editor);
		document.execCommand('underline');
		el.focus();
	}, 

	largeText() { 
		var el = ReactDOM.findDOMNode(this.refs.editor);
		document.execCommand('fontSize', null, '24pt');
		el.focus();
	}, 

	addImage() {
		this.setState({ image: true });
	},

	deactivateImagePopup() {
		this.setState({ image: false });
	},

	render() {
		return (
			<div className="container">
				
				<div ref="editor"
					 contentEditable="true"
					 className="message"
					 style={{minHeight:"50px", width:"100%", border: "1px solid #ccc"}}>
				</div>

				<button onClick={this.boldify}><b>Bold</b></button>
				<button onClick={this.italicize}><i>Italic</i></button>
				<button onClick={this.underline}><u>Underline</u></button>
				<button onClick={this.largeText}><span style={{fontSize: '24pt'}}>Large text</span></button>
				<button onClick={this.addImage}>Image</button>

				<Display if={this.state.image}>
					<PopupWindow deactivate={this.deactivateImagePopup}>
						<div>
							<h1>Hello!</h1>
						</div>
					</PopupWindow>
				</Display>

			</div>
		);
	}
});

module.exports = TextEditor;