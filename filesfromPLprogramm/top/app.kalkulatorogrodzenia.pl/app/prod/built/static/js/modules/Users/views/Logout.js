import React from 'react';
import { Redirect } from 'react-router-dom';

import container from 'redux/container';
import * as noticesActions from 'modules/assets/Notices/redux/actions';

import Http from 'classes/Http';
import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';
import BoxLoading from 'components/loading/BoxLoading';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'loading',
		};
	}

	componentDidMount = () => {
		Http.post('users/logout/', {
			success: (response) => {
				if (response.status) {
					container.user = null;
					noticesActions.set(`${___('Zostałeś wylogowany')}.`);
				}

				this.setState({ view: 'default' });
			},
		});
	}

	render() {
		switch (this.state.view) {
			default:
				return (
					<Redirect to="/login/" />
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