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

		this.id = (this.props.match.params.id) ? parseInt(this.props.match.params.id, 10) : 0;

		this.state = {
			view: 'loading',
		};
	}

	componentDidMount = () => {
		if (this.id) {
			Http.post(`delete/${this.id}/`, {
				success: (response) => {
					if (response.status) {
						noticesActions.set(`${___('Usunięto projekt')}.`, 'success');
					} else {
						noticesActions.set(`${___('Nie udało się usunąć projektu')}.`, 'error');
					}

					this.setState({
						view: 'default',
					});
				},
			});
		}
	}

	render() {
		switch (this.state.view) {
			case 'loading':
				return (
					<Template>
						<BoxLoading />
					</Template>
				);

			default:
				return (
					<Redirect to="/" />
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