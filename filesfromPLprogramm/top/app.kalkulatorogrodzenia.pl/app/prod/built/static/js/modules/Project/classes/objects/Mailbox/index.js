import * as panelActions from '../../../redux/panel/actions';

import ThreeBuffer from 'classes/Three/ThreeBuffer';
import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';

import MailboxActions from './MailboxActions';
import MailboxMesh from './MailboxMesh';


class Mailbox extends MailboxMesh {
	constructor(instance, target) {
		super();

		this.instance = instance;
		this.three = instance.three;
		this.actions = new MailboxActions(instance, this);

		this.buffer = new ThreeBuffer(null, () => {
			this.do();
		});

		// config
		this.config = {
			group: null,
			model: null,
			color: null,
			frame: '',
			roof: '',
			side: 'front',
		};

		// objects
		this.objects = {
			front: null,
			back: null,
			frame: null,
			roof: null,
		};

		// settings
		this.target = target;

		this.material = this.setMaterial();
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.lock = {
			front: null,
			back: null,
			frame: null,
			roof: null,
		};

		this.do();
	}

	getColor = () => {
		const color = this.instance.config.mailboxes[this.config.group]?.models[this.config.model].colors[this.config.color];

		if (color?.color) {
			return `#${color.color}`;
		}

		return this.config.color;
	}

	getModelsList = (list) => {
		let output = [];

		Objects.entries(list).forEach(([key, entry]) => {
			const depth = this.target.getBlockDepth();

			if (depth >= entry.target[0] && depth <= entry.target[1]) {
				output[key] = { label: entry.label, path: `/assets/img/mailboxes/default/models/${key}.jpg` };
			}
		});

		return output;
	}

	setMaterial = () => {
		if (this.config.group && this.config.model) {
			if (this.instance.config.mailboxes[this.config.group]?.models[this.config.model]?.additionals.frame?.auto) {
				this.config.frame = '';
			}

			if (this.instance.config.mailboxes[this.config.group]?.models[this.config.model]?.additionals.roof?.auto) {
				this.config.roof = '';
			}

			return this.instance.config.mailboxes[this.config.group]?.models[this.config.model];
		}

		return null;
	}

	setStatus = () => !!(!this.target.config.virtual && !this.target.additionals?.ledblock.getOffset() && this.material)

	calcPosition = () => {
		let position = {
			x: (this.target.blockMaterial.block.type === 'corner') ? this.target.width / 2 : 0,
			y: this.target.calcPolePositionY() + this.target.height - 0.32,
			z: this.target.getBlockDepth() / 2,
		};

		let diffFront = Maths.rotatePoint({
			x: position.x,
			y: 0,
			z: position.z,
		}, this.target.rotation);

		let diffBack = Maths.rotatePoint({
			x: position.x,
			y: 0,
			z: -position.z,
		}, this.target.rotation);

		let backAngleDiff = 0;
		if (this.material?.back.position.angle) {
			backAngleDiff = (this.target.getBlockDepth() - this.material.target[0]) / Math.tan(this.material?.back.position.angle * Math.PI / 180);
		}

		const front = {
			x: this.target.position.x - diffFront.x,
			y: position.y,
			z: this.target.position.z - diffFront.z,
			correct: this.material?.front.position.y,
			rotation: 0,
		};

		const back = {
			x: this.target.position.x - diffBack.x,
			y: position.y - backAngleDiff,
			z: this.target.position.z - diffBack.z,
			correct: (this.material?.front.height - this.material?.back.height) / 2 + this.material?.back.position.y,
			rotation: Math.PI,
		};

		if (this.config.side === 'front') {
			return {
				front: {
					x: front.x,
					y: front.y + front.correct,
					z: front.z,
					rotation: front.rotation,
				},
				back: {
					x: back.x,
					y: back.y + back.correct,
					z: back.z,
					rotation: back.rotation,
				},
			};
		}

		return {
			front: {
				x: back.x,
				y: back.y + front.correct,
				z: back.z,
				rotation: back.rotation,
			},
			back: {
				x: front.x,
				y: front.y + back.correct,
				z: front.z,
				rotation: front.rotation,
			},
		};
	}

	do = () => {
		if (this.instance.isLoading) return;

		if (!this.instance.isMoving) {
			setTimeout(() => {
				this.doFront();
				this.doBack();
				this.doFrame();
				this.doRoof();
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

		if (this.target.additionals?.lamp.config.group && this.target.additionals?.lamp.config.model) {
			this.target.additionals.lamp.reload();
		}
	}

	remove = () => {
		this.three.scenes['3d'].remove(this.objects.front);
		this.three.scenes['3d'].remove(this.objects.back);
		this.three.scenes['3d'].remove(this.objects.frame);
		this.three.scenes['3d'].remove(this.objects.roof);
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('mailbox', this.config, this);
		this.instance.setHighlight(this.target);
	}

	secureConfigToTarget = () => {
		const current = this.setMaterial();
		const depth = this.target.getBlockDepth();

		if (current) {
			if (depth < current.target[0]) {
				if (current.targetReplacement[0]) {
					this.config.model = current.targetReplacement[0];
				} else {
					this.config = {
						group: null,
						model: null,
						color: null,
					};
				}

				return this.reload();
			}

			if (depth > current.target[1]) {
				if (current.targetReplacement[1]) {
					this.config.model = current.targetReplacement[1];
				} else {
					this.config = {
						group: null,
						model: null,
						color: null,
					};
				}

				return this.reload();
			}
		}

		return false;
	}
}


export default Mailbox;