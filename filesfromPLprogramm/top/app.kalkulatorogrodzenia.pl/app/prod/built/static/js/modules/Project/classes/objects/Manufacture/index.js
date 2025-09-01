import * as THREE from 'three';

import * as panelActions from '../../../redux/panel/actions';

import Colors from 'classes/Tools/Colors';
import Helper from 'classes/Tools/Helper';
import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import WicketKit from '../../geometry/UniKit/WicketKit';
import GateSlidingKit from '../../geometry/UniKit/GateSlidingKit';

import ManufactureActions from './ManufactureActions';
import ManufactureMesh from './ManufactureMesh';


class Manufacture extends ManufactureMesh {
	constructor(instance, wall) {
		super();

		this.instance = instance;
		this.three = instance.three;
		this.actions = new ManufactureActions(instance, this);

		this.minSpace = 0.05;
		this.maxSpace = 0.05;

		this.directionVerticalList = {
			in: ___('Do środka'),
			out: ___('Na zewnątrz'),
		};

		this.directionHorizontalList = {
			left: ___('Lewe'),
			right: ___('Prawe'),
		};

		// config
		this.config = {
			status: false,
			group: null,
			system: null,
			type: null,
			variant: null,
			space: null,
			color: null,
			side: 'back',
			directionVertical: 'in',
			directionHorizontal: 'left',
			suggestedHeight: null,
		};

		// objects
		this.objects = {
			sketchLine: null,
			sketchCircle: null,
			ghost: null,
			fixed: null,
			moving1: null,
			moving2: null,
			thread: null,
			hinge1: null,
			hinge2: null,
			handle1: null,
			handle2: null,
			lamp: null,
		};

		// settings
		this.wall = wall;

		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.material = this.setMaterial();
		this.data = this.calcData();

		this.rotation = 0;

		this.lock = {
			handle1: null,
			handle2: null,
			lamp: null,
		};

		this.do();

		this.animations();
	}

	getColor = () => {
		if (this.config.group) {
			const product = `${this.wall.config.kind}s`;

			return Colors.hex(this.instance.config[product][this.config.group].systems[this.config.system].colors[this.config.color].color);
		}

		return false;
	}

	setStatus = () => !!((this.wall.config.kind === 'wicket' || this.wall.config.kind === 'gate') && this.wall.status && !this.wall.error && this.wall.width <= 1000)

	calcPosition = () => ({
		x: this.wall.position.normal.x,
		y: this.wall.position.normal.y,
		z: this.wall.position.normal.z,
	})

	setMaterial = () => {
		if (this.config.group && this.config.system && this.config.variant) {
			const product = `${this.wall.config.kind}s`;

			if (this.config.type) {
				const pattern = this.instance.config[product][this.config.group].systems[this.config.system].types[this.config.type].pattern;
				const variant = this.instance.config[product][this.config.group].systems[this.config.system].types[this.config.type].variants[this.config.variant];

				return Objects.merge(pattern, variant);
			}

			const pattern = this.instance.config[product][this.config.group].systems[this.config.system].pattern;
			const variant = this.instance.config[product][this.config.group].systems[this.config.system].variants[this.config.variant];

			return Objects.merge(pattern, variant);
		}

		return null;
	}

	calcData = () => {
		let outRotation;
		let direction;

		let params = {};
		let maxHeight = 0;
		let width = 0;
		let height = 0;
		let rotation = 0;

		let pole;
		let thread;
		let span1;
		let span2;
		let hinge1;
		let hinge2;
		let handle1;
		let handle2;
		let additional = { rotation: 0 };
		let lamp;

		let diff;

		if (this.status && this.material) {
			switch (this.wall.config.kind) {
				case 'wicket':
					// direction
					if (this.config.directionVertical === 'in') {
						outRotation = 1;

						if (this.config.directionHorizontal === 'left') {
							direction = 1;
						}

						if (this.config.directionHorizontal === 'right') {
							direction = -1;
						}
					}

					if (this.config.directionVertical === 'out') {
						outRotation = -1;

						if (this.config.directionHorizontal === 'left') {
							direction = -1;
						}

						if (this.config.directionHorizontal === 'right') {
							direction = 1;
						}
					}

					maxHeight = this.getMaxHeight(this.minSpace);

					if (this.wall.width >= this.material.size.minWidth && this.wall.width <= this.material.size.maxWidth) {
						width = this.wall.width;
					}

					if (this.wall.width > this.material.size.maxWidth) {
						width = this.material.size.maxWidth;
					}

					if (maxHeight && width) {
						params.args = { direction: (direction > 0) ? 'right' : 'left', width, height: maxHeight - Helper.aN(this.instance.getSystem().adds.wickets?.space.top), custom: { space: parseFloat(this.config.space) } };
						params.data = WicketKit.data(params.args, this.material);
						height = params.data.height;

						if (height) {
							const bottomSpace = this.getSpaceToTop(height, Helper.aN(this.instance.getSystem().adds.wickets?.space.top));

							const leftLimit = maxHeight > Maths.round(this.wall.pole1.calcFullHeight(1));
							const rightLimit = maxHeight > Maths.round(this.wall.pole2.calcFullHeight(2));

							const handleSpace = (direction > 0 && leftLimit) || (direction < 0 && rightLimit);
							const hingeSpace = (direction < 0 && leftLimit) || (direction > 0 && rightLimit);

							const handlePosition = bottomSpace + height * 0.65;
							const handleBase = this.material.frame?.left || { size: 0.08, depth: 0 };

							// rotation
							rotation = (this.rotation / 180 * Math.PI) * direction * outRotation * -1;

							// pole
							pole = {
								width: this.material.poles.width,
								depth: this.material.poles.depth,
								height: height + bottomSpace,
								left: leftLimit,
								right: rightLimit,
							};

							// thread
							diff = Maths.rotatePoint({
								x: (width / 2 - (handleSpace ? pole.width : 0) - this.material.thread.width / 2) * direction,
								y: 0,
								z: 0,
							}, this.wall.rotation.normal);

							thread = {
								width: this.material.thread.width,
								height: (this.material.thread.height) ? this.material.thread.height : height,
								depth: this.material.thread.depth,
								position: {
									x: this.position.x - diff.x,
									y: this.position.y + (this.material.thread.height) ? handlePosition : height / 2 + bottomSpace,
									z: this.position.z - diff.z,
								},
							};

							// span1
							diff = Maths.rotatePoint({
								x: (width / 2 - (hingeSpace ? pole.width : 0) - this.material.hinge.width / 2) * direction * -1,
								y: 0,
								z: 0,
							}, this.wall.rotation.normal);

							span1 = {
								width: width - (pole.width * (handleSpace + hingeSpace) + thread.width + this.material.hinge.width / 2),
								height,
								position: {
									x: this.position.x - diff.x,
									y: this.position.y + bottomSpace,
									z: this.position.z - diff.z,
								},
							};

							// hinge1
							hinge1 = {
								width: this.material.hinge.width,
								space: this.material.hinge.space,
								rotation: {
									rotation: this.wall.rotation.normal + rotation,
									model: (direction === 1) ? Math.PI : 0,
									fixed: -rotation,
								},
								position: {
									x: span1.position.x,
									y: this.position.y + bottomSpace,
									z: span1.position.z,
								},
							};

							// handle1
							diff = Maths.rotatePoint({
								x: (span1.width - handleBase.size / 2) * direction,
								y: 0,
								z: (handleBase.depth / 2) * outRotation,
							}, this.wall.rotation.normal + rotation);

							handle1 = {
								rotation: {
									rotation: this.wall.rotation.normal + rotation,
									model: (outRotation === -1) ? Math.PI : 0,
									hand: (direction * outRotation === 1) ? Math.PI : 0,
								},
								position: {
									x: span1.position.x - diff.x,
									y: this.position.y + handlePosition,
									z: span1.position.z - diff.z,
								},
							};

							// handle2
							diff = Maths.rotatePoint({
								x: (span1.width - handleBase.size / 2) * direction,
								y: 0,
								z: (handleBase.depth / 2) * outRotation * -1,
							}, this.wall.rotation.normal + rotation);

							handle2 = {
								rotation: {
									rotation: this.wall.rotation.normal + rotation,
									model: (outRotation === 1) ? Math.PI : 0,
									hand: (direction * outRotation === -1) ? Math.PI : 0,
								},
								position: {
									x: span1.position.x - diff.x,
									y: this.position.y + handlePosition,
									z: span1.position.z - diff.z,
								},
							};

							params.args.indent = {
								left: (direction > 0) ? width - span1.width : this.material.hinge.width / 2,
								right: (direction > 0) ? this.material.hinge.width / 2 : width - span1.width,
							};
						}
					}
					break;

				case 'gate':
					if (this.config.type === 'sliding') {
						// direction
						if (this.config.side === 'front') {
							outRotation = 1;
						}

						if (this.config.side === 'back') {
							outRotation = -1;
						}

						if (this.config.directionHorizontal === 'left') {
							direction = 1;
						}

						if (this.config.directionHorizontal === 'right') {
							direction = -1;
						}

						maxHeight = this.getMaxHeight(this.material.size.bottomSpace);

						if (this.wall.width >= this.material.size.minWidth && this.wall.width <= this.material.size.maxWidth) {
							width = this.wall.width;
						}

						if (this.wall.width > this.material.size.maxWidth) {
							width = this.material.size.maxWidth;
						}

						if (maxHeight && width) {
							params.args = { side: this.config.side, direction: this.config.directionHorizontal, width, height: maxHeight - Helper.aN(this.instance.getSystem().adds.gates?.space.top), custom: { space: parseFloat(this.config.space) } };
							params.data = GateSlidingKit.data(params.args, this.material);
							height = params.data.height;

							if (height) {
								// span1
								span1 = {
									position: {
										x: this.position.x,
										y: this.position.y + this.material.size.bottomSpace,
										z: this.position.z,
									},
								};

								// additional
								additional.rotation = (direction === -1) ? Math.PI : 0;
								additional.inside = Math.max.apply(null, [this.wall.pole1.getBlockDepth(), this.wall.pole2.getBlockDepth()]) / 2;

								// lamp
								if (this.material.lamp) {
									diff = Maths.rotatePoint({
										x: -width / 2 - this.material.support.pole.depth / 2,
										y: 0,
										z: (additional.inside + this.material.support.depth / 2) * direction,
									}, this.wall.rotation.normal + (direction === -1 ? Math.PI : 0));

									lamp = {
										light: 0,
										position: {
											x: this.position.x + diff.x,
											y: this.position.y + this.material.size.bottomSpace + height + this.material.support.space + this.material.support.top.height,
											z: this.position.z + diff.z,
										},
									};
								}
							}
						}
					}

					if (this.config.type === 'swing') {
						// direction
						if (this.config.directionVertical === 'in') {
							outRotation = 1;
						}

						if (this.config.directionVertical === 'out') {
							outRotation = -1;
						}

						maxHeight = this.getMaxHeight(this.minSpace);

						if (this.wall.width >= this.material.size.minWidth && this.wall.width <= this.material.size.maxWidth) {
							width = this.wall.width;
						}

						if (this.wall.width > this.material.size.maxWidth) {
							width = this.material.size.maxWidth;
						}

						if (maxHeight && width) {
							params.args = { width: width / 2 - this.material.thread.width / 2, height: maxHeight - Helper.aN(this.instance.getSystem().adds.gates?.space.top), custom: { space: parseFloat(this.config.space) } };
							params.data = WicketKit.data(params.args, this.material);
							height = params.data.height;

							if (height) {
								const bottomSpace = this.getSpaceToTop(height, Helper.aN(this.instance.getSystem().adds.gates?.space.top));

								const leftLimit = maxHeight > Maths.round(this.wall.pole1.calcFullHeight(1));
								const rightLimit = maxHeight > Maths.round(this.wall.pole2.calcFullHeight(2));

								const handlePosition = bottomSpace + height * 0.65;
								const handleBase = this.material.frame?.left || { size: 0.08, depth: 0 };

								// rotation
								rotation = (this.rotation / 180 * Math.PI) * outRotation;

								// pole
								pole = {
									width: this.material.poles.width,
									depth: this.material.poles.depth,
									height: height + bottomSpace,
									left: leftLimit,
									right: rightLimit,
								};

								// thread
								thread = {
									width: this.material.thread.width,
									height: this.material.thread.height,
									depth: this.material.thread.depth,
									position: {
										x: this.position.x,
										y: this.position.y + handlePosition,
										z: this.position.z,
									},
								};

								// span1
								diff = Maths.rotatePoint({
									x: (-width / 2 + (leftLimit ? pole.width : 0) + this.material.hinge.width / 2) * -1,
									y: 0,
									z: 0,
								}, this.wall.rotation.normal);

								span1 = {
									width: (width - (leftLimit ? pole.width : 0) - (rightLimit ? pole.width : 0) - thread.width - this.material.hinge.width) / 2,
									height,
									position: {
										x: this.position.x - diff.x,
										y: this.position.y + bottomSpace,
										z: this.position.z - diff.z,
									},
								};

								// span2
								diff = Maths.rotatePoint({
									x: (-width / 2 + (rightLimit ? pole.width : 0) + this.material.hinge.width / 2) * 1,
									y: 0,
									z: 0,
								}, this.wall.rotation.normal);

								span2 = {
									width: (width - (leftLimit ? pole.width : 0) - (rightLimit ? pole.width : 0) - thread.width - this.material.hinge.width) / 2,
									height,
									position: {
										x: this.position.x - diff.x,
										y: this.position.y + bottomSpace,
										z: this.position.z - diff.z,
									},
								};

								// hinge1
								hinge1 = {
									width: this.material.hinge.width,
									space: this.material.hinge.space,
									rotation: {
										rotation: this.wall.rotation.normal + rotation,
										model: 0,
										fixed: -rotation,
									},
									position: {
										x: span1.position.x,
										y: this.position.y + bottomSpace,
										z: span1.position.z,
									},
								};

								// hinge2
								hinge2 = {
									width: this.material.hinge.width,
									space: this.material.hinge.space,
									rotation: {
										rotation: this.wall.rotation.normal - rotation,
										model: Math.PI,
										fixed: rotation,
									},
									position: {
										x: span2.position.x,
										y: this.position.y + bottomSpace,
										z: span2.position.z,
									},
								};

								// handle1
								diff = Maths.rotatePoint({
									x: span2.width - handleBase.size / 2,
									y: 0,
									z: handleBase.depth / 2,
								}, this.wall.rotation.normal - rotation);

								handle1 = {
									rotation: {
										rotation: this.wall.rotation.normal - rotation,
										model: 0,
										hand: Math.PI,
									},
									position: {
										x: span2.position.x - diff.x,
										y: this.position.y + handlePosition,
										z: span2.position.z - diff.z,
									},
								};

								// handle2
								diff = Maths.rotatePoint({
									x: span2.width - handleBase.size / 2,
									y: 0,
									z: -handleBase.depth / 2,
								}, this.wall.rotation.normal - rotation);

								handle2 = {
									rotation: {
										rotation: this.wall.rotation.normal - rotation,
										model: Math.PI,
										hand: 0,
									},
									position: {
										x: span2.position.x - diff.x,
										y: this.position.y + handlePosition,
										z: span2.position.z - diff.z,
									},
								};

								params.args.indent = {
									left: this.material.hinge.width / 2,
									right: this.material.hinge.width / 2,
								};
							}
						}
					}
					break;

				default:
			}
		}

		return {
			outRotation,
			direction,

			params,
			maxHeight,
			width,
			height,
			rotation,

			pole,
			thread,
			span1,
			span2,
			hinge1,
			hinge2,
			handle1,
			handle2,
			additional,
			lamp,
		};
	}

	do = () => {
		if (this.instance.isLoading) return;

		this.doSketchLine();
		this.doSketchCircle();

		if (!this.instance.isMoving) {
			this.doGhost();
			this.doFixed();
			this.doMoving1();
			this.doMoving2();
			this.doThread();
			this.doHinge1();
			this.doHinge2();
			this.doHandle1();
			this.doHandle2();
			// this.doLamp();
		}
	}

	update = () => {
		this.status = this.setStatus();
		this.position = this.calcPosition();

		this.material = this.setMaterial();
		this.data = this.calcData();

		this.do();
	}

	reload = () => {
		this.material = this.setMaterial();
		this.data = this.calcData();

		this.do();

		this.fencingsUpdate();
	}

	reset = () => {
		this.config = {
			status: false,
			group: null,
			type: null,
			variant: null,
			color: null,
			side: 'back',
			directionVertical: 'in',
			directionHorizontal: 'left',
		};
	}

	remove = () => {
		this.three.scenes['2d'].remove(this.objects.sketchLine);
		this.three.scenes['2d'].remove(this.objects.sketchCircle);
		this.three.scenes['3d'].remove(this.objects.ghost);
		this.three.scenes['3d'].remove(this.objects.fixed);
		this.three.scenes['3d'].remove(this.objects.moving1);
		this.three.scenes['3d'].remove(this.objects.moving2);
		this.three.scenes['3d'].remove(this.objects.thread);
		this.three.scenes['3d'].remove(this.objects.hinge1);
		this.three.scenes['3d'].remove(this.objects.hinge2);
		this.three.scenes['3d'].remove(this.objects.handle1);
		this.three.scenes['3d'].remove(this.objects.handle2);
		this.three.scenes['3d'].remove(this.objects.lamp);
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set(this.wall.config.kind, this.config, this);
		this.instance.setHighlight(this.wall);
	}


	/* --- FUNCTIONS ------------------------------------------ */

	getMaxHeight = (bottomSpace = 0) => {
		let height;

		if (parseFloat(this.config.suggestedHeight)) {
			height = this.config.suggestedHeight;
		} else {
			height = Math.max.apply(null, [this.wall.pole1.calcFullHeight(1), this.wall.pole2.calcFullHeight(2)]) - bottomSpace;
		}

		if (height < this.material.size.minHeight) {
			height = this.material.size.minHeight;
		}

		if (height > this.material.size.maxHeight) {
			height = this.material.size.maxHeight;
		}

		return Maths.round(height);
	}

	getSpaceToTop = (height, top = 0) => {
		const maxHeight = this.getMaxHeight(0);
		const space = maxHeight - height;

		return ((this.minSpace === false || space >= this.minSpace) && (this.maxSpace === false || space <= this.maxSpace)) ? space - top : this.minSpace;
	}

	fencingsUpdate = () => {
		if (this.wall.pole1 && this.wall.pole1.wall.fencing) {
			this.wall.pole1.wall.fencing.reload();
		}

		if (this.wall.pole2.next && this.wall.pole2.next.wall.fencing) {
			this.wall.pole2.next.wall.fencing.reload();
		}
	}


	/* --- ANIMATIONS ----------------------------------------- */

	animations = () => {
		this.animation = this.three.animations.cycle(`manufacture-${this.wall.pole2.id}`, (e) => {
			switch (this.wall.config.kind) {
				case 'wicket':
					if (!e.data.revert) {
						this.rotation = 90 * e.state;
					} else {
						this.rotation = 90 * (1 - e.state);
					}
					break;

				case 'gate':
					if (this.config.type === 'swing') {
						if (!e.data.revert) {
							this.rotation = 90 * e.state;
						} else {
							this.rotation = 90 * (1 - e.state);
						}

						this.ledblock(e);
					}
					break;

				default:
			}

			this.data = this.calcData();

			switch (this.wall.config.kind) {
				case 'gate':
					if (this.config.type === 'sliding') {
						const max = this.data.width - 0.02;

						if (!e.data.revert) {
							this.data.params.args.open = max * e.state;
						} else {
							this.data.params.args.open = max * (1 - e.state);
						}

						if (this.material.lamp) {
							this.data.lamp.light = (e.state > 0 && e.state < 1 && e.time.current % 1000 < 500) ? -3 : 0;
						}

						this.ledblock(e);
					}
					break;

				default:
			}

			this.doMoving1();
			this.doMoving2();
			this.doHinge1();
			this.doHinge2();
			this.doHandle1();
			this.doHandle2();
			// this.doLamp();
		});
	}

	ledblock = (e) => {
		const flash = !(Math.floor(e.time.current / 1000) % 2 || e.state === 1);

		if (this.wall.pole1.additionals.ledblock.status && this.wall.pole1.additionals.ledblock.material.blink) {
			this.wall.pole1.additionals.ledblock.objects.model.traverse((o) => {
				if (o instanceof THREE.Mesh) {
					if (o.name === 'Light' && o.material.name === 'Light') {
						if (!flash) {
							o.material.color = new THREE.Color(0xe0e0e0);
							o.material.emissive = new THREE.Color(0xffffff);
						} else {
							o.material.color = new THREE.Color(0xf8b477);
							o.material.emissive = new THREE.Color(0xff983d);
						}

						if (flash || this.wall.pole1.additionals.ledblock.material.light) {
							o.material.emissiveIntensity = this.instance.extensions.dayNight.status !== 'night' ? 0.25 : 1.00;
						} else {
							o.material.emissiveIntensity = 0;
						}
					}
				}
			});
		}

		if (this.wall.pole2.additionals.ledblock.status && this.wall.pole2.additionals.ledblock.material.blink) {
			this.wall.pole2.additionals.ledblock.objects.model.traverse((o) => {
				if (o instanceof THREE.Mesh) {
					if (o.name === 'Light' && o.material.name === 'Light') {
						if (!flash) {
							o.material.color = new THREE.Color(0xe0e0e0);
							o.material.emissive = new THREE.Color(0xffffff);
						} else {
							o.material.color = new THREE.Color(0xf8b477);
							o.material.emissive = new THREE.Color(0xff983d);
						}
					}
				}
			});
		}
	}
}


export default Manufacture;