import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Objects from 'classes/Tools/Objects';


class ColorsList extends React.Component {
	render() {
		return (
			<>
				{this.props.title && (
					<h3>{this.props.title}</h3>
				)}

				<div className="colors-list">
					{Objects.entries(this.props.options).map(([key, entry]) => (
						<div
							className={classNames(
								key === this.props.value ? 'active' : null,
							)}
							key={key}
						>
							<button
								onClick={() => this.props.action(key, entry)}
								aria-label={entry.label}
								style={{
									backgroundColor: entry.color ? `#${entry.color}` : null,
									backgroundImage: entry.path ? `url(${entry.path})` : null,
								}}
							/>
							<span className="tooltip">{entry.label}</span>
						</div>
					))}
				</div>
			</>
		);
	}
}


ColorsList.defaultProps = {
	action: null,
	title: null,
	options: null,
	value: null,
};

ColorsList.propTypes = {
	action: PropTypes.func,
	title: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	value: PropTypes.string,
};


export default ColorsList;