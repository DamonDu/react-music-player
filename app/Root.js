import React from 'react';
import {Router, IndexRoute, Link, Route, hashHistory} from 'react-router';
let PubSub = require('pubsub-js');

import Logo from './components/logo';
import Player from './page/player';
import Musiclist from './page/musiclist';
import { MUSIC_LIST } from './config/config';

let App = React.createClass({
	playMusic(item) {
		$("#player").jPlayer('setMedia', {
			mp3: item.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem: item
		});
	},
	playPrev() {
		var index = this.findMusicIndex(this.state.currentMusicItem);
		var prevIndex = (index + this.state.musiclist.length - 1) % (this.state.musiclist.length);
		this.setState({
			currentMusicItem: this.state.musiclist[prevIndex]
		});
		this.playMusic(this.state.musiclist[prevIndex]);
	},
	playNext() {
		var index = this.findMusicIndex(this.state.currentMusicItem);
		var nextIndex = (index + 1) % (this.state.musiclist.length);
		this.setState({
			currentMusicItem: this.state.musiclist[nextIndex]
		});
		this.playMusic(this.state.musiclist[nextIndex]);
	},
	playWhenEnd() {

	},
	delete(item) {
		var newList = this.state.musiclist.filter((music) => {
			return music !== item;
		});
		this.setState({
			musiclist: newList
		});
		if (this.state.currentMusicItem === item) {
			this.playNext();
			this.playPrev();
		}
	},
	findMusicIndex(item) {
		var index = this.state.musiclist.indexOf(item);
		/*保证 index 大于0，提高健壮性*/
		return Math.max(0, index);
	},
	getInitialState() {
		return {
			musiclist: MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0]
		}
	},
    componentDidMount() {
    	$("#player").jPlayer({
    		supplied: 'mp3',
    		wmode: 'window'
    	});

    	this.playMusic(this.state.musiclist[0]);

    	PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
    		this.playMusic(item);
    	});

    	PubSub.subscribe('PLAY_PREV', (msg) => {
    		this.playPrev();
    	});

    	PubSub.subscribe('PLAY_NEXT', (msg) => {
    		this.playNext();
    	});

    	PubSub.subscribe('DELETE_MUSIC', (msg, item) => {
    		this.delete(item);
    	});
    },
    componentWillMount() {
    	PubSub.unsubscribe('PLAY_MUSIC');
    	PubSub.unsubscribe('PLAY_PREV');
    	PubSub.unsubscribe('PLAY_NEXT');
    	PubSub.unsubscribe('DELETE_MUSIC');
    },
	render() {
		return(
			<div>
				<Logo></Logo>
				{/*传参，key 名称需要对应*/}
				{ React.cloneElement(this.props.children, this.state) }
			</div>
		);
	}
});

let Root = React.createClass({
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Player}></IndexRoute>
					<Route path="/list" component={Musiclist}></Route>
				</Route>
			</Router>
		); 
	}
});

export default Root;