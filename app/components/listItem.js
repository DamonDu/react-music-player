import React from 'react';
let PubSub = require('pubsub-js');

require('./listItem.less');

let ListItem = React.createClass({
	playMusic(item) {
		PubSub.publish('PLAY_MUSIC', item);
	},
	deleteMusic(item, event) {
		event.stopPropagation();
		PubSub.publish('DELETE_MUSIC', item);
	},
	render() {
		// bind 的使用？
		let item = this.props.data;
		return (
			<li className={`row components-listitem${this.props.focus ? ' focus' : ''}`} onClick={this.playMusic.bind(this, item)}>
				<p><span className="bold">{item.title}</span> - {item.artist}</p>
				<p className="-col-auto delete" onClick={this.deleteMusic.bind(this, item)}></p>
			</li>
		);
	}
});

export default ListItem;