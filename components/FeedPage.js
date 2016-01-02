var React = require('react');
// Initialize app components
var Display = require('./parts/Display');
var FeedEditor = require('./parts/FeedEditor');
var Feed = require('./parts/Feed');


var FeedPage = React.createClass({
	render() {
		return (
			<div>
				<Display if={this.props.admin}>
					<FeedEditor emit={this.props.emit} />
				</Display>

				<Feed {...this.props} />
			</div>
		);
	}
});

module.exports = FeedPage;