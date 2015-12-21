var React = require('react');
var ReactDOM = require('react-dom');

var FeedListItem = React.createClass({
	render: function () {
		return (
			<h1>{this.props.text}</h1>	
		);
	}
});

var FeedList = React.createClass({
	render: function () {
		var feedPosts = this.props.data.map(function (feedPost) {
			return (
				<FeedListItem />
			);
		});
		return (
			{feedPosts}
		);
	}
});

var FeedContainer = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var allPosts = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextPost = '';
    this.setState({data: allPosts, text: nextPost});
	},
	getInitialState: function () {
		return {data: [
				{text: 'Hey'},
				{text: 'There'},
				{text: 'SS'},
				{text: 'FF'}
			], 
			text: 'J'
		};
	},
	render: function () {
		return (
			<FeedList data={this.state.data} />
			<form className="" onSubmit={this.handleSubmit}>
				<input value={this.state.text}>
				<button>Post</button>
			</div>
		);
	}
});

module.exports = FeedContainer;
