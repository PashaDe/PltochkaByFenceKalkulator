import React from 'react';

import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';
import FormChangePassword from '../../forms/FormChangePassword';


class View extends React.Component {
	render() {
		return (
			<Template>
				<h1>{___('Zmiana hasła')}</h1>

				<FormChangePassword />
			</Template>
		);
	}
}


export default View;