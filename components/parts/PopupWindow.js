var React = require('react');

var PopupWindow = React.createClass({

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
			}
		};
	},

	componentDidMount() {
		// Center popup window
		var el = document.getElementById('c');
		var centerElement = this.centerElement;
		this.centerElement(el);
		// Listen to resize event to center window
		window.addEventListener('resize', function (e) {
			centerElement(el);
		});
	},
	// 
	centerElement(el) {
		var windowWidth = window.innerWidth;
		var el = document.getElementById("c");
		var elWidth;
		if (el !== null) {
			elWidth = el.offsetWidth;
		} else {
			elWidth = 0;
		}
		var offset = windowWidth/2 - elWidth/2;
		
		el.style.left = offset + 'px';
	},

	render() {
		return (
			<div style={this.state.style} id="c">{this.props.children}</div>
		);
	}
});

module.exports = PopupWindow;