import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Objects from 'classes/Tools/Objects';


class FlexList extends React.Component {
	getLabel = (key, entry) => {
		if (typeof entry === 'string') {
			return entry;
		}

		if (typeof entry === 'object') {
			return entry?.label;
		}

		return key;
	}

	render() {
		return (
			<ul
				className={classNames(
					'flex-list',
					`flex-list-${this.props.align}`,
				)}
			>
				{Objects.entries(this.props.options).map(([key, entry]) => (
					<li key={key}>
						<button onClick={() => this.props.action(key)}>
							{(key === this.props.value) ? (<strong>{this.getLabel(key, entry)}</strong>) : this.getLabel(key, entry)}
						</button>
					</li>
				))}
			</ul>
		);
	}
}


FlexList.defaultProps = {
	action: null,
	options: null,
	value: null,
	align: 'left',
};

FlexList.propTypes = {
	action: PropTypes.func,
	options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	value: PropTypes.string,
	align: PropTypes.oneOf(['left', 'center', 'right', 'around', 'between', 'evenly', 'half']),
};


export default FlexList;