import React from 'react';

import container from 'redux/container';

import Helper from 'classes/Tools/Helper';
import { ___ } from 'classes/Translation';


class Episode extends React.Component {
	constructor(props) {
		super(props);

		this.settings = container.app.settings;

		this.state = {
			distance: false,
			between: this.settings.defaultDistance,
			angle: 0,
		};
	}

	onChange = (event) => {
		const name = event.target.name;
		const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

		this.setState({ [name]: value });
	}

	onBlur = (event) => {
		const name = event.target.name;
		const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

		this.setState({ [name]: this.validate(name, value) });
	}

	validate = (name, value) => {
		let min;
		let max;

		switch (name) {
			case 'distance':
				value = parseFloat(value) || 0;

				min = container.app.getBlocksFamily().settings.distance.min;

				if (value < min) {
					value = min;
				}

				value = Helper.numberFormat(value, 3, '.');
				break;

			case 'between':
				value = parseFloat(value) || 0;

				min = container.app.getBlocksFamily().settings.distance.min;

				if (value < min) {
					value = min;
				}

				value = Helper.numberFormat(value, 3, '.');
				break;

			case 'angle':
				value = parseInt(value, 10) || 0;

				min = -135;
				max = 135;

				if (value < min) {
					value = min;
				}

				if (value > max) {
					value = max;
				}
				break;

			default:
		}

		return value;
	}

	render() {
		return (
			<>
				<div className="title">
					<h2>{___('Dodaj odcinek')}</h2>
				</div>

				<div className="options-group">
					<h3>{___('Długość')}</h3>
					<input type="number" min="0" step="0.01" name="distance" value={this.state.distance} onChange={this.onChange} onBlur={this.onBlur} /> <small>m</small>

					<h3>{___('Odległość między słupkami')}</h3>
					<input type="number" min="0" step="0.01" name="between" value={this.state.between} onChange={this.onChange} onBlur={this.onBlur} /> <small>m</small>

					<h3>{___('Kąt')}</h3>
					<input type="number" min="-135" max="135" step="1" name="angle" value={this.state.angle} onChange={this.onChange} onBlur={this.onBlur} /> <small>°</small>
				</div>

				{(this.state.distance) && (
					<button onClick={() => container.app.addEpisode(parseFloat(this.state.distance), parseFloat(this.state.between), parseInt(this.state.angle, 10))}>{___('Dodaj')}</button>
				)}
			</>
		);
	}
}


export default Episode;