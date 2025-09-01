import React from 'react';
import PropTypes from 'prop-types';

import container from 'redux/container';

import Http from 'classes/Http';

import config from '../config';

import ProjectTemplate from 'templates/ProjectTemplate';
import Application from '../components/Application';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.id = (this.props.match.params.id) ? parseInt(this.props.match.params.id, 10) : 0;
		this.token = (this.props.match.params.token) ? this.props.match.params.token : false;
		this.vr = Boolean(this.props.match.params.vr);

		this.config = config();

		this.state = {
			view: 'loading',
			debug: (container.config.env === 'dev'),
			project: null,
		};
	}

	componentDidMount = () => {
		Http.post(`preview/${this.id}/${this.token}/`, {
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

	render() {
		switch (this.state.view) {
			default:
				return (
					<ProjectTemplate>
						<Application config={this.config} type={this.vr ? 'vr' : 'preview'} debug={this.state.debug} id={this.id} project={this.state.project} />
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