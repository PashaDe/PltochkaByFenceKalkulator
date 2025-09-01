import React from 'react';

import Content from './Content';


class Workspace extends React.Component {
	render() {
		return (
			<section>
				<div className="row-workspace">
					<div
						className="canvas"
						ref={(element) => {
							this.canvas = element;
						}}
					/>

					<div
						className="canvas-helper"
						ref={(element) => {
							this.canvasHelper = element;
						}}
					/>

					<Content />
				</div>
			</section>
		);
	}
}


export default Workspace;