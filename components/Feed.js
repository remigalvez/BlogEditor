var React = require('react');

var Feed = React.createClass({

	renderFeed(feed, i) {
		return (
			<tr key={i}><td key={i}>{feed.message}</td></tr>
		);
	},

	render() {
		return (
			<table className="table table-striped">
				<tbody>
					{this.props.feeds.map(this.renderFeed)}
				</tbody>
			</table>
		);
	}
});

module.exports = Feed;