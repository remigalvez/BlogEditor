var React = require('react');

var TagBar = React.createClass({

	click(e) {
		var el = e.target || e.srcElement;
		while(el.className.indexOf('tag') < 0) {
			el = el.parentNode;
		}

		if (!el.classList.contains('active')) {
			el.classList.add('active');
		} else {
			el.classList.remove('active');
		}

		var tag = el.id;
		this.props.sendTag(tag);
	},

	displayTags(tag, i) {
		return (
			<div className="tag" key={tag.tag} id={tag.tag}>{tag.tag} ({tag.count})</div>
		);
	},

	render() {
		return (
			<div onClick={this.click} >
				{this.props.tags.map(this.displayTags)}
			</div>
		);
	}
});

module.exports = TagBar;