var React = require('react');

var TagEditor = React.createClass({

	getInitialState() {
		return {
			tags: [],
			deleteTag: false
		}
	},

	componentDidMount() {
		if (this.props.feed) {
			this.setState({ tags: this.props.feed.tags });
		}

		window.addEventListener('click', this.evaluateClick);
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.submit && !nextProps.received) {
			var tags = this.state.tags;
			this.props.sendTags(tags, this.state.editor);
			this.setState({ tags: [] });
		}
	},

	renderTag(tag) {
		return (
			<div key={tag} className="tag">
				{tag}
			</div>
		);
	},

	keyListener(e) {
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

	// Evaluate if click is within or without popup window
	evaluateClick(e) {
		var el = e.target || e.srcElement;
		var tagContainer = this.refs.tagContainer;

		if (tagContainer) {
			if (el == tagContainer || el.parentElement == tagContainer) {
				this.refs.editor.focus();
				tagContainer.classList.add('focus');
			} else {
				tagContainer.classList.remove('focus');
			}
		}
	},

	render() {
		return (
			<div ref="tagContainer"
				 id="tagContainer"
				 className="tagEditor"
				 onKeyUp={this.keyListener}>

				 {this.state.tags.map(this.renderTag)}
				 
				 <input ref="editor"
				 		className="hiddenInput"
				 		placeholder="Add tag" />

			</div>
		);
	}
});

module.exports = TagEditor;