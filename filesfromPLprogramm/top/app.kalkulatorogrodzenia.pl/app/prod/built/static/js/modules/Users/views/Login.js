import React from 'react';

import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';
import FormLogin from '../forms/FormLogin';


class View extends React.Component {
	render() {
		return (
			<Template type="login">
				<h1>{___('Logowanie')}</h1>

				<FormLogin />
			</Template>
		);
	}
}


export default View;