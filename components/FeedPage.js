var React = require('react');
// Initialize app components
var Display = require('./parts/Display');
var Editor = require('./Editor');
var Feed = require('./Feed');


var FeedPage = React.createClass({
 
	render() {
		return (
			<div>
				<Display if={this.props.admin}>
					<Editor emit={this.props.emit} />
				</Display>

				<Feed feeds={this.props.feeds} />
			</div>
		);
	}
});

module.exports = FeedPage;