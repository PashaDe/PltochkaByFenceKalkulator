import React from 'react';
import PropTypes from 'prop-types';


class Button extends React.Component {
	render() {
		return (
			<button onClick={this.props.action} title={this.props.description} aria-label={this.props.description} className={`type-${this.props.type}`}><span /></button>
		);
	}
}


Button.defaultProps = {
	action: null,
	description: null,
};

Button.propTypes = {
	action: PropTypes.func,
	type: PropTypes.oneOf(['episode', 'pole', 'curtain', 'wicket', 'gate', 'space']).isRequired,
	description: PropTypes.string,
};


export default Button;