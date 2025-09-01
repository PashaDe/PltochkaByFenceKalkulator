import React from 'react';
import PropTypes from 'prop-types';


class Button extends React.Component {
	render() {
		return (
			<button onClick={this.props.action} title={this.props.description}>{this.props.text}</button>
		);
	}
}


Button.defaultProps = {
	action: null,
	description: null,
};

Button.propTypes = {
	action: PropTypes.func,
	text: PropTypes.string.isRequired,
	description: PropTypes.string,
};


export default Button;