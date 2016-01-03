var React = require('react');
var ReactDOM = require('react-dom');
var CommentContainer = require('./CommentContainer');
var Display = require('./wrappers/Display');
var TextEditor = require('./TextEditor');
var TagEditor = require('./TagEditor');

var FeedItem = React.createClass({

	getInitialState() {
		return {
			editor: false,
			submit: false,
			title: '',
			message: '',
			tags: [],
			tagsUpdated: false
		}
	},

	componentWillUpdate() {
		if (this.state.message !== '' && this.state.tagsUpdated) {
			var feed = {
				title: this.state.title,
				tags: this.state.tags,
				message: this.state.message
			}
			{this.props.emit('edit-feed', feed)};
			this.setState({ 
				submit: false,
				title: '',
				message: '',
				tags: []
			});
			this.setState({ 
				editor: false,
				submit: false,
				tagsUpdated: false
			});
		}
	},

	editPost(a) {
		this.setState({ editor: true });
	},

	deletePost() {
		var confirmed = confirm('Are you sure you want to permanently delete:\n\n"' + this.props.feed.title + '" ?');
		if (confirmed) {
			this.props.emit('delete-feed', { id: this.props.feed.id });
		}
	},

	submit() {
		this.setState({ submit: true });
	},

	updateFeed(message) {
		// Get input values
		var title = ReactDOM.findDOMNode(this.refs.title).value;
		// Check for empty fields
		if (message.trim() === '' || title.trim() === '') {
			return; 
		}
		
		this.setState({ 
			title: title,
			message: message
		});
	},

	getTags(tags) {
		this.setState({ 
			tags: tags,
			tagsUpdated: true
		});
	},

	cancel(e) {
		this.setState({ editor: false });
	},

	displayTag(tag) {
		return (
			<div key={tag + 'Disp'}
				 className="editTag">
				{tag}
			</div>
		);
	},

	render() {
		return (
			<div style={{marginTop: "20px"}}>

				<Display if={this.props.admin}>
					<button className="btn btn-success" onClick={this.editPost}>Edit</button>
					<button className="btn btn-danger" onClick={this.deletePost}>Delete</button>
				</Display>

				<Display if={this.state.editor}>
					<Display if={!this.state.preview}>
						<input ref="title"
							   className="form-control"
							   placeholder="Title"
							   defaultValue={this.props.feed.title}
							   required />
						<TagEditor sendTags={this.getTags} submit={this.state.submit} feed={this.props.feed} />
						<TextEditor sendInnerHTML={this.updateFeed} submit={this.state.submit} feed={this.props.feed} />
						<button className="btn btn-primary" onClick={this.submit}>Done</button>
					</Display>
					<button className="btn" onClick={this.cancel}>Cancel</button>
				</Display>

				<Display if={!this.state.editor}>
					<h3>{this.props.feed.title}</h3>
					<div>{this.props.feed.tags.map(this.displayTag)}</div>
					<p dangerouslySetInnerHTML={{__html: this.props.feed.message}} /> 
					<CommentContainer {...this.props} />
				</Display>

			</div>
		);
	}
});

module.exports = FeedItem;