import React from 'react';

import Http from 'classes/Http';
import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';
import BoxLoading from 'components/loading/BoxLoading';
import ProjectsList from '../components/ProjectsList';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'loading',
		};
	}

	componentDidMount = () => {
		Http.post('projects/index/', {
			data: {
				type: 'my',
				page: 1,
			},
			success: (response) => {
				if (response.projects) {
					this.setState({
						view: 'default',
						projects: response.projects,
					});
				}
			},
		});
	}

	render() {
		switch (this.state.view) {
			default:
				return (
					<Template>
						<h1>{___('Lista projektów')}</h1>

						<a href="/project/">{___('Utwórz nowy projekt')}</a>

						<ProjectsList projects={this.state.projects} />
					</Template>
				);

			case 'loading':
				return (
					<Template>
						<BoxLoading />
					</Template>
				);
		}
	}
}


export default View;