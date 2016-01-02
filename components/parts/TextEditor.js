var React = require('react');
var ReactDOM = require('react-dom');
var Display = require('./Display');
var PopupWindow = require('./PopupWindow');

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

	addImage() {
		this.setState({ image: true });
		console.log('State set.');
		// document.addEventListener('click', function(e) {
		// 	var el = document.getElementById('iframe');
		// 	console.log(el === e.srcElement);
		//     console.log(e.srcElement);
		// }, false);
	},

	render() {
		return (
			<div className="container">
				
				<div ref="editor"
					 contentEditable="true"
					 style={{minHeight:"50px", width:"100%", border: "1px solid #ccc"}}>
				</div>

				<button onClick={this.boldify}><b>Bold</b></button>
				<button onClick={this.italicize}><i>Italic</i></button>
				<button onClick={this.underline}><u>Underline</u></button>
				<button onClick={this.addImage}>Image</button>

				<Display if={this.state.image}>
					<PopupWindow>
						<div>
							<h1>Hi friends!</h1>
							<input placeholder="Hey ma!" />
						</div>
					</PopupWindow>
				</Display>

			</div>
		);
	}
});

module.exports = TextEditor;