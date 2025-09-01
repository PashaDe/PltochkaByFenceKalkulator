import React from 'react';

import { ___ } from 'classes/Translation';

import Template from 'templates/MainTemplate';
import FormExtend from '../forms/FormExtend';


class View extends React.Component {
	render() {
		return (
			<Template>
				<h1>{___('Przedłużanie konta')}</h1>

				<FormExtend />
			</Template>
		);
	}
}


export default View;