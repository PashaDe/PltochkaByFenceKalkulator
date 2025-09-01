import * as THREE from 'three';
import DragControls from 'three-dragcontrols';
import TextSprite from 'three-textsprite';

import Maths from 'classes/Tools/Maths';
import Objects from 'classes/Tools/Objects';
import GeometryPoints from '../../tools/GeometryPoints';

import CuboidGeometry from '../../geometry/Pole/CuboidGeometry';
import CornerGeometry from '../../geometry/Pole/CornerGeometry';
import Peak4Geometry from '../../geometry/Pole/Peak4Geometry';
import Peak2Geometry from '../../geometry/Pole/Peak2Geometry';
import Peak2CornerGeometry from '../../geometry/Pole/Peak2CornerGeometry';
import TextGeometry from '../../geometry/TextGeometry';


class Pole {
	/* --- MESH ----------------------------------------------- */

	doSketch = () => {
		let object;
		let status;

		if (!this.config.virtual) {
			switch (this.blockMaterial.block.type) {
				case 'cuboid':
					object = this.doSketchTypeCuboid();
					status = true;
					break;

				case 'corner':
					object = this.doSketchTypeCorner();
					status = this.points.status;
					break;

				default:
			}
		} else {
			object = this.doSketchVirtual();
			status = true;
		}

		if (object) {
			if (!this.objects.sketch) {
				this.objects.sketch = new THREE.Mesh(object.geometry, object.material);
				this.three.scenes['2d'].add(this.objects.sketch);

				this.eventsSketch(this.objects.sketch);
			} else {
				this.objects.sketch.geometry = object.geometry;
				this.objects.sketch.material = object.material;
			}

			this.objects.sketch.position.set(this.position.x, (!this.config.virtual) ? this.instance.dpsi(1, 1) : this.instance.dpsi(1, 2), this.position.z);
			this.objects.sketch.rotation.y = this.rotation;
			this.objects.sketch.visible = status;
		}
	}

	doSketchVirtual = () => {
		let material = [
			false,
			this.instance.materials.virtual,
			false,
			false,
			false,
			false,
		];

		let geometry = new CuboidGeometry(this.virtualSize, 0.001, this.virtualSize);

		return { material, geometry };
	}

	doSketchTypeCuboid = () => {
		let material = [
			false,
			new THREE.MeshBasicMaterial({ color: this.sketchColor }),
			false,
			false,
			false,
			false,
		];

		let geometry = new CuboidGeometry(this.width, 0.001, this.depth);

		return { material, geometry };
	}

	doSketchTypeCorner = () => {
		let material = [
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			new THREE.MeshBasicMaterial({ color: this.sketchColor }),
			new THREE.MeshBasicMaterial({ color: this.sketchColor }),
		];

		let geometry = new CornerGeometry(this.width, this.coupler, this.depth, this.coupler, 0.001, this.angle);

		return { material, geometry };
	}

	doDescription = () => {
		// this.doDescriptionShape();
		this.doDescriptionTextSprite();
	}

	doDescriptionShape = () => {
		let geometry = new TextGeometry(this.instance.fonts.normal, this.calcDescription());

		if (!this.objects.description) {
			let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

			this.objects.description = new THREE.Mesh(geometry, material);
			this.objects.description.rotation.x = -Math.PI / 2;
			this.three.scenes['2d'].add(this.objects.description);
		} else {
			this.objects.description.geometry = geometry;
		}

		this.objects.description.position.set(this.position.x, this.instance.dpsi(2), this.position.z - 0.02);
		this.objects.description.visible = this.blockMaterial.block.type === 'corner';
	}

	doDescriptionTextSprite = () => {
		if (!this.objects.description) {
			this.objects.description = new TextSprite({
				fontWeight: 'normal',
				fontSize: this.instance.font.size,
				fontFamily: this.instance.font.family,
				fillStyle: '#0000ff',
			});
			this.three.scenes['2d'].add(this.objects.description);
		}

		this.objects.description.material.map.text = this.calcDescription();

		this.objects.description.position.set(this.position.x, this.instance.dpsi(2), this.position.z + 0.015);
		this.objects.description.visible = this.blockMaterial.block.type === 'corner';
	}

	doPole = () => {
		let object;

		switch (this.blockMaterial.block.type) {
			case 'cuboid':
				object = this.doPoleTypeCuboid();
				break;

			case 'corner':
				object = this.doPoleTypeCorner();
				break;

			default:
		}

		if (object) {
			if (!this.objects.pole) {
				this.objects.pole = new THREE.Mesh(object.geometry, object.material);
				this.objects.pole.castShadow = true;
				this.three.scenes['3d'].add(this.objects.pole);

				this.eventsPole(this.objects.pole);
			} else {
				this.objects.pole.geometry = object.geometry;
				this.objects.pole.material = object.material;
			}

			this.objects.pole.position.set(this.position.x, this.calcPolePositionY(), this.position.z);
			this.objects.pole.rotation.y = this.rotation;
			this.objects.pole.visible = !this.config.virtual;
		}
	}

	doPoleTypeCuboid = (disable = false) => {
		const height = this.height - this.additionals.ledblock.getOffset();

		let textureWidth1 = this.getPoleTextures().width1.clone();
		textureWidth1.needsUpdate = true;
		textureWidth1.wrapS = THREE.RepeatWrapping;
		textureWidth1.wrapT = THREE.RepeatWrapping;
		textureWidth1.repeat.set(this.width / this.blockMaterial.block.texture.width1.x, height / this.blockMaterial.block.texture.width1.y);
		textureWidth1.offset.x = this.offset / this.blockMaterial.block.texture.width1.x;
		textureWidth1.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.width1.y / this.getBlockSum());
		textureWidth1.anisotropy = this.instance.details.anisotropy;

		let textureWidth2;
		if (!this.blockMaterial.block.texture.width2) {
			textureWidth2 = textureWidth1;
		} else {
			textureWidth2 = this.getPoleTextures().width2.clone();
			textureWidth2.needsUpdate = true;
			textureWidth2.wrapS = THREE.RepeatWrapping;
			textureWidth2.wrapT = THREE.RepeatWrapping;
			textureWidth2.repeat.set(this.width / this.blockMaterial.block.texture.width2.x, height / this.blockMaterial.block.texture.width2.y);
			textureWidth2.offset.x = this.offset / this.blockMaterial.block.texture.width2.x;
			textureWidth2.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.width2.y / this.getBlockSum());
			textureWidth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureDepth1 = this.getPoleTextures().depth1.clone();
		textureDepth1.needsUpdate = true;
		textureDepth1.wrapS = THREE.RepeatWrapping;
		textureDepth1.wrapT = THREE.RepeatWrapping;
		textureDepth1.repeat.set(this.depth / this.blockMaterial.block.texture.depth1.x, height / this.blockMaterial.block.texture.depth1.y);
		textureDepth1.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.depth1.y / this.getBlockSum());
		textureDepth1.anisotropy = this.instance.details.anisotropy;

		let textureDepth2;
		if (!this.blockMaterial.block.texture.depth2) {
			textureDepth2 = textureDepth1;
		} else {
			textureDepth2 = this.getPoleTextures().depth2.clone();
			textureDepth2.needsUpdate = true;
			textureDepth2.wrapS = THREE.RepeatWrapping;
			textureDepth2.wrapT = THREE.RepeatWrapping;
			textureDepth2.repeat.set(this.depth / this.blockMaterial.block.texture.depth2.x, height / this.blockMaterial.block.texture.depth2.y);
			textureDepth2.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.depth2.y / this.getBlockSum());
			textureDepth2.anisotropy = this.instance.details.anisotropy;
		}

		if (this.blockMaterial.block.texture.depth3 && this.config.size.width % 2 === 1) {
			textureDepth1 = this.getPoleTextures().depth3.clone();
			textureDepth1.needsUpdate = true;
			textureDepth1.wrapS = THREE.RepeatWrapping;
			textureDepth1.wrapT = THREE.RepeatWrapping;
			textureDepth1.repeat.set(this.depth / this.blockMaterial.block.texture.depth3.x, height / this.blockMaterial.block.texture.depth3.y);
			textureDepth1.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.depth3.y / this.getBlockSum());
			textureDepth1.anisotropy = this.instance.details.anisotropy;
		}

		let material = [
			new THREE.MeshBasicMaterial({ color: 0x777777 }),
			false,
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth2, aoMap: textureWidth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth1, aoMap: textureWidth1 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth2, aoMap: textureDepth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth1, aoMap: textureDepth1, ...((disable !== false) ? this.instance.params.hidden : {}) }),
		];

		let geometry = new CuboidGeometry(this.width, height, this.depth);

		return { material, geometry };
	}

	doPoleTypeCorner = (disable = false) => {
		let textureWidth1 = this.getPoleTextures().width1.clone();
		textureWidth1.needsUpdate = true;
		textureWidth1.wrapS = THREE.RepeatWrapping;
		textureWidth1.wrapT = THREE.RepeatWrapping;
		textureWidth1.repeat.set(this.width / this.blockMaterial.block.texture.width1.x, this.height / this.blockMaterial.block.texture.width1.y);
		textureWidth1.offset.x = this.offset / this.blockMaterial.block.texture.width1.x;
		textureWidth1.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.width1.y / this.getBlockSum());
		textureWidth1.anisotropy = this.instance.details.anisotropy;

		let textureWidth2;
		if (!this.blockMaterial.block.texture.width2) {
			textureWidth2 = textureWidth1;
		} else {
			textureWidth2 = this.getPoleTextures().width2.clone();
			textureWidth2.needsUpdate = true;
			textureWidth2.wrapS = THREE.RepeatWrapping;
			textureWidth2.wrapT = THREE.RepeatWrapping;
			textureWidth2.repeat.set(this.width / this.blockMaterial.block.texture.width2.x, this.height / this.blockMaterial.block.texture.width2.y);
			textureWidth2.offset.x = this.offset / this.blockMaterial.block.texture.width2.x;
			textureWidth2.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.width2.y / this.getBlockSum());
			textureWidth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureDepth1 = this.getPoleTextures().depth1.clone();
		textureDepth1.needsUpdate = true;
		textureDepth1.wrapS = THREE.RepeatWrapping;
		textureDepth1.wrapT = THREE.RepeatWrapping;
		textureDepth1.repeat.set(this.depth / this.blockMaterial.block.texture.depth1.x, this.height / this.blockMaterial.block.texture.depth1.y);
		textureDepth1.offset.x = (this.offset + this.width) / this.blockMaterial.block.texture.depth1.x;
		textureDepth1.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.depth1.y / this.getBlockSum());
		textureDepth1.anisotropy = this.instance.details.anisotropy;

		let textureDepth2;
		if (!this.blockMaterial.block.texture.depth2) {
			textureDepth2 = textureDepth1;
		} else {
			textureDepth2 = this.getPoleTextures().depth2.clone();
			textureDepth2.needsUpdate = true;
			textureDepth2.wrapS = THREE.RepeatWrapping;
			textureDepth2.wrapT = THREE.RepeatWrapping;
			textureDepth2.repeat.set(this.depth / this.blockMaterial.block.texture.depth2.x, this.height / this.blockMaterial.block.texture.depth2.y);
			textureDepth2.offset.x = (this.offset + this.width) / this.blockMaterial.block.texture.depth2.x;
			textureDepth2.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.depth2.y / this.getBlockSum());
			textureDepth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureCoupler1 = this.getPoleTextures().coupler1.clone();
		textureCoupler1.needsUpdate = true;
		textureCoupler1.wrapS = THREE.RepeatWrapping;
		textureCoupler1.wrapT = THREE.RepeatWrapping;
		textureCoupler1.repeat.set(this.coupler / this.blockMaterial.block.texture.coupler1.x, this.height / this.blockMaterial.block.texture.coupler1.y);
		textureCoupler1.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.coupler1.y / this.getBlockSum());
		textureCoupler1.anisotropy = this.instance.details.anisotropy;

		let textureCoupler2;
		if (!this.blockMaterial.block.texture.coupler2) {
			textureCoupler2 = textureCoupler1;
		} else {
			textureCoupler2 = this.getPoleTextures().coupler2.clone();
			textureCoupler2.needsUpdate = true;
			textureCoupler2.wrapS = THREE.RepeatWrapping;
			textureCoupler2.wrapT = THREE.RepeatWrapping;
			textureCoupler2.repeat.set(this.coupler / this.blockMaterial.block.texture.coupler2.x, this.height / this.blockMaterial.block.texture.coupler2.y);
			textureCoupler2.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.coupler2.y / this.getBlockSum());
			textureCoupler2.anisotropy = this.instance.details.anisotropy;
		}

		if (this.blockMaterial.block.texture.coupler3 && (this.config.size.width + this.config.size.depth) % 2 === 1) {
			textureCoupler2 = this.getPoleTextures().coupler3.clone();
			textureCoupler2.needsUpdate = true;
			textureCoupler2.wrapS = THREE.RepeatWrapping;
			textureCoupler2.wrapT = THREE.RepeatWrapping;
			textureCoupler2.repeat.set(this.coupler / this.blockMaterial.block.texture.coupler3.x, this.height / this.blockMaterial.block.texture.coupler3.y);
			textureCoupler2.offset.y = (this.seating / this.seatingMaterialHeight) / (this.blockMaterial.block.texture.coupler3.y / this.getBlockSum());
			textureCoupler2.anisotropy = this.instance.details.anisotropy;
		}

		let material = [
			new THREE.MeshBasicMaterial({ color: 0x777777 }),
			new THREE.MeshBasicMaterial({ color: 0x777777 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth1, aoMap: textureWidth1, ...((disable === 2) ? this.instance.params.disabled : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth2, aoMap: textureWidth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth1, aoMap: textureDepth1, ...((disable === 1) ? this.instance.params.disabled : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth2, aoMap: textureDepth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureCoupler1, aoMap: textureCoupler1, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureCoupler2, aoMap: textureCoupler2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			false,
			false,
		];

		let geometry = new CornerGeometry(this.width, this.coupler, this.depth, this.coupler, this.height, this.angle);

		return { material, geometry };
	}

	doPeak = () => {
		let object;

		switch (this.blockMaterial.block.type) {
			case 'cuboid':
				object = this.doPeakTypeCuboid();
				break;

			case 'corner':
				object = this.doPeakTypeCorner();
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

			this.objects.peak.position.set(this.position.x, this.calcPeakPositionY(), this.position.z);
			this.objects.peak.rotation.y = this.rotation;
			this.objects.peak.visible = !this.config.virtual;
		}
	}

	doPeakTypeCuboid = (disable = false) => {
		switch (this.peakMaterial.type) {
			case 'peak4':
				return this.doPeakTypeCuboidPeak4(disable);

			case 'peak2':
				return this.doPeakTypeCuboidPeak2(disable);

			case 'flat4':
				return this.doPeakTypeCuboidFlat4(disable);

			case 'flat2':
				return this.doPeakTypeCuboidFlat2(disable);

			default:
		}

		return false;
	}

	doPeakTypeCuboidPeak4 = (disable = false) => {
		// let textureWidth = this.getPeakTextures().universal.clone();
		// textureWidth.needsUpdate = true;
		// textureWidth.wrapS = THREE.RepeatWrapping;
		// textureWidth.wrapT = THREE.RepeatWrapping;
		// textureWidth.repeat.set(this.peakMaterial.width/this.peakMaterial.texture.universal.x, this.peakMaterial.height/this.peakMaterial.texture.universal.y);
		// textureWidth.anisotropy = this.instance.details.anisotropy;

		// let textureDepth = this.getPeakTextures().universal.clone();
		// textureDepth.needsUpdate = true;
		// textureDepth.wrapS = THREE.RepeatWrapping;
		// textureDepth.wrapT = THREE.RepeatWrapping;
		// textureDepth.repeat.set(this.peakMaterial.depth/this.peakMaterial.texture.universal.x, this.peakMaterial.height/this.peakMaterial.texture.universal.y);
		// textureDepth.anisotropy = this.instance.details.anisotropy;

		let textureFront = this.getPeakTextures().universal.clone();
		textureFront.needsUpdate = true;
		textureFront.wrapS = THREE.RepeatWrapping;
		textureFront.wrapT = THREE.RepeatWrapping;
		textureFront.repeat.set(this.peakMaterial.width / this.peakMaterial.texture.universal.x, (this.peakMaterial.depth - this.peakMaterial.tip.depth) / 2 / this.peakMaterial.texture.universal.y);
		textureFront.anisotropy = this.instance.details.anisotropy;

		let textureSide = this.getPeakTextures().universal.clone();
		textureSide.needsUpdate = true;
		textureSide.wrapS = THREE.RepeatWrapping;
		textureSide.wrapT = THREE.RepeatWrapping;
		textureSide.repeat.set(this.peakMaterial.depth / this.peakMaterial.texture.universal.x, (this.peakMaterial.width - this.peakMaterial.tip.width) / 2 / this.peakMaterial.texture.universal.y);
		textureSide.anisotropy = this.instance.details.anisotropy;

		// let textureBottom = this.getPeakTextures().universal.clone();
		// textureBottom.needsUpdate = true;
		// textureBottom.wrapS = THREE.RepeatWrapping;
		// textureBottom.wrapT = THREE.RepeatWrapping;
		// textureBottom.repeat.set(this.peakMaterial.width/this.peakMaterial.texture.universal.x, this.peakMaterial.depth/this.peakMaterial.texture.universal.y);
		// textureBottom.anisotropy = this.instance.details.anisotropy;

		let material = [
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront }), // textureWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureSide, aoMap: textureSide, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.07, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureDepth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureSide, aoMap: textureSide, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.07, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureDepth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureSide, aoMap: textureSide, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.07, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureSide, aoMap: textureSide, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.07, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.10, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureBottom
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.10, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureBottom
		];

		let geometry = new Peak4Geometry(this.peakMaterial.width, this.peakMaterial.depth, this.peakMaterial.tip.width, this.peakMaterial.tip.depth, this.peakMaterial.tip.height, this.peakMaterial.height);

		return { material, geometry };
	}

	doPeakTypeCuboidPeak2 = (disable = false) => {
		// let textureWidth = this.getPeakTextures().universal.clone();
		// textureWidth.needsUpdate = true;
		// textureWidth.wrapS = THREE.RepeatWrapping;
		// textureWidth.wrapT = THREE.RepeatWrapping;
		// textureWidth.repeat.set((this.width+this.peakMaterial.protrude*2)/this.peakMaterial.texture.universal.x, this.peakMaterial.height/this.peakMaterial.texture.universal.y);
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
		textureFront.repeat.set((this.width + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.universal.x, this.peakMaterial.depth / 2 / this.peakMaterial.texture.universal.y);
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
		// textureBottom.repeat.set((this.width+this.peakMaterial.protrude*2)/this.peakMaterial.texture.universal.x, this.peakMaterial.depth/this.peakMaterial.texture.universal.y);
		// textureBottom.anisotropy = this.instance.details.anisotropy;

		let material = [
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront }), // textureWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth, aoMap: textureDepth, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth, aoMap: textureDepth, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth, aoMap: textureDepth, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureSide
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth, aoMap: textureDepth, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureSide
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.10, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureBottom
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFront, aoMap: textureFront, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.10, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureBottom
		];

		let geometry = new Peak2Geometry(this.width + this.peakMaterial.protrude * 2, this.peakMaterial.depth, this.peakMaterial.tip.depth, this.peakMaterial.tip.height, this.peakMaterial.height);

		return { material, geometry };
	}

	doPeakTypeCuboidFlat4 = (disable = false) => {
		let textureWidth1 = this.getPeakTextures().width1.clone();
		textureWidth1.needsUpdate = true;
		textureWidth1.wrapS = THREE.RepeatWrapping;
		textureWidth1.wrapT = THREE.RepeatWrapping;
		textureWidth1.repeat.set(this.peakMaterial.width / this.peakMaterial.texture.width1.x, this.peakMaterial.height / this.peakMaterial.texture.width1.y);
		textureWidth1.anisotropy = this.instance.details.anisotropy;

		let textureWidth2;
		if (!this.peakMaterial.texture.width2) {
			textureWidth2 = textureWidth1;
		} else {
			textureWidth2 = this.getPeakTextures().width2.clone();
			textureWidth2.needsUpdate = true;
			textureWidth2.wrapS = THREE.RepeatWrapping;
			textureWidth2.wrapT = THREE.RepeatWrapping;
			textureWidth2.repeat.set(this.peakMaterial.width / this.peakMaterial.texture.width2.x, this.peakMaterial.height / this.peakMaterial.texture.width2.y);
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
		textureTop.repeat.set(this.peakMaterial.width / this.peakMaterial.texture.top.x, this.peakMaterial.depth / this.peakMaterial.texture.top.y);
		textureTop.anisotropy = this.instance.details.anisotropy;

		let material = [
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTop, aoMap: textureTop, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTop, aoMap: textureTop, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth2, aoMap: textureWidth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth1, aoMap: textureWidth1 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth2, aoMap: textureDepth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth1, aoMap: textureDepth1, ...((disable !== false) ? this.instance.params.hidden : {}) }),
		];

		let geometry = new CuboidGeometry(this.peakMaterial.width, this.peakMaterial.height, this.peakMaterial.depth);

		return { material, geometry };
	}

	doPeakTypeCuboidFlat2 = (disable = false) => {
		let textureWidth1 = this.getPeakTextures().width1.clone();
		textureWidth1.needsUpdate = true;
		textureWidth1.wrapS = THREE.RepeatWrapping;
		textureWidth1.wrapT = THREE.RepeatWrapping;
		textureWidth1.repeat.set((this.width + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.width1.x, this.peakMaterial.height / this.peakMaterial.texture.width1.y);
		textureWidth1.anisotropy = this.instance.details.anisotropy;

		let textureWidth2;
		if (!this.peakMaterial.texture.width2) {
			textureWidth2 = textureWidth1;
		} else {
			textureWidth2 = this.getPeakTextures().width2.clone();
			textureWidth2.needsUpdate = true;
			textureWidth2.wrapS = THREE.RepeatWrapping;
			textureWidth2.wrapT = THREE.RepeatWrapping;
			textureWidth2.repeat.set((this.width + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.width2.x, this.peakMaterial.height / this.peakMaterial.texture.width2.y);
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
		textureTop.repeat.set((this.width + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.top.x, this.peakMaterial.depth / this.peakMaterial.texture.top.y);
		textureTop.anisotropy = this.instance.details.anisotropy;

		let material = [
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTop, aoMap: textureTop, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTop, aoMap: textureTop, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth2, aoMap: textureWidth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth1, aoMap: textureWidth1 }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth2, aoMap: textureDepth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth1, aoMap: textureDepth1, ...((disable !== false) ? this.instance.params.hidden : {}) }),
		];

		let geometry = new CuboidGeometry(this.width + this.peakMaterial.protrude * 2, this.peakMaterial.height, this.peakMaterial.depth);

		return { material, geometry };
	}

	doPeakTypeCorner = (disable = false) => {
		switch (this.peakMaterial.type) {
			case 'peak2':
				return this.doPeakTypeCornerPeak(disable);

			case 'flat2':
			case 'flat4':
				return this.doPeakTypeCornerFlat(disable);

			default:
		}

		return false;
	}

	doPeakTypeCornerPeak = (disable = false) => {
		// let textureWidth = this.getPeakTextures().universal.clone();
		// textureWidth.needsUpdate = true;
		// textureWidth.wrapS = THREE.RepeatWrapping;
		// textureWidth.wrapT = THREE.RepeatWrapping;
		// textureWidth.repeat.set((this.width+this.peakMaterial.protrude*2)/this.peakMaterial.texture.universal.x, this.peakMaterial.height/this.peakMaterial.texture.universal.y);
		// textureWidth.anisotropy = this.instance.details.anisotropy;

		// let textureDepth = this.getPeakTextures().universal.clone();
		// textureDepth.needsUpdate = true;
		// textureDepth.wrapS = THREE.RepeatWrapping;
		// textureDepth.wrapT = THREE.RepeatWrapping;
		// textureDepth.repeat.set((this.depth+this.peakMaterial.protrude*2)/this.peakMaterial.texture.universal.x, this.peakMaterial.height/this.peakMaterial.texture.universal.y);
		// textureDepth.anisotropy = this.instance.details.anisotropy;

		let textureCoupler = this.getPeakTextures().universal.clone();
		textureCoupler.needsUpdate = true;
		textureCoupler.wrapS = THREE.RepeatWrapping;
		textureCoupler.wrapT = THREE.RepeatWrapping;
		textureCoupler.repeat.set(this.peakMaterial.depth / this.peakMaterial.texture.universal.x, this.peakMaterial.height / this.peakMaterial.texture.universal.y);
		textureCoupler.anisotropy = this.instance.details.anisotropy;

		let textureFrontWidth = this.getPeakTextures().universal.clone();
		textureFrontWidth.needsUpdate = true;
		textureFrontWidth.wrapS = THREE.RepeatWrapping;
		textureFrontWidth.wrapT = THREE.RepeatWrapping;
		textureFrontWidth.repeat.set((this.width + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.universal.x, this.peakMaterial.depth / 2 / this.peakMaterial.texture.universal.y);
		textureFrontWidth.anisotropy = this.instance.details.anisotropy;

		let textureFrontDepth = this.getPeakTextures().universal.clone();
		textureFrontDepth.needsUpdate = true;
		textureFrontDepth.wrapS = THREE.RepeatWrapping;
		textureFrontDepth.wrapT = THREE.RepeatWrapping;
		textureFrontDepth.repeat.set((this.depth + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.universal.x, this.peakMaterial.depth / 2 / this.peakMaterial.texture.universal.y);
		textureFrontDepth.anisotropy = this.instance.details.anisotropy;

		// let textureSide = this.getPeakTextures().universal.clone();
		// textureSide.needsUpdate = true;
		// textureSide.wrapS = THREE.RepeatWrapping;
		// textureSide.wrapT = THREE.RepeatWrapping;
		// textureSide.repeat.set(this.peakMaterial.depth/this.peakMaterial.texture.universal.x, this.peakMaterial.tip.height/this.peakMaterial.texture.universal.y);
		// textureSide.anisotropy = this.instance.details.anisotropy;

		// let textureBottomWidth = this.getPeakTextures().universal.clone();
		// textureBottomWidth.needsUpdate = true;
		// textureBottomWidth.wrapS = THREE.RepeatWrapping;
		// textureBottomWidth.wrapT = THREE.RepeatWrapping;
		// textureBottomWidth.repeat.set((this.width+this.peakMaterial.protrude*2)/this.peakMaterial.texture.universal.x, this.peakMaterial.depth/this.peakMaterial.texture.universal.y);
		// textureBottomWidth.anisotropy = this.instance.details.anisotropy;

		// let textureBottomDepth = this.getPeakTextures().universal.clone();
		// textureBottomDepth.needsUpdate = true;
		// textureBottomDepth.wrapS = THREE.RepeatWrapping;
		// textureBottomDepth.wrapT = THREE.RepeatWrapping;
		// textureBottomDepth.repeat.set((this.depth+this.peakMaterial.protrude*2)/this.peakMaterial.texture.universal.x, this.peakMaterial.depth/this.peakMaterial.texture.universal.y);
		// textureBottomDepth.anisotropy = this.instance.details.anisotropy;

		let material = [
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontWidth, aoMap: textureFrontWidth, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.10, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureBottomWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontDepth, aoMap: textureFrontDepth, aoMapIntensity: this.instance.params.texture.aoMapIntensity + 0.10, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureBottomDepth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontWidth, aoMap: textureFrontWidth, ...((disable === 2) ? this.instance.params.disabled : {}) }), // textureWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontWidth, aoMap: textureFrontWidth, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureWidth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontDepth, aoMap: textureFrontDepth, ...((disable === 1) ? this.instance.params.disabled : {}) }), // textureDepth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontDepth, aoMap: textureFrontDepth, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureDepth
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureCoupler, aoMap: textureCoupler, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureCoupler, aoMap: textureCoupler, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontWidth, aoMap: textureFrontWidth, ...((disable === 2) ? this.instance.params.disabled : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontWidth, aoMap: textureFrontWidth, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontDepth, aoMap: textureFrontDepth, ...((disable === 1) ? this.instance.params.disabled : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureFrontDepth, aoMap: textureFrontDepth, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureCoupler, aoMap: textureCoupler, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureSide
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureCoupler, aoMap: textureCoupler, ...((disable !== false) ? this.instance.params.hidden : {}) }), // textureSide
		];

		let geometry = new Peak2CornerGeometry(this.width + this.peakMaterial.protrude * 2, this.peakMaterial.depth, this.depth + this.peakMaterial.protrude * 2, this.peakMaterial.depth, this.peakMaterial.height, this.peakMaterial.tip.depth, this.peakMaterial.tip.depth, this.peakMaterial.tip.height, this.angle);

		return { material, geometry };
	}

	doPeakTypeCornerFlat = (disable = false) => {
		let textureWidth1 = this.getPeakTextures().width1.clone();
		textureWidth1.needsUpdate = true;
		textureWidth1.wrapS = THREE.RepeatWrapping;
		textureWidth1.wrapT = THREE.RepeatWrapping;
		textureWidth1.repeat.set((this.width + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.width1.x, this.peakMaterial.height / this.peakMaterial.texture.width1.y);
		textureWidth1.anisotropy = this.instance.details.anisotropy;

		let textureWidth2;
		if (!this.peakMaterial.texture.width2) {
			textureWidth2 = textureWidth1;
		} else {
			textureWidth2 = this.getPeakTextures().width2.clone();
			textureWidth2.needsUpdate = true;
			textureWidth2.wrapS = THREE.RepeatWrapping;
			textureWidth2.wrapT = THREE.RepeatWrapping;
			textureWidth2.repeat.set((this.width + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.width2.x, this.peakMaterial.height / this.peakMaterial.texture.width2.y);
			textureWidth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureDepth1 = this.getPeakTextures().width1.clone();
		textureDepth1.needsUpdate = true;
		textureDepth1.wrapS = THREE.RepeatWrapping;
		textureDepth1.wrapT = THREE.RepeatWrapping;
		textureDepth1.repeat.set((this.depth + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.width1.x, this.peakMaterial.height / this.peakMaterial.texture.width1.y);
		textureDepth1.anisotropy = this.instance.details.anisotropy;

		let textureDepth2;
		if (!this.peakMaterial.texture.width2) {
			textureDepth2 = textureDepth1;
		} else {
			textureDepth2 = this.getPeakTextures().width2.clone();
			textureDepth2.needsUpdate = true;
			textureDepth2.wrapS = THREE.RepeatWrapping;
			textureDepth2.wrapT = THREE.RepeatWrapping;
			textureDepth2.repeat.set((this.depth + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.width2.x, this.peakMaterial.height / this.peakMaterial.texture.width2.y);
			textureDepth2.anisotropy = this.instance.details.anisotropy;
		}

		let textureCoupler1 = this.getPeakTextures().depth1.clone();
		textureCoupler1.needsUpdate = true;
		textureCoupler1.wrapS = THREE.RepeatWrapping;
		textureCoupler1.wrapT = THREE.RepeatWrapping;
		textureCoupler1.repeat.set(this.peakMaterial.depth / this.peakMaterial.texture.depth1.x, this.peakMaterial.height / this.peakMaterial.texture.depth1.y);
		textureCoupler1.anisotropy = this.instance.details.anisotropy;

		let textureCoupler2;
		if (!this.peakMaterial.texture.depth2) {
			textureCoupler2 = textureCoupler1;
		} else {
			textureCoupler2 = this.getPeakTextures().depth2.clone();
			textureCoupler2.needsUpdate = true;
			textureCoupler2.wrapS = THREE.RepeatWrapping;
			textureCoupler2.wrapT = THREE.RepeatWrapping;
			textureCoupler2.repeat.set((this.depth + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.width2.x, this.peakMaterial.height / this.peakMaterial.texture.width2.y);
			textureCoupler2.anisotropy = this.instance.details.anisotropy;
		}

		let textureTopWidth = this.getPeakTextures().top.clone();
		textureTopWidth.needsUpdate = true;
		textureTopWidth.wrapS = THREE.RepeatWrapping;
		textureTopWidth.wrapT = THREE.RepeatWrapping;
		textureTopWidth.repeat.set((this.width + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.top.x, this.peakMaterial.depth / this.peakMaterial.texture.top.y);
		textureTopWidth.anisotropy = this.instance.details.anisotropy;

		let textureTopDepth = this.getPeakTextures().top.clone();
		textureTopDepth.needsUpdate = true;
		textureTopDepth.wrapS = THREE.RepeatWrapping;
		textureTopDepth.wrapT = THREE.RepeatWrapping;
		textureTopDepth.repeat.set((this.depth + this.peakMaterial.protrude * 2) / this.peakMaterial.texture.top.x, this.peakMaterial.depth / this.peakMaterial.texture.top.y);
		textureTopDepth.anisotropy = this.instance.details.anisotropy;

		let material = [
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTopWidth, aoMap: textureTopWidth, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTopDepth, aoMap: textureTopDepth, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth1, aoMap: textureWidth1, ...((disable === 2) ? this.instance.params.disabled : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureWidth2, aoMap: textureWidth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth1, aoMap: textureDepth1, ...((disable === 1) ? this.instance.params.disabled : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureDepth2, aoMap: textureDepth2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureCoupler1, aoMap: textureCoupler1, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureCoupler2, aoMap: textureCoupler2, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTopWidth, aoMap: textureTopWidth, ...((disable !== false) ? this.instance.params.hidden : {}) }),
			new THREE.MeshStandardMaterial({ ...this.instance.params.texture, map: textureTopDepth, aoMap: textureTopDepth, ...((disable !== false) ? this.instance.params.hidden : {}) }),
		];

		let geometry = new CornerGeometry(this.width + this.peakMaterial.protrude * 2, this.peakMaterial.depth, this.depth + this.peakMaterial.protrude * 2, this.peakMaterial.depth, this.peakMaterial.height, this.angle);

		return { material, geometry };
	}

	doHighlight2d = () => {
		let object;

		if (!this.config.virtual) {
			switch (this.blockMaterial.block.type) {
				case 'cuboid':
					object = this.doHighlightTypeCuboid();
					break;

				case 'corner':
					object = this.doHighlightTypeCorner();
					break;

				default:
			}
		} else {
			object = this.doHighlightVirtual();
		}

		if (object) {
			if (!this.objects.highlight2d) {
				this.objects.highlight2d = new THREE.Mesh(object.geometry, object.material);
				this.objects.highlight2d.visible = false;
				this.three.scenes['2d'].add(this.objects.highlight2d);
			} else {
				this.objects.highlight2d.geometry = object.geometry;
				this.objects.highlight2d.material = object.material;
			}

			this.objects.highlight2d.position.set(this.position.x, this.instance.dpsi(0, 1), this.position.z);
			this.objects.highlight2d.rotation.y = this.rotation;
		}
	}

	doHighlight3d = () => {
		let object;

		if (!this.config.virtual) {
			switch (this.blockMaterial.block.type) {
				case 'cuboid':
					object = this.doHighlightTypeCuboid();
					break;

				case 'corner':
					object = this.doHighlightTypeCorner();
					break;

				default:
			}
		} else {
			object = this.doHighlightVirtual();
		}

		if (object) {
			if (!this.objects.highlight3d) {
				this.objects.highlight3d = new THREE.Mesh(object.geometry, object.material);
				this.objects.highlight3d.visible = false;
				this.three.scenes['3d'].add(this.objects.highlight3d);
			} else {
				this.objects.highlight3d.geometry = object.geometry;
				this.objects.highlight3d.material = object.material;
			}

			this.objects.highlight3d.position.set(this.position.x, this.instance.dpsi(0, 1), this.position.z);
			this.objects.highlight3d.rotation.y = this.rotation;
		}
	}

	doHighlightVirtual = () => {
		let material = [
			false,
			new THREE.MeshBasicMaterial({ color: this.highlightColor, opacity: this.highlightOpacity, transparent: 1 }),
			false,
			false,
			false,
			false,
		];

		let geometry = new CuboidGeometry(this.virtualSize + this.highlightSize / 2, 0.001, this.virtualSize + this.highlightSize / 2);

		return { material, geometry };
	}

	doHighlightTypeCuboid = () => {
		let material = [
			false,
			new THREE.MeshBasicMaterial({ color: this.highlightColor, opacity: this.highlightOpacity, transparent: 1 }),
			false,
			false,
			false,
			false,
		];

		let geometry = new CuboidGeometry(this.width + this.highlightSize, 0.001, this.depth + this.highlightSize);

		return { material, geometry };
	}

	doHighlightTypeCorner = () => {
		let material;
		let geometry;

		let points = GeometryPoints.Corner(this.width + this.highlightSize, this.coupler + this.highlightSize, this.depth + this.highlightSize, this.coupler + this.highlightSize, this.angle);

		if (Maths.getDistance(points.c, points.d) < this.width + this.highlightSize && Maths.getDistance(points.c, points.d) < this.depth + this.highlightSize) {
			material = [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				new THREE.MeshBasicMaterial({ color: this.highlightColor, opacity: this.highlightOpacity, transparent: 1 }),
				new THREE.MeshBasicMaterial({ color: this.highlightColor, opacity: this.highlightOpacity, transparent: 1 }),
			];

			geometry = new CornerGeometry(this.width + this.highlightSize, this.coupler + this.highlightSize, this.depth + this.highlightSize, this.coupler + this.highlightSize, 0.001, this.angle);
		} else {
			material = [
				false,
				new THREE.MeshBasicMaterial({ color: this.highlightColor, opacity: this.highlightOpacity, transparent: 1 }),
				false,
				false,
				false,
				false,
			];

			geometry = new CuboidGeometry(this.width + this.highlightSize, 0.001, this.depth + this.highlightSize);
		}

		return { material, geometry };
	}


	/* --- EVENTS --------------------------------------------- */

	eventsSketch = (o) => {
		if (this.instance.editMode()) {
			o.drag = new DragControls([o], { moveable: true }, this.three.cameras['2d'], this.three.render.domElement);

			['click', 'touchend'].forEach((event) => o.drag.addEventListener(event, () => {
				this.instance.extensions.dimensions.addPoleToDimension(this.id);
				this.instance.extensions.average.addPoleToAverage(this.id);
				this.displayOptions();

				// console.log(this);
			}));

			['dragstart'].forEach((event) => o.drag.addEventListener(event, () => {
				this.three.camera.controls.enabled = false;
				this.displayOptions();
			}));

			['drag'].forEach((event) => o.drag.addEventListener(event, (e) => {
				this.instance.isMoving = true;
				this.move(e.object, e.event?.ctrlKey);
			}));

			['dragend'].forEach((event) => o.drag.addEventListener(event, (e) => {
				this.three.camera.controls.enabled = true;
				this.instance.isMoving = false;

				this.moved(e.object);
				this.displayOptions();

				this.instance.dragging = Date.now();
			}));
		}
	}

	eventsPole = (o) => {
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
			this.instance.onClick(o, () => {
				this.displayOptions();
			});
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


export default Pole;