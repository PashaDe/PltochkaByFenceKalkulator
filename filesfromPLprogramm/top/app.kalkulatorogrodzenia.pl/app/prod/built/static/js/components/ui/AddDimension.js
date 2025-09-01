import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class AddDimension extends React.Component {
	render() {
		return (
			<button
				onClick={this.props.action}
				title={this.props.description}
				aria-label={this.props.description}
				className={classNames(
					'add-dimension',
					`add-dimension-${this.props.position}`,
				)}
			/>
		);
	}
}


AddDimension.defaultProps = {
	action: null,
	description: null,
};

AddDimension.propTypes = {
	action: PropTypes.func,
	position: PropTypes.oneOf(['top', 'left', 'right', 'bottom']).isRequired,
	description: PropTypes.string,
};


export default AddDimension;