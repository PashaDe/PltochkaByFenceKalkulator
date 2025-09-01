import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class ButtonImage extends React.Component {
	render() {
		return (
			<button
				onClick={this.props.action}
				title={this.props.description}
				aria-label={this.props.description}
				className={classNames(
					'button-image',
					`button-image-type-${this.props.type}`,
				)}
				style={{
					opacity: this.props.disabled ? 0.4 : 1,
					order: this.props.order,
				}}
			/>
		);
	}
}


ButtonImage.defaultProps = {
	action: null,
	description: null,
	disabled: false,
	order: 1,
};

ButtonImage.propTypes = {
	action: PropTypes.func,
	type: PropTypes.oneOf([
		'details', 'environment', 'screenshot', 'window',
		'pdf', 'xls', 'ows', 'order',
	]).isRequired,
	description: PropTypes.string,
	disabled: PropTypes.bool,
	order: PropTypes.number,
};


export default ButtonImage;