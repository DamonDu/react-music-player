import React from 'react';
import ListItem from '../components/listItem';

let Musiclist = React.createClass({
	render() {
		let Items = this.props.musiclist.map((item) => {
			return (
				<ListItem 
					key={item.id}
					data={item}
					focus={this.props.currentMusicItem === item}
				>
				</ListItem>
			);
		});
		return (
			<ul>
				{ Items }
			</ul>
		);
	}
});

export default Musiclist;