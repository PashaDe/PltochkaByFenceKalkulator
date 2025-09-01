import React from 'react';
import PropTypes from 'prop-types';


class ButtonText extends React.Component {
	render() {
		return (
			<button onClick={this.props.action} title={this.props.description} className="button-text">{this.props.text}</button>
		);
	}
}


ButtonText.defaultProps = {
	action: null,
	description: null,
};

ButtonText.propTypes = {
	action: PropTypes.func,
	text: PropTypes.string.isRequired,
	description: PropTypes.string,
};


export default ButtonText;