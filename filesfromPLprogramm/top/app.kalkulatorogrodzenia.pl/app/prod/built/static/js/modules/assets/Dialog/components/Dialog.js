import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as dialogActions from 'modules/assets/Dialog/redux/actions';

import { ___ } from 'classes/Translation';


class Dialog extends React.Component {
	accept = () => {
		if (this.props.accept) {
			this.props.accept();
		}

		dialogActions.hide();
	}

	decline = () => {
		if (this.props.decline) {
			this.props.decline();
		}

		dialogActions.hide();
	}

	render() {
		return (
			<>
				{(this.props.status) && (
					<div className="dialog-container">
						<div className="dialog">
							<div className="dialog-content">
								<div className="content">{this.props.content}</div>

								{(this.props.kind === 'confirm') && (
									<div className="buttons">
										<button onClick={this.accept} className="button-confirm">{___('Tak')}</button>
										<button onClick={this.decline} className="button-decline">{___('Nie')}</button>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}


Dialog.defaultProps = {
	status: false,
	kind: null,
	content: null,
	accept: null,
	decline: null,
};

Dialog.propTypes = {
	status: PropTypes.bool,
	kind: PropTypes.oneOf(['alert', 'confirm']),
	content: PropTypes.node,
	accept: PropTypes.func,
	decline: PropTypes.func,
};


const mapStateToProps = (state) => ({
	status: state.dialog.status,
	kind: state.dialog.kind,
	content: state.dialog.content,
	accept: state.dialog.accept,
	decline: state.dialog.decline,
});

export default connect(mapStateToProps, null)(Dialog);