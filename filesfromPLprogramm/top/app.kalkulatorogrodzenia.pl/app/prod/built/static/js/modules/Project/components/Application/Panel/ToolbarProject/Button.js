import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Objects from 'classes/Tools/Objects';


class Button extends React.Component {
	onClick = () => {
		if (this.props.action) {
			this.props.action();
		}

		if (this.props.after) {
			this.props.after();
		}
	}

	render() {
		return (
			<button
				onClick={this.onClick}
				title={this.props.description}
				aria-label={this.props.description}
				className={classNames(
					`type-${this.props.type}`,
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


Button.defaultProps = {
	action: null,
	description: null,
	param: null,
	after: null,
};

Button.propTypes = {
	action: PropTypes.func,
	type: PropTypes.oneOf(['colors-blocks', 'colors-peaks', 'combo', 'fencings', 'average', 'move', 'migration', 'autosave', 'settings']).isRequired,
	description: PropTypes.string,
	param: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
	after: PropTypes.func,
};


export default Button;