import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as noticesActions from 'modules/assets/Notices/redux/actions';

import Http from 'classes/Http';
import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';
import BoxLoading from 'components/loading/BoxLoading';
import FormResetPassword from '../forms/FormResetPassword';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.code = this.props.match.params.code;

		this.state = {
			view: (!this.code) ? 'form' : 'code',
		};
	}

	componentDidMount = () => {
		switch (this.state.view) {
			case 'code':
				Http.post('users/reset-password/', {
					data: {
						code: this.code,
					},
					success: (response) => {
						if (response.status) {
							noticesActions.set(___('E-mail z danymi do logowania został wysłany.'));
						} else {
							noticesActions.set(___('Kod weryfikacyjny został już wykorzystany lub jest nieprawidłowy.'), 'error');
						}

						this.setState({ view: undefined });
					},
				});
				break;

			default:
		}
	}

	render() {
		switch (this.state.view) {
			case 'form':
				return (
					<Template>
						<h1>{___('Resetowanie hasła')}</h1>

						<FormResetPassword />
					</Template>
				);

			case 'code':
				return (
					<Template>
						<BoxLoading />
					</Template>
				);

			default:
				return (
					<Redirect to="/login/" />
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