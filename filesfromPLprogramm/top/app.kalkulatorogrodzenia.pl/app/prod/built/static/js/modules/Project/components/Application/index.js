import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import container from 'redux/container';

import App from '../../classes/App';

import Panel from './Panel';
import Workspace from './Workspace';


class Application extends React.Component {
	componentDidMount = () => {
		container.app = new App({
			intro: container.intro,
			canvas: [container.workspace.canvas, container.workspace.canvasHelper],
			config: this.props.config,
			type: this.props.type,
			debug: this.props.debug,
			id: this.props.id,
			project: this.props.project,
		});
	}

	render() {
		return (
			<div
				id="application"
				className={classNames(
					'grid',
					{ preview: this.props.type !== 'normal' },
				)}
			>
				<div className="col-panel">
					<Panel />
				</div>

				<div className="col-workspace">
					<Workspace
						ref={(element) => {
							container.workspace = element;
						}}
					/>
				</div>
			</div>
		);
	}
}


Application.defaultProps = {
	config: null,
	type: 'normal',
	debug: false,
	id: 0,
	project: null,
};

Application.propTypes = {
	config: PropTypes.object,
	type: PropTypes.string,
	debug: PropTypes.bool,
	id: PropTypes.number,
	project: PropTypes.object,
};


export default Application;