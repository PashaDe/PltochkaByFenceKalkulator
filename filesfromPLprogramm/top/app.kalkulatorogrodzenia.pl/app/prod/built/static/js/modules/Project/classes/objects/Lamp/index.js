import * as panelActions from '../../../redux/panel/actions';

import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';

import LampActions from './LampActions';
import LampMesh from './LampMesh';


class Lamp extends LampMesh {
	constructor(instance, target) {
		super();

		this.instance = instance;
		this.three = instance.three;
		this.actions = new LampActions(instance, this);

		// config
		this.config = {
			group: null,
			model: null,
			text: '123',
		};

		// objects
		this.objects = {
			model: null,
			glass: null,
			light: null,
			flash1: null,
			flash2: null,
			text: null,
		};

		// settings
		this.target = target;

		this.material = this.setMaterial();
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.lock = {
			model: null,
			glass: null,
			light: null,
		};

		this.do();
	}

	getModelsList = (list) => {
		let output = [];

		Objects.entries(list).forEach(([key, entry]) => {
			output[key] = { label: entry.label, path: `/assets/img/lamps/default/models/${key}.jpg` };
		});

		return output;
	}

	setMaterial = () => {
		if (this.config.group && this.config.model) {
			return this.instance.config.lamps[this.config.group]?.models[this.config.model];
		}

		return null;
	}

	setStatus = () => !!(!this.target.config.virtual && !this.target.additionals?.ledblock.getOffset() && this.material)

	calcPosition = () => {
		let y;

		switch (this.material?.position) {
			case 'bottom':
				y = this.target.blockMaterial.block.height * 1.5;
				break;

			default:
				y = this.target.calcPolePositionY() + this.target.height - 0.32;

				if (this.target.additionals?.mailbox.config.group && this.target.additionals?.mailbox.config.model) {
					y -= 0.32;
				}
				break;
		}

		let position = {
			x: (this.target.blockMaterial.block.type === 'corner') ? this.target.width / 2 : 0,
			y,
			z: this.target.getBlockDepth() / 2,
		};

		let diff = Maths.rotatePoint({
			x: position.x,
			y: 0,
			z: position.z,
		}, this.target.rotation);

		let diffText = Maths.rotatePoint({
			x: position.x + 0.01,
			y: 0,
			z: position.z + 0.023,
		}, this.target.rotation);

		return {
			x: this.target.position.x - diff.x,
			y: position.y,
			z: this.target.position.z - diff.z,
			text: {
				x: this.target.position.x - diffText.x,
				y: position.y - 0.045,
				z: this.target.position.z - diffText.z,
			},
		};
	}

	do = () => {
		if (this.instance.isLoading) return;

		if (!this.instance.isMoving) {
			this.doModel();
			this.doGlass();
			this.doLight();
			this.doFlash1();
			this.doFlash2();
			this.doText();
		}
	}

	update = () => {
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.do();
	}

	reload = () => {
		this.material = this.setMaterial();
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.do();
	}

	remove = () => {
		this.three.scenes['3d'].remove(this.objects.model);
		this.three.scenes['3d'].remove(this.objects.glass);
		this.three.scenes['3d'].remove(this.objects.light);
		this.three.scenes['3d'].remove(this.objects.flash1);
		this.three.scenes['3d'].remove(this.objects.flash2);
		this.three.scenes['3d'].remove(this.objects.text);
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('lamp', this.config, this);
		this.instance.setHighlight(this.target);
	}
}


export default Lamp;