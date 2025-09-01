import React from 'react';

import * as workspaceActions from '../../redux/workspace/actions';


class Communique {
	constructor(instance) {
		this.instance = instance;

		this.time = 5000;

		workspaceActions.add('main', 'communique', (
			<div
				className="communique"
				ref={(element) => {
					this.container = element;
				}}
			>
				<div
					onClick={this.reset}
					ref={(element) => {
						this.content = element;
					}}
				/>
			</div>
		));
	}

	set = (content) => {
		if (content) {
			this.container.classList.add('active');
			this.content.innerHTML = content;

			if (this.timeout) {
				clearTimeout(this.timeout);
			}

			this.timeout = setTimeout(() => {
				this.reset(false);
			}, this.time);
		} else {
			this.reset(false);
		}
	}

	reset = (clear = true) => {
		this.container.classList.remove('active');
		this.content.innerHTML = '';

		if (clear) {
			this.instance.extensions.dimensions.reset();
			this.instance.extensions.average.reset();
		}
	}
}


export default Communique;