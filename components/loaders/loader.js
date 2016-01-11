var React = require('react');

var loader = React.createClass({

	render() {
		return (
			<div className="container">
				<link rel="stylesheet" type="text/css" href="/loader.css" />
				
				<div id="loader-3">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		);
	}
});

module.exports = loader;