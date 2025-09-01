import React from 'react';

import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';
import FormRegister from '../forms/FormRegister';


class View extends React.Component {
	render() {
		return (
			<Template>
				<h1>{___('Rejestracja')}</h1>

				<FormRegister />
			</Template>
		);
	}
}


export default View;