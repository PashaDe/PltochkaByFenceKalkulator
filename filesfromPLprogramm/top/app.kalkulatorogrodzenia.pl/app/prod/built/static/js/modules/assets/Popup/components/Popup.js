/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as popupActions from 'modules/assets/Popup/redux/actions';

import { ___ } from 'classes/Translation';


class Popup extends React.Component {
	close = () => {
		popupActions.hide();
	}

	render() {
		return (
			<>
				{(this.props.status) && (
					<div className="popup-container">
						<div className="popup">
							<button onClick={this.close} className="close" aria-label={___('Zamknij')} />

							<div className="toolbar">{this.props.toolbar}</div>

							<div className="popup-content">
								<div className="content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}


Popup.defaultProps = {
	status: false,
	toolbar: null,
	content: null,
};

Popup.propTypes = {
	status: PropTypes.bool,
	toolbar: PropTypes.node,
	content: PropTypes.node,
};


const mapStateToProps = (state) => ({
	status: state.popup.status,
	toolbar: state.popup.toolbar,
	content: state.popup.content,
});

export default connect(mapStateToProps, null)(Popup);