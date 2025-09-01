import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';

import Http from 'classes/Http';

import config from '../config';

import ProjectTemplate from 'templates/ProjectTemplate';
import Dialog from 'modules/assets/Dialog/components/Dialog';
import Popup from 'modules/assets/Popup/components/Popup';
import Application from '../components/Application';
import Intro from '../components/Intro';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.id = (this.props.match.params.id) ? parseInt(this.props.match.params.id, 10) : 0;
		this.vr = Boolean(this.props.match.params.vr);

		this.config = config();

		this.state = {
			view: 'loading',
			debug: (container.config.env === 'dev'),
			project: null,
		};
	}

	componentDidMount = () => {
		if (!this.id) {
			this.setState({
				view: 'default',
			});
		} else {
			Http.post(`project/${this.id}/`, {
				success: (response) => {
					try {
						let project = response;
						project.data = JSON.parse(project.data);

						this.setState({
							view: 'default',
							project,
						});
					} catch (exception) {
						// alert('Wystąpił błąd podczas ładowania projektu!');
					}
				},
			});
		}
	}

	render() {
		switch (this.state.view) {
			default:
				if (!(this.state.project?.data.system && this.state.project?.data.blocksFamily)) {
					return (
						<ProjectTemplate>
							<Intro instance={this} />
						</ProjectTemplate>
					);
				}

				return (
					<ProjectTemplate>
						<Intro
							instance={this}
							ref={(element) => {
								container.intro = element;
							}}
						/>

						<Application
							config={this.config}
							type={this.vr ? 'vr' : 'normal'}
							debug={this.state.debug}
							id={this.id}
							project={this.state.project}
						/>

						<Dialog />
						<Popup />
					</ProjectTemplate>
				);


			case 'loading':
				return (
					<></>
				);
		}
	}
}


View.defaultProps = {
	match: null,
};

View.propTypes = {
	match: PropTypes.object,
};


export default View;