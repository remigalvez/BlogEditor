var React = require('react');

var Header = React.createClass({
	render() {
		return (
			<div className="container">
				<h1>A Privileged Vegan: {this.props.connected}</h1>
			</div>
		);
	}
});

module.exports = Header;