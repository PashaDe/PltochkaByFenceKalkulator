import * as dialogActions from 'modules/assets/Dialog/redux/actions';

import { ___ } from 'classes/Translation';


class PoleActions {
	constructor(instance, target) {
		this.instance = instance;
		this.target = target;
	}

	blockMaterial = (id) => {
		this.target.setBlockMaterialId(id);
		this.target.displayOptions();
		this.instance.setModified();
	}

	kind = (id) => {
		this.target.setKind(id);
		this.target.displayOptions();
		this.instance.setModified();
	}

	heightPlus = () => {
		this.target.resizeHeight(this.target.config.size.height + 1);
		this.target.displayOptions();
		this.instance.setModified();
	}

	heightMinus = () => {
		this.target.resizeHeight(this.target.config.size.height - 1);
		this.target.displayOptions();
		this.instance.setModified();
	}

	combo = (value) => {
		this.target.config.combo = value;
		this.target.combo.update();
		this.target.fencing.update();

		this.target.displayOptions();
		this.instance.setModified();
	}

	fencing = (value) => {
		this.target.config.fencing = value;
		this.target.combo.update();
		this.target.fencing.update();

		this.target.displayOptions();
		this.instance.setModified();
	}

	fencingHeight = (value) => {
		this.target.config.fencingHeight = value;
		this.target.fencing.update();

		this.target.displayOptions();
		this.instance.setModified();
	}

	remove = () => {
		dialogActions.confirm(
			___('Usunąć ?'),
			() => {
				this.target.setKind('space');

				this.target.displayOptions();
				this.instance.setModified();
			},
		);
	}
}


export default PoleActions;