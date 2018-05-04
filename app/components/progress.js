import React from 'react';
require('./progress.less');

let Progress = React.createClass({
	getDefaultProps(){
		return {
			barColor: '#2f9842'
		}
	},
	changeProgress(e){
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		// 检查 onProgressChange 是否为空，非空则执行 onProgressChange
		this.props.onProgressChange && this.props.onProgressChange(progress);
	},
	render() {
		return(
			// 定义引用为 progressBar，会自动装入 refs 中
			// template literal 的用法：`${}`，注意使用的是反引号！
			<div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
				<div className="progress" style={{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
			</div>
		);
	}
});

export default Progress;