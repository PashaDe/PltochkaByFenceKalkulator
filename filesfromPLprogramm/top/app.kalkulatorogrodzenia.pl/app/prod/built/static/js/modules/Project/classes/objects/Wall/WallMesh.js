import * as THREE from 'three';
import DragControls from 'three-dragcontrols';
import TextSprite from 'three-textsprite';

import Helper from 'classes/Tools/Helper';
import Objects from 'classes/Tools/Objects';

import ParallelogramCutGeometry from '../../geometry/Wall/ParallelogramCutGeometry';
import PeakParallelogramGeometry from '../../geometry/Wall/PeakParallelogramGeometry';
import TextGeometry from '../../geometry/TextGeometry';


class Wall {
	/* --- MESH ----------------------------------------------- */

	doSketch = () => {
		let depth;
		let material;

		if (!this.error) {
			switch (this.config.kind) {
				case 'wall':
					depth = this.depth;

					material = [
						false,
						false,
						false,
						false,
						false,
						new THREE.MeshBasicMaterial({ color: this.sketchColor }),
					];
					break;

				case 'wicket':
				case 'gate':
					depth = 0.04;

					material = [
						false,
						false,
						false,
						false,
						false,
						new THREE.MeshBasicMaterial({ color: this.instance.colors.sketchManufacture }),
					];
					break;

				case 'space':
					depth = 0.02;

					material = [
						false,
						false,
						false,
						false,
						false,
						new THREE.MeshBasicMaterial({ color: this.instance.colors.sketchSpace }),
					];
					break;

				default:
			}
		} else {
			depth = 0.04;

			material = [
				false,
				false,
				false,
				false,
				false,
				new THREE.MeshBasicMaterial({ color: 0xff0000 }),
			];
		}

		let geometry = new ParallelogramCutGeometry(this.width + Math.abs(this.data.normal.indent1 * this.depth / 2) + Math.abs(this.data.normal.indent2 * this.depth / 2), 0.001, depth, this.data.normal.indent1 * this.depth, this.data.normal.indent2 * this.depth, 0, 0);

		if (!this.objects.sketch) {
			this.objects.sketch = new THREE.Mesh(geometry, material);
			this.three.scenes['2d'].add(this.objects.sketch);

			this.eventsSketch(this.objects.sketch);
		} else {
			this.objects.sketch.geometry = geometry;
			this.objects.sketch.material = material;
		}

		this.objects.sketch.position.set(this.position.normal.x, this.instance.dpsi(1, 0), this.position.normal.z);
		this.objects.sketch.rotation.y = this.rotation.normal;
		this.objects.sketch.visible = this.status;
	}

	doDescription = () => {
		// this.doDescriptionShape();
		this.doDescriptionTextSprite();
	}

	doDescriptionShape = () => {
		let geometry = new TextGeometry(this.instance.fonts.bold, `${Helper.numberFormat(this.descriptionWallWidth, 2)} m`);

		if (!this.objects.description) {
			let material = new THREE.MeshBasicMaterial({ color: 0x000000 });

			this.objects.description = new THREE.Mesh(geometry, material);
			this.objects.description.rotation.x = -Math.PI / 2;
			this.three.scenes['2d'].add(this.objects.description);

			this.eventsDescription(this.objects.description);
		} else {
			this.objects.description.geometry = geometry;
		}

		this.objects.description.position.set(this.position.normal.x, this.instance.dpsi(2), this.position.normal.z - 0.02);
		this.objects.description.visible = this.status;
	}

	doDescriptionTextSprite = () => {
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

		this.objects.description.material.map.text = `${Helper.numberFormat(this.descriptionWallWidth, 2)} m`;

		this.objects.description.position.set(this.position.normal.x, this.instance.dpsi(2), this.position.normal.z + 0.015);
		this.objects.description.visible = this.status;
	}

	doWall = () => {
		let schedule = 0;

		if (this.blockMaterial.block.schedule) {
			let end = (((this.offset + this.wallWidth) / this.blockMaterial.block.width / (this.blockMaterial.block.texture.width1.x / this.blockMaterial.block.width)) % 1) * this.blockMaterial.block.width * (this.blockMaterial.block.texture.width1.x / this.blockMaterial.block.width);

			schedule = 1;

			Objects.entries(this.blockMaterial.block.schedule).forEach(([i, point]) => {
				if (end >= point) {
					schedule = parseInt(i, 10) + 2;
				}
			});

			if (schedule > 4) schedule = 1;
		}

		this.schedule = schedule;

		Objects.keys(this.objects.wall).forEach((index) => {
			let object;

			if (
				(index === 'wall')
				|| (index === 'add1' && this.pole1 && this.pole1.blockMaterial.block.type === 'corner' && this.pole1.seating)
				|| (index === 'add2' && this.pole2 && this.pole2.blockMaterial.block.type === 'corner' && this.pole2.seating)
			) {
				object = this.doWallPart(index);
			}

			if (object) {
				if (!this.objects.wall[index]) {
					this.objects.wall[index] = new THREE.Mesh(object.geometry, object.material);
					this.objects.wall[index].castShadow = true;
					this.three.scenes['3d'].add(this.objects.wall[index]);

					this.eventsWall(this.objects.wall[index], index);
				} else {
					this.objects.wall[index].geometry = object.geometry;
					this.objects.wall[index].material = object.material;
				}

				this.objects.wall[index].position.set(this.position.full.x, this.position.full.y + this.data.elements[index].positionY, this.position.full.z);
				this.objects.wall[index].rotation.y = this.rotation.full;
				this.objects.wall[index].visible = (index === 'wall') ? this.config.kind === 'wall' && this.status && !this.error : true;
			} else if (this.objects.wall[index]) {
				this.objects.wall[index].visible = false;
			}
		});
	}

	doWallPart = (index) => {
		let height = this.data.elements[index].height;
		let offset = (index !== 'add2') ? this.offset : Math.ceil(this.width / this.blockMaterial.block.width) * this.blockMaterial.block.width - this.width;

		let textureWidth1 = this.getWallTextures().width1.clone();
		textureWidth1.needsUpdate = true;
		textureWidth1.wrapS = THREE.RepeatWrapping;
		textureWidth1.wrapT = THREE.RepeatWrapping;
		textureWidth1.repeat.set(this.wallWidth / this.blockMaterial.block.texture.width1.x, height / this.blockMaterial.block.texture.width1.y);
		textureWidth1.offset.x = offset / this.blockMaterial.block.texture.width1.x;
		textureWidth1.offset.y = (index === 'add1' || index === 'add2') ? this.data.elements[index].sizePositionY / (this.blockMaterial.block.texture.width1.y / this.blockMaterial.block.height) : 0;
		textureWidth1.anisotropy = this.instance.details.anisotropy;

		let textureWidth2;
		if (!this.blockMaterial.block.texture.width2) {
			textureWidth2 = textureWidth1;
		} else {
			textureWidth2 = this.getWallTextures().width2.clone();
			textureWidth2.needsUpdate = true;
			textureWidth2.wrapS = THREE.RepeatWrapping;
			textureWidth2.wrapT = THREE.RepeatWrapping;
			textureWidth2.repeat.set(this.wallWidth / this.blockMaterial.block.texture.width2.x, height / this.blockMaterial.block.texture.width2.y);
			textureWidth2.offset.x = offset / this.blockMaterial.block.texture.width2.x;
			textureWidth2.offset.y = (index === 'add1' || index === 'add2') ? this.data.elements[index].sizePositionY / (this.blockMaterial.block.texture.width2.y / this.blockMaterial.block.height) : 0;
			textureWidth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureDepth1 = this.getWallTextures().depth1.clone();
		textureDepth1.needsUpdate = true;
		textureDepth1.wrapS = THREE.RepeatWrapping;
		textureDepth1.wrapT = THREE.RepeatWrapping;
		textureDepth1.repeat.set(this.depth / this.blockMaterial.block.texture.depth1.x, height / this.blockMaterial.block.texture.depth1.y);
		textureDepth1.offset.y = (index === 'add1' || index === 'add2') ? this.data.elements[index].sizePositionY / (this.blockMaterial.block.texture.depth1.y / this.blockMaterial.block.height) : 0;
		textureDepth1.anisotropy = this.instance.details.anisotropy;

		let textureDepth2;
		if (!this.blockMaterial.block.texture.depth2) {
			textureDepth2 = textureDepth1;
		} else {
			textureDepth2 = this.getWallTextures().depth2.clone();
			textureDepth2.needsUpdate = true;
			textureDepth2.wrapS = THREE.RepeatWrapping;
			textureDepth2.wrapT = THREE.RepeatWrapping;
			textureDepth2.repeat.set(this.depth / this.blockMaterial.block.texture.depth2.x, height / this.blockMaterial.block.texture.depth2.y);
			textureDepth2.offset.y = (index === 'add1' || index === 'add2') ? this.data.elements[index].sizePositionY / (this.blockMaterial.block.texture.depth2.y / this.blockMaterial.block.height) : 0;
			textureDepth2.anisotropy = this.instance.details.anisotropy;
		}

		if (this.blockMaterial.block.texture.depth3 && this.schedule === 2) {
			textureDepth2 = this.getWallTextures().depth3.clone();
			textureDepth2.needsUpdate = true;
			textureDepth2.wrapS = THREE.RepeatWrapping;
			textureDepth2.wrapT = THREE.RepeatWrapping;
			textureDepth2.repeat.set(this.depth / this.blockMaterial.block.texture.depth3.x, height / this.blockMaterial.block.texture.depth3.y);
			textureDepth2.offset.y = (index === 'add1' || index === 'add2') ? this.data.elements[index].sizePositionY / (this.blockMaterial.block.texture.depth3.y / this.blockMaterial.block.height) : 0;
			textureDepth2.anisotropy = this.instance.details.anisotropy;
		}

		if (this.blockMaterial.block.texture.depth5 && this.schedule === 3) {
			textureDepth2 = this.getWallTextures().depth5.clone();
			textureDepth2.needsUpdate = true;
			textureDepth2.wrapS = THREE.RepeatWrapping;
			textureDepth2.wrapT = THREE.RepeatWrapping;
			textureDepth2.repeat.set(this.depth / this.blockMaterial.block.texture.depth5.x, height / this.blockMaterial.block.texture.depth5.y);
			textureDepth2.offset.y = (index === 'add1' || index === 'add2') ? this.data.elements[index].sizePositionY / (this.blockMaterial.block.texture.depth5.y / this.blockMaterial.block.height) : 0;
			textureDepth2.anisotropy = this.instance.details.anisotropy;
		}

		if (this.blockMaterial.block.texture.depth7 && this.schedule === 4) {
			textureDepth2 = this.getWallTextures().depth7.clone();
			textureDepth2.needsUpdate = true;
			textureDepth2.wrapS = THREE.RepeatWrapping;
			textureDepth2.wrapT = THREE.RepeatWrapping;
			textureDepth2.repeat.set(this.depth / this.blockMaterial.block.texture.depth7.x, height / this.blockMaterial.block.texture.depth7.y);
			textureDepth2.offset.y = (index === 'add1' || index === 'add2') ? this.data.elements[index].sizePositionY / (this.blockMaterial.block.texture.depth7.y / this.blockMaterial.block.height) : 0;
			textureDepth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureDepthFinal1 = false;
		let textureDepthFinal2 = false;

		if (
			(index === 'wall' && !(!this.pole1.config.virtual && this.pole1.blockMaterial.block.type === 'corner'))
			|| index === 'add2'
		) {
			textureDepthFinal1 = new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth1, aoMap: textureDepth1 });
		}

		if (
			(index === 'wall' && !(!this.pole2.config.virtual && this.pole2.blockMaterial.block.type === 'corner'))
			|| index === 'add1'
		) {
			textureDepthFinal2 = new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth2, aoMap: textureDepth2 });
		}

		let depth = this.depth;

		if (index === 'add1') {
			depth = this.pole1.getBlockDepth();
		}

		if (index === 'add2') {
			depth = this.pole2.getBlockDepth();
		}

		let fix = { a: 0, b: 0, c: 0, d: 0 };

		if (this.pole1?.points) {
			if (this.pole1.seating && this.pole1.angle > 0 && this.pole1.angle < 90) {
				fix.a = -this.pole1.points.r.x;
			}

			if (this.pole1.seating && this.pole1.angle < 0 && this.pole1.angle > -90) {
				fix.b = -this.pole1.points.r.x;
			}
		}

		if (this.pole2?.points) {
			if (this.pole2.seating && this.pole2.angle < 0 && this.pole2.angle > -90) {
				fix.c = -this.pole2.points.r.x;
			}

			if (this.pole2.seating && this.pole2.angle > 0 && this.pole2.angle < 90) {
				fix.d = -this.pole2.points.r.x;
			}
		}

		let material = [
			new THREE.MeshBasicMaterial({ color: 0x777777 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth1, aoMap: textureWidth1 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth2, aoMap: textureWidth2 }),
			textureDepthFinal1,
			textureDepthFinal2,
			false,
		];

		let geometry;

		if (!(index === 'add1' || index === 'add2')) {
			geometry = new ParallelogramCutGeometry(this.wallWidth, height, depth, this.data.full.indent1 * this.depth, this.data.full.indent2 * this.depth, this.data.elements[index].cut1, this.data.elements[index].cut2, fix);
		} else {
			let indentCorrect = this.data.full.indent1 * this.depth + this.data.full.indent2 * this.depth;

			geometry = new ParallelogramCutGeometry(this.wallWidth + indentCorrect / 2, height, depth, 0, 0, this.data.elements[index].cut1, this.data.elements[index].cut2, fix);
		}

		return { material, geometry };
	}

	doPeak = () => {
		let object;

		switch (this.peakMaterial.type) {
			case 'peak2':
				object = this.doPeakTypePeak();
				break;

			case 'flat2':
			case 'flat4':
				object = this.doPeakTypeFlat();
				break;

			default:
		}

		if (object) {
			if (!this.objects.peak) {
				this.objects.peak = new THREE.Mesh(object.geometry, object.material);
				this.objects.peak.castShadow = true;
				this.three.scenes['3d'].add(this.objects.peak);

				this.eventsPeak(this.objects.peak);
			} else {
				this.objects.peak.geometry = object.geometry;
				this.objects.peak.material = object.material;
			}

			this.objects.peak.position.set(this.position.normal.x, this.height, this.position.normal.z);
			this.objects.peak.rotation.y = this.rotation.normal;
			this.objects.peak.visible = this.config.kind === 'wall' && this.status && !this.error;
		}
	}

	doPeakTypePeak = () => {
		// let textureWidth = this.getPeakTextures().universal.clone();
		// textureWidth.needsUpdate = true;
		// textureWidth.wrapS = THREE.RepeatWrapping;
		// textureWidth.wrapT = THREE.RepeatWrapping;
		// textureWidth.repeat.set(this.peakWidth/this.peakMaterial.texture.universal.x, this.peakMaterial.height/this.peakMaterial.texture.universal.y);
		// textureWidth.anisotropy = this.instance.details.anisotropy;

		let textureDepth = this.getPeakTextures().universal.clone();
		textureDepth.needsUpdate = true;
		textureDepth.wrapS = THREE.RepeatWrapping;
		textureDepth.wrapT = THREE.RepeatWrapping;
		textureDepth.repeat.set(this.peakMaterial.depth / this.peakMaterial.texture.universal.x, this.peakMaterial.height / this.peakMaterial.texture.universal.y);
		textureDepth.anisotropy = this.instance.details.anisotropy;

		let textureFront = this.getPeakTextures().universal.clone();
		textureFront.needsUpdate = true;
		textureFront.wrapS = THREE.RepeatWrapping;
		textureFront.wrapT = THREE.RepeatWrapping;
		textureFront.repeat.set(this.peakWidth / this.peakMaterial.texture.universal.x, this.peakMaterial.depth / 2 / this.peakMaterial.texture.universal.y);
		textureFront.anisotropy = this.instance.details.anisotropy;

		// let textureSide = this.getPeakTextures().universal.clone();
		// textureSide.needsUpdate = true;
		// textureSide.wrapS = THREE.RepeatWrapping;
		// textureSide.wrapT = THREE.RepeatWrapping;
		// textureSide.repeat.set(this.peakMaterial.depth/this.peakMaterial.texture.universal.x, this.peakMaterial.tip.height/this.peakMaterial.texture.universal.y);
		// textureSide.anisotropy = this.instance.details.anisotropy;

		// let textureBottom = this.getPeakTextures().universal.clone();
		// textureBottom.needsUpdate = true;
		// textureBottom.wrapS = THREE.RepeatWrapping;
		// textureBottom.wrapT = THREE.RepeatWrapping;
		// textureBottom.repeat.set(this.peakWidth/this.peakMaterial.texture.universal.x, this.peakMaterial.depth/this.peakMaterial.texture.universal.y);
		// textureBottom.anisotropy = this.instance.details.anisotropy;

		let material = [
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.10 }), // textureBottom
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront }), // textureWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront }), // textureWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth, aoMap: textureDepth }), // textureSide
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth, aoMap: textureDepth }), // textureSide
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth, aoMap: textureDepth }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth, aoMap: textureDepth }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.10 }), // textureBottom
		];

		let geometry = new PeakParallelogramGeometry(this.peakWidth, this.peakMaterial.height, this.peakMaterial.depth, this.peakMaterial.tip.height, this.peakMaterial.tip.depth, this.data.normal.indent1 * this.peakMaterial.depth, this.data.normal.indent2 * this.peakMaterial.depth);

		return { material, geometry };
	}

	doPeakTypeFlat = () => {
		let textureWidth1 = this.getPeakTextures().width1.clone();
		textureWidth1.needsUpdate = true;
		textureWidth1.wrapS = THREE.RepeatWrapping;
		textureWidth1.wrapT = THREE.RepeatWrapping;
		textureWidth1.repeat.set(this.peakWidth / this.peakMaterial.texture.width1.x, this.peakMaterial.height / this.peakMaterial.texture.width1.y);
		textureWidth1.anisotropy = this.instance.details.anisotropy;

		let textureWidth2;
		if (!this.peakMaterial.texture.width2) {
			textureWidth2 = textureWidth1;
		} else {
			textureWidth2 = this.getPeakTextures().width2.clone();
			textureWidth2.needsUpdate = true;
			textureWidth2.wrapS = THREE.RepeatWrapping;
			textureWidth2.wrapT = THREE.RepeatWrapping;
			textureWidth2.repeat.set(this.peakWidth / this.peakMaterial.texture.width2.x, this.peakMaterial.height / this.peakMaterial.texture.width2.y);
			textureWidth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureDepth1 = this.getPeakTextures().depth1.clone();
		textureDepth1.needsUpdate = true;
		textureDepth1.wrapS = THREE.RepeatWrapping;
		textureDepth1.wrapT = THREE.RepeatWrapping;
		textureDepth1.repeat.set(this.peakMaterial.depth / this.peakMaterial.texture.depth1.x, this.peakMaterial.height / this.peakMaterial.texture.depth1.y);
		textureDepth1.anisotropy = this.instance.details.anisotropy;

		let textureDepth2;
		if (!this.peakMaterial.texture.depth2) {
			textureDepth2 = textureDepth1;
		} else {
			textureDepth2 = this.getPeakTextures().depth2.clone();
			textureDepth2.needsUpdate = true;
			textureDepth2.wrapS = THREE.RepeatWrapping;
			textureDepth2.wrapT = THREE.RepeatWrapping;
			textureDepth2.repeat.set(this.peakMaterial.depth / this.peakMaterial.texture.depth2.x, this.peakMaterial.height / this.peakMaterial.texture.depth2.y);
			textureDepth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureTop = this.getPeakTextures().top.clone();
		textureTop.needsUpdate = true;
		textureTop.wrapS = THREE.RepeatWrapping;
		textureTop.wrapT = THREE.RepeatWrapping;
		textureTop.repeat.set(this.peakWidth / this.peakMaterial.texture.top.x, this.peakMaterial.depth / this.peakMaterial.texture.top.y);
		textureTop.anisotropy = this.instance.details.anisotropy;

		let material = [
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTop, aoMap: textureTop }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth1, aoMap: textureWidth1 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth2, aoMap: textureWidth2 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth1, aoMap: textureDepth1 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth2, aoMap: textureDepth2 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTop, aoMap: textureTop }),
		];

		let geometry = new ParallelogramCutGeometry(this.peakWidth, this.peakMaterial.height, this.peakMaterial.depth, this.data.full.indent1 * this.peakMaterial.depth, this.data.full.indent2 * this.peakMaterial.depth, 0, 0);

		return { material, geometry };
	}

	doHighlight2d = () => {
		let object = this.doHighlight();

		if (object) {
			if (!this.objects.highlight2d) {
				this.objects.highlight2d = new THREE.Mesh(object.geometry, object.material);
				this.objects.highlight2d.visible = false;
				this.three.scenes['2d'].add(this.objects.highlight2d);
			} else {
				this.objects.highlight2d.geometry = object.geometry;
				this.objects.highlight2d.material = object.material;
			}

			this.objects.highlight2d.position.set(this.position.normal.x, this.instance.dpsi(0, 1), this.position.normal.z);
			this.objects.highlight2d.rotation.y = this.rotation.normal;
		}
	}

	doHighlight3d = () => {
		let object = this.doHighlight();

		if (object) {
			if (!this.objects.highlight3d) {
				this.objects.highlight3d = new THREE.Mesh(object.geometry, object.material);
				this.objects.highlight3d.visible = false;
				this.three.scenes['3d'].add(this.objects.highlight3d);
			} else {
				this.objects.highlight3d.geometry = object.geometry;
				this.objects.highlight3d.material = object.material;
			}

			this.objects.highlight3d.position.set(this.position.normal.x, this.instance.dpsi(0, 1), this.position.normal.z);
			this.objects.highlight3d.rotation.y = this.rotation.normal;
		}
	}

	doHighlight = () => {
		let material = [
			false,
			false,
			false,
			false,
			false,
			new THREE.MeshBasicMaterial({ color: this.highlightColor, opacity: this.highlightOpacity, transparent: 1 }),
		];

		let geometry = new ParallelogramCutGeometry(this.width + Math.abs(this.data.normal.indent1 * (this.depth + this.highlightSize) / 2) + Math.abs(this.data.normal.indent2 * (this.depth + this.highlightSize) / 2), 0.001, this.depth + this.highlightSize, this.data.normal.indent1 * (this.depth + this.highlightSize), this.data.normal.indent2 * (this.depth + this.highlightSize), 0, 0);

		return { material, geometry };
	}


	/* --- EVENTS --------------------------------------------- */

	eventsSketch = (o) => {
		if (this.instance.editMode()) {
			o.drag = new DragControls([o], { moveable: false }, this.three.cameras['2d'], this.three.render.domElement);

			['click', 'touchend'].forEach((event) => o.drag.addEventListener(event, () => {
				if (!this.instance.isDragging()) {
					this.displayOptions();

					// console.log(this);
				}
			}));
		}
	}

	eventsDescription = (o) => {
		if (this.instance.editMode()) {
			o.drag = new DragControls([o], { moveable: false }, this.three.cameras['2d'], this.three.render.domElement);

			['click', 'touchend'].forEach((event) => o.drag.addEventListener(event, () => {
				if (!this.instance.isDragging()) {
					this.displayOptions();
				}
			}));
		}
	}

	eventsWall = (o, index) => {
		if (this.instance.debug) {
			['rightdown', 'rightup'].forEach((event) => o.on(event, () => {
				Objects.values(o.material).forEach((entry) => {
					if (entry) {
						entry.aoMapIntensity = (event === 'rightdown') ? this.instance.params.texture.aoMapIntensity - 0.30 : this.instance.params.texture.aoMapIntensity;
					}
				});
			}));
		}

		if (this.instance.editMode()) {
			if (this.instance.editMode()) {
				this.instance.onClick(o, () => {
					switch (index) {
						case 'wall':
							this.displayOptions();
							break;

						case 'add1':
							this.pole1.wall.displayOptions();
							break;

						case 'add2':
							this.pole2.next.wall.displayOptions();
							break;

						default:
					}
				});
			}
		}
	}

	eventsPeak = (o) => {
		if (this.instance.editMode()) {
			this.instance.onClick(o, () => {
				this.displayOptions();
			});
		}
	}
}


export default Wall;