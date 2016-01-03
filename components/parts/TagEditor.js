var React = require('react');

var TagEditor = React.createClass({

	getInitialState() {
		return {
			tags: [],
			deleteTag: false
		}
	},

	componentDidMount() {
		console.log('Component did mount.');
		if (this.props.feed) {
			console.log('Feed found.');
			this.setState({ tags: this.props.feed.tags });
		}
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.submit) {
			var tags = this.state.tags;
			this.props.sendTags(tags, this.state.editor);
			this.setState({ tags: [] });
		}
	},

	renderTag(tag) {
		return (
			<div key={tag}
				 className="editTag">
				{tag}
			</div>
		);
	},

	keyListener(e) {
		// Space key
		switch (e.keyCode) {
			// Space key
			case 32:
				var tag = this.refs.editor.value.trim();
				this.refs.editor.value = '';
				if (tag === '' || this.state.tags.indexOf(tag) !== -1) return;
				var tags = this.state.tags;
				tags.push(tag);
				this.setState({ tags: tags });
				break;
			// Delete key
			case 8:
				if (this.refs.editor.value === '') {
					if (this.state.deleteTag) {
						var tags = this.state.tags;
						tags.pop();
						this.setState({ tags: tags });
						this.setState({ deleteTag: false });
					} else {
						this.setState({ deleteTag: true });	
					}
				}
				break;
			default: 
				this.setState({ deleteTag: false });
				break;

		}
	},

	render() {
		return (
			<div className="tagEditor"
				 onKeyUp={this.keyListener}>
				 {this.state.tags.map(this.renderTag)}
				 <input ref="editor"
				 		className="hiddenInput"
				 		placeholder="Add tag"
				 		autofocus />
				 </div>
		);
	}
});

module.exports = TagEditor;