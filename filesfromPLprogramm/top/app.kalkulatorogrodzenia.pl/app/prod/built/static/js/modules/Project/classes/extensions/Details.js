import React from 'react';

import * as workspaceActions from '../../redux/workspace/actions';

import { ___ } from 'classes/Translation';

import ButtonImage from 'components/ui/ButtonImage';


class Details {
	constructor(instance) {
		this.instance = instance;
		this.three = instance.three;

		workspaceActions.add('bottom-left', 'details', (
			<ButtonImage action={() => this.execute()} type="details" description={___('Ustawienia grafiki')} order={2} />
		));
	}

	execute = () => {
		window.location.replace('/graphic-details/');
	}
}


export default Details;