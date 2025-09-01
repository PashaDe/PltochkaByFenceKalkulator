import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Objects from 'classes/Tools/Objects';


class OptionsList extends React.Component {
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
			<div className="option">
				{(this.props.title) && (
					<h4>{this.props.title}</h4>
				)}

				<ul
					className={classNames(
						'options-list',
						`inrow-${this.props.inrow}`,
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
			</div>
		);
	}
}


OptionsList.defaultProps = {
	action: null,
	title: null,
	options: null,
	value: null,
	inrow: 1,
};

OptionsList.propTypes = {
	action: PropTypes.func,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	value: PropTypes.string,
	inrow: PropTypes.number,
};


export default OptionsList;