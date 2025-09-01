import * as panelActions from '../../../redux/panel/actions';

import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';
import { ___ } from 'classes/Translation';

import DimensionActions from './DimensionActions';
import DimensionMesh from './DimensionMesh';


class Dimension extends DimensionMesh {
	constructor(instance, id, boundary, pole1, pole2, type = 'default', position = 'bottom', align = 'center', color = null) {
		super();

		this.instance = instance;
		this.three = instance.three;
		this.actions = new DimensionActions(instance, this);

		this.typesList = {
			default: ___('Na krawędzi'),
			adapt: ___('Przy elementach'),
		};

		this.positionsList = {
			top: ___('Góra'),
			left: ___('Lewa'),
			right: ___('Prawa'),
			bottom: ___('Dół'),
			change: ___('Zmień'),
		};

		this.alignsList = {
			left: ___('Do lewej'),
			center: ___('Do środka'),
			right: ___('Do prawej'),
		};

		// config
		this.config = {
			type,
			position,
			align,
			color: color || this.instance.colors.dimensionCustom,
		};

		// objects
		this.objects = {
			helper1: null,
			helper2: null,
			shape: null,
			description: null,
		};

		// settings
		this.id = id;
		this.boundary = boundary;
		this.pole1 = (pole1) ? pole1.id : null;
		this.pole2 = (pole2) ? pole2.id : null;

		this.order = 0;
		this.data = this.calcData();
		this.status = this.setStatus();
		this.width = this.calcWidth();
		this.rotation = this.calcRotation();
		this.position = this.calcPosition();
		this.align = this.calcAlign();

		this.do();
	}

	getPositionsList = () => {
		let output = [];

		Objects.entries(this.positionsList).forEach(([key, entry]) => {
			switch (this.config.type) {
				case 'default':
					if (key === 'change') return;

					switch (this.config.position) {
						case 'left':
						case 'right':
							if (key === 'top' || key === 'bottom') return;
							break;

						case 'top':
						case 'bottom':
							if (key === 'left' || key === 'right') return;
							break;

						default:
					}
					break;

				case 'adapt':
					if (key !== 'change') return;
					break;

				default:
			}

			output[key] = entry;
		});

		return output;
	}

	calcData = () => {
		let limits = [];

		let left = { x: Infinity, z: null };
		let right = { x: -Infinity, z: null };
		let top = { x: null, z: Infinity };
		let bottom = { x: null, z: -Infinity };

		if (this.boundary) {
			limits = this.instance.extensions.dimensions.bounds;
		} else {
			let type = (this.config.type === 'adapt') ? 'adapt' : 'corner';
			let sibling;

			if (this.instance.poles[this.pole1]) {
				sibling = (this.instance.poles[this.pole2] && this.instance.poles[this.pole2].blockMaterial.block.type === 'corner') ? this.instance.poles[this.pole2].points.pointVertex : false;
				limits = limits.concat(this.instance.poles[this.pole1].getLimits(type, sibling));
			}

			if (this.instance.poles[this.pole2]) {
				sibling = (this.instance.poles[this.pole1] && this.instance.poles[this.pole1].blockMaterial.block.type === 'corner') ? this.instance.poles[this.pole1].points.pointVertex : false;
				limits = limits.concat(this.instance.poles[this.pole2].getLimits(type, sibling));
			}
		}

		Objects.values(limits).forEach((point) => {
			if (point.x <= left.x) {
				switch (this.config.position) {
					case 'left':
					case 'right':
						left = { x: point.x, z: point.z };
						break;

					case 'top':
						if (point.x < left.x || left.z === null || point.z <= left.z) {
							left = { x: point.x, z: point.z };
						}
						break;

					case 'bottom':
						if (point.x < left.x || left.z === null || point.z >= left.z) {
							left = { x: point.x, z: point.z };
						}
						break;

					default:
				}
			}

			if (point.x >= right.x) {
				switch (this.config.position) {
					case 'left':
					case 'right':
						right = { x: point.x, z: point.z };
						break;

					case 'top':
						if (point.x > right.x || right.z === null || point.z <= right.z) {
							right = { x: point.x, z: point.z };
						}
						break;

					case 'bottom':
						if (point.x > right.x || right.z === null || point.z >= right.z) {
							right = { x: point.x, z: point.z };
						}
						break;

					default:
				}
			}

			if (point.z <= top.z) {
				switch (this.config.position) {
					case 'left':
						if (point.z < top.z || top.x === null || point.x <= top.x) {
							top = { x: point.x, z: point.z };
						}
						break;

					case 'right':
						if (point.z < top.z || top.x === null || point.x >= top.x) {
							top = { x: point.x, z: point.z };
						}
						break;

					case 'top':
					case 'bottom':
						top = { x: point.x, z: point.z };
						break;

					default:
				}
			}

			if (point.z >= bottom.z) {
				switch (this.config.position) {
					case 'left':
						if (point.z > bottom.z || bottom.x === null || point.x <= bottom.x) {
							bottom = { x: point.x, z: point.z };
						}
						break;

					case 'right':
						if (point.z > bottom.z || bottom.x === null || point.x >= bottom.x) {
							bottom = { x: point.x, z: point.z };
						}
						break;

					case 'top':
					case 'bottom':
						bottom = { x: point.x, z: point.z };
						break;

					default:
				}
			}
		});

		let status = false;
		let center = 0;
		let value = 0;

		let start = false;
		let end = false;

		switch (this.config.type) {
			case 'default':
				switch (this.config.position) {
					case 'left':
					case 'right':
						if (top.z < Infinity && bottom.z > -Infinity) {
							status = true;
							center = (top.z + bottom.z) / 2;
							value = Maths.getDistance({ x: 0, y: top.z }, { x: 0, y: bottom.z });

							start = top;
							end = bottom;
						}
						break;

					case 'top':
					case 'bottom':
						if (left.x < Infinity && right.x > -Infinity) {
							status = true;
							center = (left.x + right.x) / 2;
							value = Maths.getDistance({ x: left.x, y: 0 }, { x: right.x, y: 0 });

							start = left;
							end = right;
						}
						break;

					default:
				}
				break;

			case 'adapt':
				if (left.z < Infinity && right.z > -Infinity && top.z < Infinity && bottom.z > -Infinity) {
					if (left.x !== right.x || left.z !== right.z) {
						status = true;
						center = 0;
						value = Maths.getDistance({ x: left.x, y: left.z }, { x: right.x, y: right.z });

						start = { x: left.x, y: 0, z: left.z };
						end = { x: right.x, y: 0, z: right.z };
					} else {
						status = true;
						center = 0;
						value = Maths.getDistance({ x: top.x, y: top.z }, { x: bottom.x, y: bottom.z });

						start = { x: top.x, y: 0, z: top.z };
						end = { x: bottom.x, y: 0, z: bottom.z };
					}
				}
				break;

			default:
		}

		return {
			status,
			center,
			value,

			start,
			end,
		};
	}

	setStatus = () => this.data.status

	calcWidth = () => this.data.value

	calcRotation = () => {
		switch (this.config.type) {
			case 'default':
				switch (this.config.position) {
					case 'left':
					case 'right':
						return Math.PI / 2;

					case 'top':
					case 'bottom':
						return 0;

					default:
				}
				break;

			case 'adapt':
				return Maths.getRotation({ x: this.data.start.x, y: this.data.start.z }, { x: this.data.end.x, y: this.data.end.z });

			default:
		}

		return 0;
	}

	calcPosition = () => {
		let position;

		switch (this.config.type) {
			case 'default':
				position = this.instance.params.dimension.distance.main + ((this.boundary) ? this.instance.params.dimension.distance.between : 0);

				switch (this.config.position) {
					case 'left':
						if (this.instance.extensions.dimensions.boundary.left) {
							return { x: this.instance.extensions.dimensions.boundary.left.x - position, y: 0, z: this.data.center };
						}
						break;

					case 'right':
						if (this.instance.extensions.dimensions.boundary.right) {
							return { x: this.instance.extensions.dimensions.boundary.right.x + position, y: 0, z: this.data.center };
						}
						break;

					case 'top':
						if (this.instance.extensions.dimensions.boundary.top) {
							return { x: this.data.center, y: 0, z: this.instance.extensions.dimensions.boundary.top.z - position };
						}
						break;

					case 'bottom':
						if (this.instance.extensions.dimensions.boundary.bottom) {
							return { x: this.data.center, y: 0, z: this.instance.extensions.dimensions.boundary.bottom.z + position };
						}
						break;

					default:
				}
				break;

			case 'adapt':
				let d = this.instance.params.dimension.distance.adapt;

				switch (this.config.position) {
					case 'right':
					case 'bottom':
						d = -d;
						break;

					default:
				}

				let center = Maths.getCenter({ x: this.data.start.x, y: 0, z: this.data.start.z }, { x: this.data.end.x, y: 0, z: this.data.end.z });
				let move = Maths.rotatePoint({ x: 0, y: 0, z: d }, this.rotation);

				return { x: center.x + move.x, y: 0, z: center.z + move.z };

			default:
		}

		return { x: 0, y: 0, z: 0 };
	}

	calcAlign = () => {
		let diff = 0;

		switch (this.config.align) {
			case 'left':
				diff = -this.width / 2;
				break;

			case 'right':
				diff = this.width / 2;
				break;

			default:
		}

		if (diff) {
			return Maths.rotatePoint({ x: diff, z: 0 }, this.rotation);
		}

		return { x: 0, z: 0 };
	}

	do = () => {
		this.doHelper1();
		this.doHelper2();
		this.doShape();
		this.doDescription();
	}

	update = () => {
		this.data = this.calcData();
		this.status = this.setStatus();
		this.width = this.calcWidth();
		this.rotation = this.calcRotation();
		this.position = this.calcPosition();
		this.align = this.calcAlign();

		this.do();
	}

	remove = () => {
		this.objects.description.drag.dispose();

		this.three.scenes['2d'].remove(this.objects.helper1);
		this.three.scenes['2d'].remove(this.objects.helper2);
		this.three.scenes['2d'].remove(this.objects.shape);
		this.three.scenes['2d'].remove(this.objects.description);
	}


	/* --- METHODS -------------------------------------------- */

	displayOptions = () => {
		panelActions.set('dimension', this.config, this);
	}

	setOrder = (order) => {
		this.order = order;
	}

	setType = (type) => {
		this.config.type = type;

		this.instance.extensions.dimensions.update(false);
	}

	setPosition = (position) => {
		if (position === 'change') {
			switch (this.config.position) {
				case 'left':
					this.config.position = 'right';
					break;

				case 'right':
					this.config.position = 'left';
					break;

				case 'top':
					this.config.position = 'bottom';
					break;

				case 'bottom':
					this.config.position = 'top';
					break;

				default:
			}
		} else {
			this.config.position = position;
		}

		this.instance.extensions.dimensions.update(false);
	}

	setAlign = (align) => {
		this.config.align = align;

		this.instance.extensions.dimensions.update(false);
	}
}


export default Dimension;