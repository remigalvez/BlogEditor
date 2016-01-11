var React = require('react');
// Initialize app components
var Display = require('./parts/wrappers/Display');
var TagBar = require('./parts/TagBar');
var Feed = require('./parts/feed');
var FeedEditor = require('./parts/FeedEditor');

var FeedPage = React.createClass({

	getInitialState() {
		return {
			filters: [],
			adminMode: true
		};
	},

	addFilter(filter) {
		var filters = this.state.filters;
		var idx = filters.indexOf(filter);
		
		if (idx < 0) {
			filters.push(filter);
		} else {
			filters.splice(idx, 1);
		}

		this.setState({
			filters: filters
		});
	},

	sendFeed(feed) {
		{this.props.emit('publish-feed', feed)};
	},

	toggleView() {
		var mode = this.state.adminMode;
		this.setState({ adminMode: !mode });
	},

	render() {
		var feeds = this.props.feeds.slice();
		feeds.reverse();
		return (
			<div>

				<Display if={this.props.admin}>
					<button className="btn btn-primary" onClick={this.toggleView}>Switch modes</button>
				</Display>

				<TagBar tags={this.props.tags} sendTag={this.addFilter} />
				
				<Display if={this.props.admin && this.state.adminMode}>
					<FeedEditor key={'publisher'} sendFeed={this.sendFeed} />
				</Display>

				<Feed {...this.props} {...this.state} />
			</div>
		);
	}
});

module.exports = FeedPage;