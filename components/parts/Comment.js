var React = require('react');

var Comment = React.createClass({
	render() {
		return (
			<p>{this.props.comment}</p>
		);
	}
});

module.exports = Comment;