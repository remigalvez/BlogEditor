var React = require('react');
var CommentContainer = require('./CommentContainer');
var FeedItem = require('./FeedItem');

var Feed = React.createClass({

	renderFeed(feed, i) {
		var key = 'feed-' + feed.id;
		return (
			<FeedItem key={key} feed={feed} {...this.props} />
		);
	},

	render() {
		// Reverse array to display newest posts on top
		var feeds = this.props.feeds.slice();
		feeds.reverse();
		return (
			<div>
				{feeds.map(this.renderFeed)}
			</div>
		);
	}
});

module.exports = Feed;