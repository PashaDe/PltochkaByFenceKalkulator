import React from 'react';

import Template from 'templates/ProjectTemplate';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 'Not connected',
			position: {
				x: 50,
				y: 50,
			},
		};
	}

	componentDidMount = () => {
		window.addEventListener('gamepadconnected', () => {
			this.setState({ status: 'Connected' });
		});

		this.reqestAnimation();
	}

	reqestAnimation = () => {
		window.requestAnimationFrame(() => {
			this.updateStatus();
			this.reqestAnimation();
		});
	}

	updateStatus = () => {
		let { position } = this.state;

		Array.from(navigator.getGamepads()).forEach((gamepad) => {
			if (!gamepad) return;

			Array.from(gamepad.axes.entries()).forEach(([index, axis]) => {
				switch (index) {
					case 0:
						position.x += axis;
						break;

					case 1:
						position.y += axis;
						break;

					default:
				}
			});

			Array.from(gamepad.buttons.entries()).forEach(([index, button]) => {
				if (button.pressed || button.touched) {
					switch (index) {
						case 4:
							position.x = 50;
							position.y = 50;
							break;

						default:
					}
				}
			});
		});

		this.setState({ position });
	}

	render() {
		return (
			<Template>
				<h1>{this.state.status}</h1>

				<div
					style={{
						width: '10px',
						height: '10px',
						position: 'absolute',
						top: `${this.state.position.y}%`,
						left: `${this.state.position.x}%`,
						background: 'red',
					}}
				/>
			</Template>
		);
	}
}


export default View;