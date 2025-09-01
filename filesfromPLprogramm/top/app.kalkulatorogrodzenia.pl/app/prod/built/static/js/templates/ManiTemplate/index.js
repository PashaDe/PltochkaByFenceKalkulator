import React from 'react';
import PropTypes from 'prop-types';

import Notices from 'modules/assets/Notices/components/Notices';
import Header from './Header';
import Footer from './Footer';

import './styles/style.scss';


class Template extends React.Component {
	render() {
		return (
			<div id="templates-main-template">
				<div id="container">
					<Header type={this.props.type} />

					<section>
						<div className="wrapper">
							{this.props.children}
						</div>
					</section>

					<Footer />

					<Notices />
				</div>
			</div>
		);
	}
}


Template.defaultProps = {
	type: undefined,
};

Template.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node]).isRequired,
	type: PropTypes.string,
};


export default Template;