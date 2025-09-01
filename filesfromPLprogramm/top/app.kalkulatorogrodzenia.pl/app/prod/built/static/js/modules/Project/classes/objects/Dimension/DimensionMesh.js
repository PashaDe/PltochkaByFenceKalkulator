import * as THREE from 'three';
import DragControls from 'three-dragcontrols';
import TextSprite from 'three-textsprite';

import Helper from 'classes/Tools/Helper';

import DimensionGeometry from '../../geometry/DimensionGeometry';
import LineGeometry from '../../geometry/LineGeometry';
import TextGeometry from '../../geometry/TextGeometry';


class Dimension {
	/* --- MESH ----------------------------------------------- */

	doHelper1 = () => {
		let target;

		switch (this.config.position) {
			case 'left':
			case 'right':
				target = { x: this.position.x, z: this.data.start.z };
				break;

			case 'top':
			case 'bottom':
				target = { x: this.data.start.x, z: this.position.z };
				break;

			default:
		}

		let material = new THREE.LineDashedMaterial({
			color: this.config.color,
			dashSize: 0.05,
			gapSize: 0.15,
		});

		let geometry = new LineGeometry(this.data.start, target);

		if (!this.objects.helper1) {
			this.objects.helper1 = new THREE.Line(geometry, material);
			this.three.scenes['2d'].add(this.objects.helper1);
		} else {
			this.objects.helper1.geometry = geometry;
			this.objects.helper1.material = material;
		}

		this.objects.helper1.computeLineDistances();

		this.objects.helper1.position.set(this.data.start.x, this.instance.dpsi(3, 0), this.data.start.z);
		this.objects.helper1.visible = !!((this.status && this.config.type === 'default'));
	}

	doHelper2 = () => {
		let target;

		switch (this.config.position) {
			case 'left':
			case 'right':
				target = { x: this.position.x, z: this.data.end.z };
				break;

			case 'top':
			case 'bottom':
				target = { x: this.data.end.x, z: this.position.z };
				break;

			default:
		}

		let material = new THREE.LineDashedMaterial({
			color: this.config.color,
			dashSize: 0.05,
			gapSize: 0.15,
		});

		let geometry = new LineGeometry(this.data.end, target);

		if (!this.objects.helper2) {
			this.objects.helper2 = new THREE.Line(geometry, material);
			this.three.scenes['2d'].add(this.objects.helper2);
		} else {
			this.objects.helper2.geometry = geometry;
			this.objects.helper2.material = material;
		}

		this.objects.helper2.computeLineDistances();

		this.objects.helper2.position.set(this.data.end.x, this.instance.dpsi(3, 0), this.data.end.z);
		this.objects.helper2.visible = !!((this.status && this.config.type === 'default'));
	}

	doShape = () => {
		let material = [
			new THREE.MeshBasicMaterial({ color: this.config.color }),
		];

		let geometry = new DimensionGeometry(this.width, this.instance.params.dimension.depth, this.instance.params.dimension.arrows);

		if (!this.objects.shape) {
			this.objects.shape = new THREE.Mesh(geometry, material);
			this.three.scenes['2d'].add(this.objects.shape);
		} else {
			this.objects.shape.geometry = geometry;
			this.objects.shape.material = material;
		}

		this.objects.shape.position.set(this.position.x, this.instance.dpsi(3, 1), this.position.z);
		this.objects.shape.rotation.y = this.rotation;
		this.objects.shape.visible = this.status;
	}

	doDescription = () => {
		let r = 0.02;

		switch (this.config.type) {
			case 'default':
				switch (this.config.position) {
					case 'top':
						r = -this.instance.params.dimension.arrows * 1.5;
						break;

					case 'bottom':
						r = this.instance.params.dimension.arrows * 1.5;
						break;

					default:
				}
				break;

			default:
		}

		// this.doDescriptionShape(r);
		this.doDescriptionTextSprite(r);
	}

	doDescriptionShape = (r) => {
		let geometry = new TextGeometry(this.instance.fonts.bold, `${Helper.numberFormat(this.width, 2)} m`);

		if (!this.objects.description) {
			let material = new THREE.MeshBasicMaterial({ color: 0x000000 });

			this.objects.description = new THREE.Mesh(geometry, material);
			this.objects.description.rotation.x = -Math.PI / 2;
			this.three.scenes['2d'].add(this.objects.description);

			this.eventsDescription(this.objects.description);
		} else {
			this.objects.description.geometry = geometry;
		}

		this.objects.description.position.set(this.position.x + this.align.x, this.instance.dpsi(3, 2), this.position.z + this.align.z + r);
		this.objects.description.visible = this.status;
	}

	doDescriptionTextSprite = (r) => {
		if (!this.objects.description) {
			this.objects.description = new TextSprite({
				fontWeight: this.instance.font.weight,
				fontSize: this.instance.font.size,
				fontFamily: this.instance.font.family,
				fillStyle: this.instance.font.color,
			});
			this.three.scenes['2d'].add(this.objects.description);

			this.eventsDescription(this.objects.description);
		}

		this.objects.description.material.map.text = `${Helper.numberFormat(this.width, 2)} m`;

		this.objects.description.position.set(this.position.x + this.align.x, this.instance.dpsi(3, 2), this.position.z + this.align.z + r);
		this.objects.description.visible = this.status;
	}


	/* --- EVENTS --------------------------------------------- */

	eventsDescription = (o) => {
		o.drag = new DragControls([o], { moveable: false }, this.three.cameras['2d'], this.three.render.domElement);

		['click', 'touchend'].forEach((event) => o.drag.addEventListener(event, () => {
			this.displayOptions();
		}));
	}
}


export default Dimension;