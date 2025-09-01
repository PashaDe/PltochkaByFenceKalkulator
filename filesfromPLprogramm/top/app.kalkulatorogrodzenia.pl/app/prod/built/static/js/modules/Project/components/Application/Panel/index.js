import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import container from 'redux/container';

import Menu from './Menu';
import ToolbarMain from './ToolbarMain';
import ToolbarProject from './ToolbarProject';

import Episode from './Content/Episode';
import Pole from './Content/Pole';
import Wall from './Content/Wall';
import Wicket from './Content/Wicket';
import Gate from './Content/Gate';
import Panels from './Content/Panels';
import Additionals from './Content/Additionals';
import Mailbox from './Content/Mailbox';
import Lamp from './Content/Lamp';
import Ledblock from './Content/Ledblock';
import Dimension from './Content/Dimension';
import ColorsBlocks from './Content/ColorsBlocks';
import ColorsPeaks from './Content/ColorsPeaks';
import Combo from './Content/Combo';
import Fencings from './Content/Fencings';
import Migration from './Content/Migration';
import Settings from './Content/Settings';


class Panel extends React.Component {
	content = () => {
		switch (this.props.type) {
			case 'episode':
				return (<Episode />);

			case 'pole':
				return (<Pole object={this.props.object} />);

			case 'wall':
				return (<Wall object={this.props.object} />);

			case 'wicket':
				return (<Wicket object={this.props.object} />);

			case 'gate':
				return (<Gate object={this.props.object} />);

			case 'panels':
				return (<Panels object={this.props.object} />);

			case 'additionals':
				return (<Additionals object={this.props.object} />);

			case 'mailbox':
				return (<Mailbox object={this.props.object} />);

			case 'lamp':
				return (<Lamp object={this.props.object} />);

			case 'ledblock':
				return (<Ledblock object={this.props.object} />);

			case 'dimension':
				return (<Dimension object={this.props.object} />);

			case 'colors-blocks':
				return (<ColorsBlocks />);

			case 'colors-peaks':
				return (<ColorsPeaks />);

			case 'combo':
				return (<Combo object={this.props.object} />);

			case 'fencings':
				return (<Fencings object={this.props.object} />);

			case 'migration':
				return (<Migration />);

			case 'settings':
				return (<Settings object={this.props.object} />);

			default:
		}

		return <></>;
	}

	render() {
		return (
			<section>
				<div className="row-panel">
					<Menu />
					<ToolbarMain />
					<ToolbarProject />

					<div className="content">
						{this.content()}
					</div>
				</div>

				<div className="row-switcher">
					<button onClick={() => container.app.actions.switchView()}>2D/3D</button>
				</div>
			</section>
		);
	}
}


Panel.defaultProps = {
	type: null,
	object: null,
};

Panel.propTypes = {
	type: PropTypes.oneOf(['episode', 'pole', 'wall', 'wicket', 'gate', 'panels', 'additionals', 'mailbox', 'lamp', 'ledblock', 'dimension', 'colors-blocks', 'colors-peaks', 'combo', 'fencings', 'migration', 'settings']),
	object: PropTypes.object,
};


const mapStateToProps = (state) => ({
	type: state.panel.type,
	state: JSON.stringify(state.panel.state),
	object: state.panel.object,
});

export default connect(mapStateToProps, null)(Panel);