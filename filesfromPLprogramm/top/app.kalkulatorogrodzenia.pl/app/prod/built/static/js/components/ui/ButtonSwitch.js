import React from 'react';
import PropTypes from 'prop-types';

import Objects from 'classes/Tools/Objects';


class ButtonSwitch extends React.Component {
	constructor(props) {
		super(props);

		const value = (props.value) ? parseInt(Objects.find(Objects.keys(props.options), (key) => props.options[key] === props.value), 10) : 0;

		this.state = {
			value,
			position: this.getPosition(value),
		};
	}

	click = () => {
		this.setState((prevState) => {
			const value = (prevState.value + 1 < this.props.options.length) ? prevState.value + 1 : 0;

			return {
				value,
				position: this.getPosition(value),
			};
		}, () => {
			this.props.action(this.props.options[this.state.value], this.state.value);
		});
	}

	getPosition = (value) => value / this.props.options.length * 100

	render() {
		return (
			<button
				onClick={this.click}
				title={this.props.description}
				aria-label={this.props.description}
				className="button-switch"
			>
				<span className="button-switch-handler" style={{ top: `${this.state.position}%` }} />

				{Objects.values(this.props.options).map((entry) => (
					<span className={`button-switch-type-${entry}`} key={entry} />
				))}
			</button>
		);
	}
}


ButtonSwitch.defaultProps = {
	action: null,
	description: null,
	options: [],
	value: null,
};

ButtonSwitch.propTypes = {
	action: PropTypes.func,
	description: PropTypes.string,
	options: PropTypes.array,
	value: PropTypes.string,
};


export default ButtonSwitch;