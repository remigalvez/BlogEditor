var React = require('react');
var ReactDOM = require('react-dom');
var Display = require('./wrappers/Display');
var PopupWindow = require('./wrappers/PopupWindow');

var TextEditor = React.createClass({

	getInitialState() {
		return {
			image: false,
			link: false,
			feed: {
				message: ''
			},
			fontSize: 1.0
		};
	},

	componentDidMount() {
		var editor = ReactDOM.findDOMNode(this.refs.editor);
		this.setState({ editor: editor })
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.submit) {
			var message = this.state.editor.innerHTML;
			this.props.sendInnerHTML(message, this.state.editor);
		}
	},

	boldify() { 
		document.execCommand('bold');
		this.state.editor.focus();
	}, 
	
	italicize() { 
		document.execCommand('italic');
		this.state.editor.focus();
	}, 
	
	underline() { 
		document.execCommand('underline');
		this.state.editor.focus();
	}, 

	decreaseFontSize() { 
		if (this.state.fontSize < 1) {
			return;
		}
		var newFontSize = this.state.fontSize - 1;
		this.setState({ fontSize: newFontSize });
		document.execCommand('fontSize', null, newFontSize);
		this.state.editor.focus();
	}, 

	increaseFontSize() { 
		if (this.state.fontSize > 6) {
			return;
		}
		var newFontSize = this.state.fontSize + 1;
		this.setState({ fontSize: newFontSize });
		document.execCommand('fontSize', null, newFontSize);
		this.state.editor.focus();
	},

	showImagePopup() {
		this.setState({ image: true });
	},

	addImage() {
		var imageSize = this.refs.imgSz.imageSize.value;
		var size;
		switch (imageSize) {
			case 'small':
				size = '33%';
				break;
			case 'medium':
				size = '67%';
				break;
			case 'large':
				size = '100%';
				break;
			default:
				size = '50%';
				break;
		}
		var text = this.state.editor.innerHTML;
		var url = ReactDOM.findDOMNode(this.refs.imageUrl).value.trim();
		if (url === '') return;
		this.state.editor.innerHTML = text + '<img src="' + url + '" style="width: ' + size + ';" />';
		this.closeImagePopup();
	},

	closeImagePopup() {
		this.setState({ image: false });
	}, 

	showLinkPopup() {
		this.setState({ link: true });
	},

	addLink() {
		var htmlText = this.state.editor.innerHTML;
		var url = ReactDOM.findDOMNode(this.refs.linkUrl).value;
		var text = ReactDOM.findDOMNode(this.refs.linkText).value;
		this.state.editor.innerHTML = htmlText + '<a href="' + url + '">' + text + '</a>';
		this.closeLinkPopup();
	},

	closeLinkPopup() {
		this.setState({ link: false });
	},

	render() {
		var message = (this.props.feed !== undefined) ? this.props.feed.message : '';
		return (
			<div>
				
				<div ref="editor"
					 contentEditable="true"
					 className="message"
					 dangerouslySetInnerHTML={{__html: message}}>
				</div>
				<button onClick={this.boldify}><b>Bold</b></button>
				<button onClick={this.italicize}><i>Italic</i></button>
				<button onClick={this.underline}><u>Underline</u></button>
				<button onClick={this.decreaseFontSize}><span style={{fontSize: '6pt'}}>Smaller</span></button>
				<button onClick={this.increaseFontSize}><span style={{fontSize: '14pt'}}>Larger</span></button>
				<button onClick={this.showImagePopup}>Image</button>
				<button onClick={this.showLinkPopup}>Link</button>

				<Display if={this.state.image}>
					<div style={{
									position:"fixed",
									left: "0",
									top: "0",
									height: "100%",
									width: "100%",
									backgroundColor: "rgba(255, 255, 255, 0.7)",
								}}>
						<PopupWindow width="60%" height="40%" close={this.closeImagePopup}>
							<div>
								<h1>Add Image</h1>
								<p>Image url:</p>
								<input ref="imageUrl"
									   className="form-control" />
								
								<form ref="imgSz">
									<div className="radio-inline">
										<label htmlFor="small">
										<input type="radio" name="imageSize" id="small" value="small" />
										Small
										</label>
									</div>

									<div className="radio-inline">
										<label htmlFor="medium" className="**active**">
											<input type="radio" name="imageSize" id="medium" value="medium" />
											Medium
										</label>
									</div>

									<div className="radio-inline">
										<label htmlFor="large">
											<input type="radio" name="imageSize" id="large" value="large" />
											Large
										</label>
									</div>
								</form>

								<button className="btn btn-success" onClick={this.addImage}>Add</button>
								<button className="btn btn-danger" onClick={this.closeImagePopup}>Cancel</button>
							</div>
						</PopupWindow>
					</div>
				</Display>

				<Display if={this.state.link}>
					<PopupWindow close={this.closeLinkPopup}>
						<div>
							<h1>Add Link</h1>
							<p>Text:</p>
							<input ref="linkText"
								   className="form-control" />
							<p>Url:</p>
							<input ref="linkUrl"
								   className="form-control" />
							<button className="btn btn-success" onClick={this.addLink}>Add</button>
							<button className="btn btn-danger" onClick={this.closeLinkPopup}>Cancel</button>
						</div>
					</PopupWindow>
				</Display>

			</div>
		);
	}
});

module.exports = TextEditor;