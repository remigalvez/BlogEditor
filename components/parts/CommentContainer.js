var React = require('react');
var Comment = require('./Comment');
var CommentEditor = require('./CommentEditor');
var Display = require('./wrappers/Display');

var CommentContainer = React.createClass({

	getInitialState() {
		return {
			showComments: false,
			commentCount: 0
		}
	},

	showComments() {
		this.props.emit('get-comments', { key: this.props.feed.id });
		this.setState({ showComments: true });
	},

	renderComment(comment, i) {
		if (comment.feed_id === this.props.feed.id)
			this.state.commentCount++;

		var key = comment.feed_id + '-' + i;

		return (
			<Display key={key} if={comment.feed_id === this.props.feed.id}>
				<p style={{color: "#AAA"}}>{comment.user_name}: {comment.comment}</p>
			</Display>
		);
	},

	render() {
		return (
			<div>
				<Display if={!this.state.showComments}>
					<button className="btn btn-primary" onClick={this.showComments}>Comment</button>
				</Display>

				<Display if={this.state.showComments}>
					{this.props.comments.map(this.renderComment)}
					<Display if={this.state.commentCount === 0}>
						<p style={{color: "#AAA"}}>No comments</p>
					</Display>
					<CommentEditor feed={this.props.feed} emit={this.props.emit} />
				</Display>
			</div>
		);
	}
});

module.exports = CommentContainer;