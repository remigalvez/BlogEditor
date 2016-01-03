var React = require('react');

var PopupWindow = React.createClass({

	// Style popup window
	getInitialState() {
		return {
			height: "auto",
			width: "auto", 
			style: {
				position: "fixed", 
				top: "20vh",
				left: 0,
				backgroundColor: "white",
				height: this.props.height, 
				width: this.props.width,  
				border: "1px solid black",
				borderRadius: "5px",
				padding: "15px",
				boxShadow: "10px 10px 5px #888888"
			},
			clickOccured: false
		};
	},

	componentDidMount() {
		var _this = this;
		// Center popup window
		var el = document.getElementById('c');
		this.centerPopup();

		// Listen to resize event to center window
		window.addEventListener('resize', this.centerPopup);
		window.addEventListener('click', this.evaluateClick);
	},

	// Remove event listeners as component unmounts
	componentWillUnmount() {
		var el = document.getElementById('c');
		window.removeEventListener('resize', this.centerPopup);
		window.removeEventListener('click', this.evaluateClick);
	},

	// Center element horizontally
	centerPopup() {
		var el = document.getElementById("c");
		var windowWidth = window.innerWidth;
		var elWidth;
		if (el !== null) {
			elWidth = el.offsetWidth;
		} else {
			elWidth = 0;
		}
		var offset = windowWidth/2 - elWidth/2;

		el.style.left = offset + 'px';
	},

	// Evaluate if click is within or without popup window
	evaluateClick(e) {
		var el = e.target || e.srcElement;
		var html = document.getElementsByTagName('html')[0];

		if (!this.state.clickOccured) {
			this.setState({ clickOccured: true });
			return;
		}
		// Bubble up DOM tree to determine click position
		while (el !== html) {
			if (el.className == 'popup') { return; }
			el = el.parentElement ;
		}
		// Deactivate popup window if click is outside window
		this.props.close();
	},

	render() {
		return (
			<div style={this.state.style} id="c" className="popup">{this.props.children}</div>
		);
	}
});

module.exports = PopupWindow;