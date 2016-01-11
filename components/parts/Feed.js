var React = require('react');
var CommentContainer = require('./CommentContainer');
var FeedItem = require('./FeedItem');

var Feed = React.createClass({

	renderFeed(feed, i) {
		// Instantiate array to to keep track of fulfilled tags
		var visited = new Array(this.props.filters.length);
		for (var i = 0; i < visited.length; i++) {
			visited[i] = false;
		}

		// Iterate through filters and feed tags
		for (var i = 0; i < this.props.filters.length; i++) {
			for (var j = 0; j < feed.tags.length; j++) {
				if (this.props.filters[i] === feed.tags[j]) {
					// Set visited to true if filter matches tag
					visited[i] = true;
				}
			}
		}

		// If all filters are visited, return feed
		if (visited.indexOf(false) < 0) {
			var key = 'feed-' + feed.id;
			return <FeedItem key={key} feed={feed} {...this.props} />
		}
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