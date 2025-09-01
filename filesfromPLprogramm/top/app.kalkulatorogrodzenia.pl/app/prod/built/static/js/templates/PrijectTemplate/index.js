import React from 'react';
import PropTypes from 'prop-types';

import './styles/style.scss';


class Template extends React.Component {
	render() {
		return (
			<div id="templates-project-template">
				<div id="container">
					{this.props.children}
				</div>
			</div>
		);
	}
}


Template.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node]).isRequired,
};


export default Template;