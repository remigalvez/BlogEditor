/**** Comments rendered separately using ``renderCommentContainer'' method ****/
/**** to prevent refresh of feed item when comments are loaded or posted ******/

var React = require('react');
var ReactDOM = require('react-dom');
var CommentContainer = require('./CommentContainer');
var Display = require('./wrappers/Display');
var FeedEditor = require('./FeedEditor');

var FeedItem = React.createClass({
	// Set initial state values
	getInitialState() {
		return {
			editor: false,
			title: '',
			message: '',
			tags: [],
			tagsUpdated: false
		}
	},

	shouldComponentUpdate(nextProps, nextState) {
		var thisFeed = this.props.feed;
		var nextFeed = nextProps.feed;
		if (thisFeed.message === nextFeed.message && 
			thisFeed.title === nextFeed.title &&
			thisFeed.tags === nextFeed.tags &&
			this.props.adminMode === nextProps.adminMode &&
			!nextState.editor) {

			this.renderCommentContainer();
			return false;

		}
		return true;
	},
	// Set inner HTML on initial render
	componentDidMount() {
		// Set inner HTML for viewer mode
		if (!this.state.editor) { this.refs.content.innerHTML = this.props.feed.message; }
		// Render comment container -- work around to not rerender feed content on new comment
		this.renderCommentContainer();
	},
	// Set inner HTML on subsequent renders
	componentDidUpdate() {
		// Render comment container -- work around to not rerender feed content on new comment
		this.renderCommentContainer();
		if (!this.state.editor) { this.refs.content.innerHTML = this.props.feed.message; }
	},
	// Switch to editor mode
	editorMode(e) {
		this.setState({ editor: true });
	},
	// Switch to viewer mode
	readerMode(e) {
		this.setState({ editor: false });
	},
	// Delete post
	deletePost() {
		var confirmed = confirm('Are you sure you want to permanently delete:\n\n"' + this.props.feed.title + '" ?');
		if (confirmed) {
			this.props.emit('delete-feed', { id: this.props.feed.id });
		}
	},
	// Passed down when to `FeedEditor' child -- all data kept here
	sendFeed(feed) {
		{this.props.emit('edit-feed', feed)};
		this.readerMode();
	},
	// Render tag
	renderTag(tag) {
		return (
			<div key={tag + 'Disp'}
				 className="tag">
				{tag}
			</div>
		);
	},

	renderCommentContainer() {
		if (this.refs.commentContainer) {
			ReactDOM.render(
				<CommentContainer {...this.props} />, 
				this.refs.commentContainer
			);
		}
	},

	render() {
		return (
			<div style={{marginTop: "20px"}}>
				
				<Display if={this.props.admin && this.props.adminMode}>
					
					<button className="btn btn-success" onClick={this.editorMode}>Edit</button>
					<button className="btn btn-danger" onClick={this.deletePost}>Delete</button>
					
					<Display if={this.state.editor}>
						<FeedEditor key={this.props.feed.id}  feed={this.props.feed} sendFeed={this.sendFeed} />
						<button className="btn" onClick={this.readerMode}>Cancel</button>
					</Display>

				</Display>

				<Display if={!this.state.editor}>
					<h3>{this.props.feed.title}</h3>
					<div>{this.props.feed.tags.map(this.renderTag)}</div>
					<div className="feedContent" ref="content"></div>
					<div ref="commentContainer"></div>
				</Display>

			</div>
		);
	}
});

module.exports = FeedItem;