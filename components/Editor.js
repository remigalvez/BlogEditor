var React = require('react');
var ReactDOM = require('react-dom');

var Editor = React.createClass({

	post() {
		var post = ReactDOM.findDOMNode(this.refs.post).value;
		ReactDOM.findDOMNode(this.refs.post).value = '';
		{this.props.emit('post', { message: post })};
	},

	render() {
		return (
			<form action="javasript:void(0)" onSubmit={this.post}>
				<input ref="post"
					   className="form-control"
					   placeholder="Write post..."
					   required />
				<button className="btn btn-primary">Post</button>
			</form>
		);
	}
});

module.exports = Editor;