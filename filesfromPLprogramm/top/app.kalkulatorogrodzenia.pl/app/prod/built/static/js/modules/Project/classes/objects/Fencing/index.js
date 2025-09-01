import * as panelActions from '../../../redux/panel/actions';

import Colors from 'classes/Tools/Colors';
import Helper from 'classes/Tools/Helper';
import Objects from 'classes/Tools/Objects';

import FencingKit from '../../geometry/UniKit/FencingKit';
import FencingMesh from './FencingMesh';


class Fencing extends FencingMesh {
	constructor(instance, wall) {
		super();

		this.instance = instance;
		this.three = instance.three;

		// this.sequentialBuffer = [];

		// objects
		this.objects = {
			ghost: null,
			span: null,
			poles: null,
		};

		// settings
		this.wall = wall;

		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.material = this.setMaterial();
		this.data = this.calcData();

		this.determine = false;

		this.do();
	}

	getColor = () => Colors.hex(this.instance.config.fencings[this.instance.fencings.group].systems[this.instance.fencings.system].colors[this.instance.fencings.color].color);

	setStatus = () => {
		if (this.wall.combo.status && this.wall.combo.destination) {
			return false;
		}

		return !!(this.wall.config.fencing !== 'off' && (this.wall.config.kind === 'wall' || this.wall.config.kind === 'space') && !this.wall.panels.getStatus() && this.wall.status && !this.wall.error && this.wall.width <= 1000);
	}

	calcPosition = () => ({
		x: this.wall.position.normal.x,
		y: this.getWallHeight(),
		z: this.wall.position.normal.z,
	})

	setMaterial = () => {
		if (this.instance.fencings.status && this.instance.fencings.group && this.instance.fencings.system && this.instance.fencings.variant) {
			const pattern = this.instance.config.fencings[this.instance.fencings.group].systems[this.instance.fencings.system].pattern;
			const variant = this.instance.config.fencings[this.instance.fencings.group].systems[this.instance.fencings.system].variants[this.instance.fencings.variant];

			if (variant) {
				return Objects.merge(pattern, variant);
			}
		}

		return null;
	}

	calcData = () => {
		let params = {};
		let maxHeight = 0;
		let height = 0;
		let dig = 0;
		let poles = { left: false, right: false };
		let cutPole = { left: 0, right: 0 };
		let cutSpan = { left: 0, right: 0 };

		if (this.status) {
			maxHeight = this.getMaxHeight();

			const suggestedHeight = parseFloat(this.wall.config.fencingHeight);

			if (suggestedHeight !== Number.NaN) {
				if (maxHeight === 0 || suggestedHeight < maxHeight) {
					maxHeight = suggestedHeight;
				}
			}

			if (maxHeight) {
				params.args = { direction: 'center', width: this.wall.width, height: maxHeight - Helper.aN((this.material?.spaceable !== false) ? this.instance.getSystem().adds.fencings.space?.top : 0) - Helper.aN((this.material?.spaceable !== false) ? this.instance.getSystem().adds.fencings.space?.bottom : 0), custom: { space: parseFloat(this.instance.fencings.space) } };

				if (this.material) {
					params.data = FencingKit.data(params.args, this.material);
					height = params.data.height;

					if (height) {
						if (!this.data) this.data = [];
						this.data.maxHeight = maxHeight;
						this.data.height = height;

						dig = Helper.aN(this.wall.peakMaterial.tip?.height);

						// space
						if (this.determine && (this.determine.pole1.config.virtual || this.determine.pole2.config.virtual)) {
							params.args.space = (maxHeight - height) - (this.determine?.fencing.data.maxHeight - this.determine?.fencing.data.height) / 2;
						} else {
							params.args.space = (maxHeight - height) / 2;
						}

						params.args.space += dig + (Helper.aN((this.material?.spaceable !== false) ? this.instance.getSystem().adds.fencings.space?.top : 0) - Helper.aN((this.material?.spaceable !== false) ? this.instance.getSystem().adds.fencings.space?.bottom : 0)) / 2;

						// poles
						if (this.wall.pole1.config.virtual) {
							poles.left = true;

							if (this.wall.pole1 && this.wall.pole1.wall.config.kind === 'wicket') {
								if (this.wall.pole1.wall.manufacture.config.status) {
									poles.left = false;
								}
							}
						}

						if (this.wall.pole2.config.virtual) {
							const end = this.wall.pole2.config.polygonBreak || this.wall.pole2.isLast();
							const sameHeight = this.wall.pole2.next && this.wall.pole2.next.wall.config.kind === 'wall' && this.wall.pole2.next.wall.height === this.wall.height;

							if (!(this.wall.pole2.blockMaterial.block.type !== 'corner' && !end && sameHeight)) {
								poles.right = true;
							}

							if (this.wall.pole2.next && this.wall.pole2.next.wall.config.kind === 'wicket') {
								if (this.wall.pole2.next.wall.manufacture.config.status) {
									poles.right = false;
								}
							}
						}

						// cut
						cutSpan.left = (poles.left) ? this.material.joiners.width : 0;
						cutSpan.right = (poles.right) ? this.material.joiners.width : 0;

						if (this.wall.pole1.config.virtual && this.instance.isRightAngle(this.wall.pole1.angle)) {
							cutPole.left -= this.material.joiners.width / 2;
							cutSpan.left -= this.material.joiners.width / 2;
						}

						if (poles.right === false && this.instance.isRightAngle(this.wall.pole2.angle)) {
							cutSpan.right += this.material.joiners.width / 2;
						}

						params.args.indent = cutSpan;
					}
				}
			}
		}

		return {
			params,
			maxHeight,
			height,
			dig,
			poles,
			cutPole,
			cutSpan,
		};
	}

	do = () => {
		if (this.instance.isLoading) return;

		if (!this.instance.isMoving) {
			this.doGhost();
			this.doSpan();
			this.doPoles();
		}
	}

	update = () => {
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.data = this.calcData();

		this.do();
		// this.reloadBuffer();
	}

	reload = () => {
		this.material = this.setMaterial();
		this.data = this.calcData();

		this.do();
	}

	remove = () => {
		this.three.scenes['3d'].remove(this.objects.ghost);
		this.three.scenes['3d'].remove(this.objects.span);
		this.three.scenes['3d'].remove(this.objects.poles);
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('wall', this.wall.config, this.wall);
		this.instance.setHighlight(this.wall);
	}


	/* --- FUNCTIONS ------------------------------------------ */

	getMaxHeight = () => {
		let maxPolesHeight = this.getMaxPolesHeight();

		if (maxPolesHeight > 0 && maxPolesHeight < Infinity) {
			let maxHeight = maxPolesHeight - this.getWallHeight();

			return (maxHeight > 0) ? maxHeight : 0;
		}

		return 0;
	}

	getMaxPolesHeight = () => {
		let pole1Height = (!this.wall.pole1.config.virtual) ? this.wall.pole1.fullHeight : 0;
		let pole2Height = (!this.wall.pole2.config.virtual) ? this.wall.pole2.fullHeight : 0;

		if (!pole1Height && this.wall.pole1.prev && this.wall.pole1.prev.config.polygonBreak) {
			pole1Height = Infinity;
		}

		if (!pole2Height && this.wall.pole2.config.polygonBreak) {
			pole2Height = Infinity;
		}

		return Math.min.apply(null, [pole1Height, pole2Height]);
	}

	/* getMaxPolesHeightWithSequence = () => {
		let sequencePole1;
		let sequencePole2;

		let sequenceLeft;
		let sequenceRight;

		sequenceLeft = this.getPoleSequentialHeight(this.wall.pole1, 'left');
		sequenceRight = this.getPoleSequentialHeight(this.wall.pole1, 'right');
		sequencePole1 = (sequenceLeft.height <= sequenceRight.height) ? sequenceLeft : sequenceRight;

		sequenceLeft = this.getPoleSequentialHeight(this.wall.pole2, 'left');
		sequenceRight = this.getPoleSequentialHeight(this.wall.pole2, 'right');
		sequencePole2 = (sequenceLeft.height <= sequenceRight.height) ? sequenceLeft : sequenceRight;

		if (!sequencePole1.height && this.wall.pole1.prev && (this.wall.pole1.prev.config.polygonBreak || (this.wall.pole1.prev.isFirst() && this.wall.pole1.prev.config.virtual))) {
			sequencePole1.height = Infinity;
		}

		if (!sequencePole2.height && (this.wall.pole2.config.polygonBreak || (this.wall.pole2.isLast() && this.wall.pole2.config.virtual))) {
			sequencePole2.height = Infinity;
		}

		// result
		if (sequencePole1.height <= sequencePole2.height) {
			this.determine = sequencePole1.determine;
			return sequencePole1.height;
		}

		this.determine = sequencePole2.determine;
		return sequencePole2.height;
	} */

	getWallHeight = () => ((this.wall.config.kind === 'wall') ? this.wall.height + this.wall.peakMaterial.height + Helper.aN(this.wall.peakMaterial.tip?.height) : 0)

	/* getPoleSequentialHeight = (pole, direction) => {
		let result = { height: Infinity, determine: false };

		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (pole.config.virtual) {
				if (direction === 'left') {
					if (pole.prev && pole.prev.id !== pole.id) {
						if (!pole.isFirst() && !pole.prev.config.polygonBreak) {
							if (!(pole.prev.wall && Objects.in(pole.prev.wall.config.kind, ['wicket', 'gate']))) {
								this.sequentialBuffer[pole.id] = pole;
								pole = pole.prev;
								this.sequentialBuffer[pole.id] = pole;

								// eslint-disable-next-line no-continue
								continue;
							}
						}
					}

					break;
				}

				if (direction === 'right') {
					if (pole.next && pole.next.id !== pole.id) {
						if (!pole.isLast() && !pole.config.polygonBreak) {
							if (!(pole.wall && Objects.in(pole.wall.config.kind, ['wicket', 'gate']))) {
								this.sequentialBuffer[pole.id] = pole;
								pole = pole.next;
								this.sequentialBuffer[pole.id] = pole;

								// eslint-disable-next-line no-continue
								continue;
							}
						}
					}

					break;
				}
			} else {
				if (direction === 'left') {
					result = { height: pole.fullHeight, determine: (pole.next) ? pole.next.wall : null };
				}

				if (direction === 'right') {
					result = { height: pole.fullHeight, determine: pole.wall };
				}

				break;
			}
		}

		return result;
	}

	reloadBuffer = () => {
		Objects.values(this.sequentialBuffer).forEach((entry) => {
			if (entry.wall && entry.wall.fencing) {
				entry.wall.fencing.reload();
			}
		});

		this.sequentialBuffer = [];
	} */
}


export default Fencing;