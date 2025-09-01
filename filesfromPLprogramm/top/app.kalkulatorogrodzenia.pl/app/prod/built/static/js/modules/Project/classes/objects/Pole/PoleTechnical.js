import * as THREE from 'three';
import TextSprite from 'three-textsprite';

import Helper from 'classes/Tools/Helper';
import Maths from 'classes/Tools/Maths';

import DimensionTechnicalGeometry from '../../geometry/DimensionTechnicalGeometry';


class PoleTechnical {
	constructor(instance, target) {
		this.instance = instance;
		this.three = instance.threeHelper;

		this.start = -0.50;

		// objects
		this.objects = {
			pole: null,
			peak: null,
			dimension: {
				width: {
					shape: null,
					description: null,
				},
				height: {
					shape: null,
					description: null,
				},
			},
		};

		// settings
		this.target = target;

		this.status = 0;
		this.data = this.setData();

		this.do();
	}

	setStatus = () => {
		if (this.instance.technical.rotation.value !== false) {
			if (!this.target.config.virtual) {
				switch (this.target.blockMaterial.block.type) {
					case 'cuboid':
						if (this.instance.isTolerance(this.target.rotation, this.instance.technical.rotation.value, this.instance.technical.rotation.tolerance)) {
							if (this.instance.isTolerance(Maths.pointsInLine({ x: this.target.position.x, y: this.target.position.z }, { x: this.instance.technical.position.value.x, y: this.instance.technical.position.value.z }, { x: this.instance.technical.position.value.rx, y: this.instance.technical.position.value.rz }, true), 0, this.instance.technical.position.tolerance)) {
								return 1;
							}
						}
						break;

					case 'corner':
						if (this.instance.isTolerance(this.target.rotation, this.instance.technical.rotation.value, this.instance.technical.rotation.tolerance)) {
							if (this.instance.isTolerance(Maths.pointsInLine({ x: this.target.position.x, y: this.target.position.z }, { x: this.instance.technical.position.value.x, y: this.instance.technical.position.value.z }, { x: this.instance.technical.position.value.rx, y: this.instance.technical.position.value.rz }, true), 0, this.instance.technical.position.tolerance)) {
								return 1;
							}
						}

						if (this.instance.isTolerance(this.target.rotation - Maths.degreesToRotation(this.target.calcAngle()), this.instance.technical.rotation.value, this.instance.technical.rotation.tolerance)) {
							if (this.instance.isTolerance(Maths.pointsInLine({ x: this.target.position.x, y: this.target.position.z }, { x: this.instance.technical.position.value.x, y: this.instance.technical.position.value.z }, { x: this.instance.technical.position.value.rx, y: this.instance.technical.position.value.rz }, true), 0, this.instance.technical.position.tolerance)) {
								return 2;
							}
						}
						break;

					default:
				}
			}
		}

		return 0;
	}

	setData = () => {
		let width = this.target.width;
		let height = this.target.height + this.target.seating + this.target.peakMaterial.height + Helper.aN(this.target.peakMaterial.tip?.height);
		let rotation = this.target.rotation;
		let position = { x: this.target.position.x, y: 0, z: this.target.position.z };
		let center = { x: 0, y: 0, z: 0 };

		let x = 0;

		switch (this.target.blockMaterial.block.type) {
			case 'corner':
				if (this.status === 1) {
					x -= this.target.width / 2 + this.target.points.r.x;
				}

				if (this.status === 2) {
					width = this.target.depth;
					rotation -= Maths.degreesToRotation(this.target.calcAngle());

					x += this.target.depth / 2 + this.target.points.r.x;
				}

				const diff = Maths.rotatePoint({ x, z: 0 }, rotation);

				position.x += diff.x;
				position.z += diff.z;
				break;

			default:
		}

		const diff = Maths.rotatePoint({ x: 0, z: -(this.target.getBlockDepth() + 1.00) }, rotation);

		center.x = position.x + diff.x;
		center.y = position.y + height / 2;
		center.z = position.z + diff.z;

		return {
			width,
			height,
			rotation,
			position,
			center,
		};
	}

	do = () => {
		if (this.instance.window && this.instance.window !== 'none') {
			this.doPole();
			this.doPeak();
			this.doDimensionWidthShape();
			this.doDimensionWidthDescription();
			this.doDimensionHeightShape();
			this.doDimensionHeightDescription();
		}
	}

	update = (status = false) => {
		if (status !== false) {
			this.status = (!this.target.config.virtual) ? status : 0;
		}

		this.data = this.setData();

		this.do();
	}

	remove = () => {
		this.three.scenes['2d'].remove(this.objects.pole);
		this.three.scenes['2d'].remove(this.objects.peak);
		this.three.scenes['2d'].remove(this.objects.dimension.width.shape);
		this.three.scenes['2d'].remove(this.objects.dimension.width.description);
		this.three.scenes['2d'].remove(this.objects.dimension.height.shape);
		this.three.scenes['2d'].remove(this.objects.dimension.height.description);
	}


	/* --- MESH ----------------------------------------------- */

	doPole = () => {
		let object;

		switch (this.target.blockMaterial.block.type) {
			case 'cuboid':
				object = this.target.doPoleTypeCuboid(this.status);
				break;

			case 'corner':
				object = this.target.doPoleTypeCorner(this.status);
				break;

			default:
		}

		if (object) {
			if (!this.objects.pole) {
				this.objects.pole = new THREE.Mesh(object.geometry, object.material);
				this.three.scenes['2d'].add(this.objects.pole);
			} else {
				this.objects.pole.geometry = object.geometry;
				this.objects.pole.material = object.material;
			}

			this.objects.pole.position.set(this.target.position.x, this.target.calcPolePositionY() + this.start, this.target.position.z);
			this.objects.pole.rotation.y = this.target.rotation;
			this.objects.pole.visible = !!this.status;
		}
	}

	doPeak = () => {
		let object;

		switch (this.target.blockMaterial.block.type) {
			case 'cuboid':
				object = this.target.doPeakTypeCuboid(this.status);
				break;

			case 'corner':
				object = this.target.doPeakTypeCorner(this.status);
				break;

			default:
		}

		if (object) {
			if (!this.objects.peak) {
				this.objects.peak = new THREE.Mesh(object.geometry, object.material);
				this.three.scenes['2d'].add(this.objects.peak);
			} else {
				this.objects.peak.geometry = object.geometry;
				this.objects.peak.material = object.material;
			}

			this.objects.peak.position.set(this.target.position.x, this.target.calcPeakPositionY() + this.start, this.target.position.z);
			this.objects.peak.rotation.y = this.target.rotation;
			this.objects.peak.visible = !!this.status;
		}
	}

	doDimensionWidthShape = () => {
		let material = [
			new THREE.MeshBasicMaterial({ color: this.instance.params.dimension.color }),
		];

		let geometry = new DimensionTechnicalGeometry(this.data.width, this.instance.params.dimension.depth, this.instance.params.dimension.arrows);

		if (!this.objects.dimension.width.shape) {
			this.objects.dimension.width.shape = new THREE.Mesh(geometry, material);
			this.three.scenes['2d'].add(this.objects.dimension.width.shape);
		} else {
			this.objects.dimension.width.shape.geometry = geometry;
			this.objects.dimension.width.shape.material = material;
		}

		this.objects.dimension.width.shape.position.set(this.data.position.x, this.data.position.y + this.start - this.instance.params.dimension.distance.technical, this.data.position.z);
		this.objects.dimension.width.shape.rotation.y = this.data.rotation;
		this.objects.dimension.width.shape.visible = !!this.status;
	}

	doDimensionWidthDescription = () => {
		if (!this.objects.dimension.width.description) {
			this.objects.dimension.width.description = new TextSprite({
				fontWeight: this.instance.font.weight,
				fontSize: 0.16,
				fontFamily: this.instance.font.family,
				fillStyle: this.instance.font.color,
			});
			this.three.scenes['2d'].add(this.objects.dimension.width.description);
		}

		this.objects.dimension.width.description.material.map.text = Helper.numberFormat(this.data.width, 2);

		this.objects.dimension.width.description.position.set(this.data.position.x, this.data.position.y + this.start - this.instance.params.dimension.distance.technical - this.instance.params.dimension.arrows * 2, this.data.position.z);
		this.objects.dimension.width.description.visible = !!this.status;
	}

	doDimensionHeightShape = () => {
		let material = [
			new THREE.MeshBasicMaterial({ color: this.instance.params.dimension.color }),
		];

		let geometry = new DimensionTechnicalGeometry(this.data.height, this.instance.params.dimension.depth, this.instance.params.dimension.arrows);

		if (!this.objects.dimension.height.shape) {
			this.objects.dimension.height.shape = new THREE.Mesh(geometry, material);
			this.three.scenes['2d'].add(this.objects.dimension.height.shape);
		} else {
			this.objects.dimension.height.shape.geometry = geometry;
			this.objects.dimension.height.shape.material = material;
		}

		this.objects.dimension.height.shape.position.set(this.data.center.x, this.data.center.y + this.start, this.data.center.z);
		this.objects.dimension.height.shape.rotation.y = this.data.rotation;
		this.objects.dimension.height.shape.rotation.z = Math.PI / 2;
		this.objects.dimension.height.shape.visible = !!this.status;
	}

	doDimensionHeightDescription = () => {
		if (!this.objects.dimension.height.description) {
			this.objects.dimension.height.description = new TextSprite({
				fontWeight: this.instance.font.weight,
				fontSize: 0.16,
				fontFamily: this.instance.font.family,
				fillStyle: '#ffffff',
				strokeColor: '#000000',
				strokeWidth: 0.20,
			});
			this.three.scenes['2d'].add(this.objects.dimension.height.description);
		}

		this.objects.dimension.height.description.material.map.text = Helper.numberFormat(this.data.height, 2);

		this.objects.dimension.height.description.position.set(this.data.center.x, this.data.center.y + this.start, this.data.center.z);
		this.objects.dimension.height.description.visible = !!this.status;
	}
}


export default PoleTechnical;