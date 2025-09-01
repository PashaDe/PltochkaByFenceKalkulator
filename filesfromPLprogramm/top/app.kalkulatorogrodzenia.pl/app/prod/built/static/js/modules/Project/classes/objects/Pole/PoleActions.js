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

	depthPlus = () => {
		this.target.resizeDepth(this.target.config.size.depth + 1);
		this.target.displayOptions();
		this.instance.setModified();
	}

	depthMinus = () => {
		this.target.resizeDepth(this.target.config.size.depth - 1);
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

	polygonBreak = () => {
		this.target.setPolygonBreak((!this.target.config.polygonBreak));
		this.target.displayOptions();
		this.instance.setModified();
	}

	remove = () => {
		dialogActions.confirm(
			___('Usunąć ?'),
			() => {
				this.instance.removePole(this.target.id);
				this.instance.resetOptions();
				this.instance.setModified();
			},
		);
	}

	virtual = () => {
		this.target.setVirtual((!this.target.config.virtual));
		this.target.displayOptions();
		this.instance.setModified();
	}

	widthPlus = () => {
		this.target.resizeWidth(this.target.config.size.width + 1);
		this.target.displayOptions();
		this.instance.setModified();
	}

	widthMinus = () => {
		this.target.resizeWidth(this.target.config.size.width - 1);
		this.target.displayOptions();
		this.instance.setModified();
	}
}


export default PoleActions;