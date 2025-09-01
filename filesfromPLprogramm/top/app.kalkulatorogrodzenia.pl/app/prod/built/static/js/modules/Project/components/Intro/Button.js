/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';


class Button extends React.Component {
	render() {
		return (
			<button onClick={this.props.action}>
				<div className="image" style={{ backgroundImage: `url(${this.props.background}?v=20230413)` }} />
				<div className="label" dangerouslySetInnerHTML={{ __html: this.props.label }} />
			</button>
		);
	}
}


Button.defaultProps = {
	action: null,
	background: null,
	label: null,
};

Button.propTypes = {
	action: PropTypes.func,
	background: PropTypes.string,
	label: PropTypes.string,
};


export default Button;