import * as dialogActions from 'modules/assets/Dialog/redux/actions';

import { ___ } from 'classes/Translation';


class DimensionActions {
	constructor(instance, target) {
		this.instance = instance;
		this.target = target;
	}

	type = (id) => {
		this.target.setType(id);
		this.target.displayOptions();
		this.instance.setModified();
	}

	position = (id) => {
		this.target.setPosition(id);
		this.target.displayOptions();
		this.instance.setModified();
	}

	align = (id) => {
		this.target.setAlign(id);
		this.target.displayOptions();
		this.instance.setModified();
	}

	remove = () => {
		dialogActions.confirm(
			___('Usunąć ?'),
			() => {
				this.instance.extensions.dimensions.removeDimension(this.target.id);
				this.instance.resetOptions();
				this.instance.setModified();
			},
		);
	}
}


export default DimensionActions;