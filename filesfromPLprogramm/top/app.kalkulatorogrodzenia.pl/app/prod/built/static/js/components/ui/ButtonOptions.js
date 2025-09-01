import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Objects from 'classes/Tools/Objects';


class ButtonOptions extends React.Component {
	render() {
		return (
			<button
				onClick={this.props.action}
				title={this.props.description}
				aria-label={this.props.description}
				className={classNames(
					'button-options',
					`button-options-type-${this.props.type}`,
					this.props.param ? {
						[Objects.keys(this.props.param)[0]]: Objects.values(this.props.param)[0],
					} : null,
				)}
			>
				<span />
			</button>
		);
	}
}


ButtonOptions.defaultProps = {
	action: null,
	description: null,
	param: null,
};

ButtonOptions.propTypes = {
	action: PropTypes.func,
	type: PropTypes.oneOf(['prev', 'next', 'virtual', 'polygon-break', 'remove']).isRequired,
	description: PropTypes.string,
	param: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
};


export default ButtonOptions;