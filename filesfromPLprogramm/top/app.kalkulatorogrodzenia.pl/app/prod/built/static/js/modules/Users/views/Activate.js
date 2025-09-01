import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as noticesActions from 'modules/assets/Notices/redux/actions';

import Http from 'classes/Http';
import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';
import BoxLoading from 'components/loading/BoxLoading';


class View extends React.Component {
	constructor(props) {
		super(props);

		this.code = this.props.match.params.code;

		this.state = {
			view: 'loading',
		};
	}

	componentDidMount = () => {
		Http.post('users/activate/', {
			data: {
				code: this.code,
			},
			success: (response) => {
				if (response.status) {
					noticesActions.set(`${___('Konto zostało aktywowane')}. ${___('Możesz się teraz zalogować')}.`);
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


View.defaultProps = {
	match: null,
};

View.propTypes = {
	match: PropTypes.object,
};


export default View;