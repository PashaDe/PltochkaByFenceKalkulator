import * as THREE from 'three';

import TextGeometry from '../../geometry/TextGeometry';


class Lamp {
	/* --- MESH ----------------------------------------------- */
	doModel = () => {
		if (this.status) {
			if (this.lock.model !== this.config.model) {
				this.lock.model = this.config.model;

				this.three.gltf.load(`/assets/img/lamps/${this.config.group}/models/${this.config.model}/model.gltf`, (gltf) => {
					if (this.objects.model) {
						this.three.scenes['3d'].remove(this.objects.model);
					}

					this.objects.model = gltf.scene;

					this.objects.model.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							o.material.metalness = 0.00;
							o.material.roughness = 0.70;
						}
					});

					this.objects.model.scale.set(0.01, 0.01, 0.01);
					this.three.scenes['3d'].add(this.objects.model);
					this.events(this.objects.model);

					this.doModel();
				});
			} else if (this.objects.model) {
				this.objects.model.position.set(this.position.x, this.position.y, this.position.z);
				this.objects.model.rotation.y = this.target.rotation;
				this.objects.model.visible = this.status;
			}
		} else if (this.objects.model) {
			this.objects.model.visible = false;
		}
	}

	doGlass = () => {
		if (this.status) {
			if (this.lock.glass !== this.config.model) {
				this.lock.glass = this.config.model;

				this.three.gltf.load(`/assets/img/lamps/${this.config.group}/models/${this.config.model}/glass.gltf`, (gltf) => {
					if (this.objects.glass) {
						this.three.scenes['3d'].remove(this.objects.glass);
					}

					this.objects.glass = gltf.scene;

					this.objects.glass.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							o.material.metalness = 0.00;
							o.material.roughness = 0.70;
						}
					});

					this.objects.glass.scale.set(0.01, 0.01, 0.01);
					this.three.scenes['3d'].add(this.objects.glass);
					this.events(this.objects.glass);

					this.doGlass();
				});
			} else if (this.objects.glass) {
				this.objects.glass.position.set(this.position.x, this.position.y, this.position.z);
				this.objects.glass.rotation.y = this.target.rotation;
				this.objects.glass.visible = this.status && this.instance.extensions.dayNight.status === 'day';
			}
		} else if (this.objects.glass) {
			this.objects.glass.visible = false;
		}
	}

	doLight = () => {
		if (this.status) {
			if (this.lock.light !== this.config.model) {
				this.lock.light = this.config.model;

				this.three.gltf.load(`/assets/img/lamps/${this.config.group}/models/${this.config.model}/light.gltf`, (gltf) => {
					if (this.objects.light) {
						this.three.scenes['3d'].remove(this.objects.light);
					}

					this.objects.light = gltf.scene;

					this.objects.light.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							o.material.metalness = -3;
							o.material.roughness = 1;
						}
					});

					this.objects.light.scale.set(0.01, 0.01, 0.01);
					this.three.scenes['3d'].add(this.objects.light);
					this.events(this.objects.light);

					this.doLight();
				});
			} else if (this.objects.light) {
				this.objects.light.position.set(this.position.x, this.position.y, this.position.z);
				this.objects.light.rotation.y = this.target.rotation;
				this.objects.light.visible = this.status && this.instance.extensions.dayNight.status === 'night';
			}
		} else if (this.objects.light) {
			this.objects.light.visible = false;
		}
	}

	doFlash1 = () => {
		if (this.status && this.material.flash1) {
			const { width } = this.material.flash1;
			const { height } = this.material.flash1;
			const position = this.position.y + this.material.flash1.position.y;

			let material = [
				false,
				false,
				false,
				false,
				this.instance.materials[`flash-${this.material.flash1.type}`],
				false,
			];

			let geometry = new THREE.BoxGeometry((width < this.target.width) ? width : this.target.width, height, 0.01);

			if (!this.objects.flash1) {
				this.objects.flash1 = new THREE.Mesh(geometry, material);
				this.three.scenes['3d'].add(this.objects.flash1);
			} else {
				this.objects.flash1.geometry = geometry;
				this.objects.flash1.material = material;
			}

			this.objects.flash1.position.set(this.position.x, position, this.position.z);
			this.objects.flash1.rotation.y = this.target.rotation;
			this.objects.flash1.visible = this.status && this.instance.extensions.dayNight.status === 'night';
		} else if (this.objects.flash1) {
			this.objects.flash1.visible = false;
		}
	}

	doFlash2 = () => {
		if (this.status && this.material.flash2) {
			const { width } = this.material.flash2;
			const { height } = this.material.flash2;
			const position = this.position.y + this.material.flash2.position.y;

			let material = [
				false,
				false,
				false,
				false,
				this.instance.materials[`flash-${this.material.flash2.type}`],
				false,
			];

			let geometry = new THREE.BoxGeometry((width < this.target.width) ? width : this.target.width, height, 0.01);

			if (!this.objects.flash2) {
				this.objects.flash2 = new THREE.Mesh(geometry, material);
				this.three.scenes['3d'].add(this.objects.flash2);
			} else {
				this.objects.flash2.geometry = geometry;
				this.objects.flash2.material = material;
			}

			this.objects.flash2.position.set(this.position.x, position, this.position.z);
			this.objects.flash2.rotation.y = this.target.rotation;
			this.objects.flash2.visible = this.status && this.instance.extensions.dayNight.status === 'night';
		} else if (this.objects.flash2) {
			this.objects.flash2.visible = false;
		}
	}

	doText = () => {
		if (this.status && this.material.text && this.config.text) {
			let geometry = new TextGeometry(this.instance.fonts.bold, this.config.text, 0.064, 0.50, 0, 0.50);

			if (!this.objects.text) {
				let material = new THREE.MeshBasicMaterial({ color: 0x000000 });

				this.objects.text = new THREE.Mesh(geometry, material);
				this.three.scenes['3d'].add(this.objects.text);

				this.events(this.objects.text);
			} else {
				this.objects.text.geometry = geometry;
			}

			this.objects.text.position.set(this.position.text.x, this.position.text.y, this.position.text.z);
			this.objects.text.rotation.y = this.target.rotation;
			this.objects.text.visible = this.status;
		} else if (this.objects.text) {
			this.objects.text.visible = false;
		}
	}

	events = (o) => {
		if (this.instance.editMode()) {
			this.instance.onClick(o, () => {
				this.displayOptions();
			});
		}
	}
}


export default Lamp;