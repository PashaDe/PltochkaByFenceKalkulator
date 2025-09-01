import * as panelActions from '../../../redux/panel/actions';

import Objects from 'classes/Tools/Objects';

import LedblockActions from './LedblockActions';
import LedblockMesh from './LedblockMesh';


class Ledblock extends LedblockMesh {
	constructor(instance, target) {
		super();

		this.instance = instance;
		this.three = instance.three;
		this.actions = new LedblockActions(instance, this);

		// config
		this.config = {
			group: null,
			model: null,
			color: null,
		};

		// objects
		this.objects = {
			model: null,
			front: null,
			back: null,
		};

		// settings
		this.target = target;

		this.material = this.setMaterial();
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.lock = {
			model: null,
			front: null,
			back: null,
		};

		this.do();
	}

	getColor = () => {
		const color = this.instance.config.ledblocks[this.config.group]?.models[this.config.model].colors[this.config.color];

		if (color?.color) {
			return `#${color.color}`;
		}

		return this.config.color;
	}

	getHeight = () => ((this.status && this.material) ? this.material.size.height : 0)

	getOffset = () => ((this.status && this.material) ? (this.material.offset || 0) : 0)

	getModelsList = (list) => {
		let output = [];

		Objects.entries(list).forEach(([key, entry]) => {
			if (this.isTarget(entry)) {
				output[key] = `${entry.label} - ${entry.description}`;
			}
		});

		return output;
	}

	setMaterial = () => {
		if (this.config.group && this.config.model) {
			return this.instance.config.ledblocks[this.config.group]?.models[this.config.model];
		}

		return null;
	}

	setStatus = () => !!(!this.target.config.virtual && this.target.blockMaterial.block.type !== 'corner' && this.material && this.isTarget(this.material))

	calcPosition = () => {
		return {
			x: this.target.position.x,
			y: this.target.calcPolePositionY() + this.target.height,
			z: this.target.position.z,
			rotation: 0,
		};
	}

	do = () => {
		if (this.instance.isLoading) return;

		if (!this.instance.isMoving) {
			setTimeout(() => {
				this.doModel();
				this.doFront();
				this.doBack();

				this.target.doPole();
			}, 300);
		}
	}

	update = () => {
		this.secureConfigToTarget();

		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.do();
	}

	reload = () => {
		this.material = this.setMaterial();
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.do();

		this.target.doPeak();

		if (this.target.additionals?.mailbox.config.group && this.target.additionals?.mailbox.config.model) {
			this.target.additionals.mailbox.reload();
		}
	}

	remove = () => {
		this.three.scenes['3d'].remove(this.objects.model);
		this.three.scenes['3d'].remove(this.objects.front);
		this.three.scenes['3d'].remove(this.objects.back);
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('ledblock', this.config, this);
		this.instance.setHighlight(this.target);
	}

	isTarget = (material) => {
		return (
			this.target.config.size.width === 1
			&& material.size.width === this.target.blockMaterial.block.width
			&& material.size.depth === this.target.getBlockDepth()
		);
	}

	secureConfigToTarget = () => {
		const current = this.setMaterial();
		const depth = this.target.getBlockDepth();

		if (current) {
			if (depth !== current.size.depth) {
				if (current.targetReplacement && this.instance.config.ledblocks[this.config.group]?.models[current.targetReplacement]?.size.depth === depth) {
					this.config.model = current.targetReplacement[0];
				}

				return this.reload();
			}
		}

		return false;
	}
}


export default Ledblock;