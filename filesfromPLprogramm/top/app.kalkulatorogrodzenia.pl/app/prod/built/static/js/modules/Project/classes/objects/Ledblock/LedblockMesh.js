import * as THREE from 'three';

import Maths from 'classes/Tools/Maths';


class Ledblock {
	/* --- MESH ----------------------------------------------- */

	doModel = () => {
		if (this.status && this.material.model) {
			if (this.lock.model !== this.material.model) {
				this.lock.model = this.material.model;

				this.three.gltf.load(`/assets/new/ledblocks/${this.config.group}/models/${this.material.model}/model.gltf?v=2025-05-03`, (gltf) => {
					if (this.objects.model) {
						this.three.scenes['3d'].remove(this.objects.model);
					}

					this.objects.model = gltf.scene;

					this.objects.model.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							if (o.material.name === 'Light') {
								o.material = new THREE.MeshPhongMaterial({ name: 'Light', color: 0xe0e0e0, emissive: 0xffffff, reflectivity: 0.00 });
							}

							if (o.material.name === 'Logo') {
								o.material.color = new THREE.Color(0x909090);
							}

							if (o.material.name === 'Panel') {
								o.material.metalness = -1.0;
							}

							if (o.material.name === 'Key') {
								o.material.metalness /= 3;
							}

							if (o.material.name === 'Key Freeze') {
								o.material.metalness /= 3;
							}

							if (o.material.name === 'Key Smooth') {
								o.material.metalness /= 3;
							}

							o.material.envMap = this.instance.envMap;
						}
					});

					this.three.scenes['3d'].add(this.objects.model);
					this.events(this.objects.model);

					this.doModel();
				});
			} else if (this.objects.model) {
				this.objects.model.traverse((o) => {
					if (o instanceof THREE.Mesh) {
						if (o.name === 'Box_Body') {
							o.castShadow = true;
						}

						if (o.material.name === 'Material') {
							o.material = this.instance.materials.mailbox('Material', this.getColor());
						}

						if (o.material.name === 'Light') {
							o.material.color = new THREE.Color(0xe0e0e0);
							o.material.emissive = new THREE.Color(0xffffff);

							if (this.material.light) {
								o.material.emissiveIntensity = this.instance.extensions.dayNight.status !== 'night' ? 0.25 : 1.00;
							} else {
								o.material.emissiveIntensity = 0;
							}
						}
					}
				});

				this.objects.model.position.set(this.position.x, this.position.y, this.position.z);
				this.objects.model.rotation.y = this.target.rotation + this.position.rotation;
				this.objects.model.visible = this.status;
			}
		} else if (this.objects.model) {
			this.objects.model.visible = false;
		}
	}

	doFront = () => {
		if (this.status && this.material.mailbox) {
			if (this.lock.front !== this.material.mailbox) {
				this.lock.front = this.material.mailbox;

				this.three.gltf.load(`/assets/new/mailboxes/${this.config.group}/models/${this.material.mailbox}/front.gltf`, (gltf) => {
					if (this.objects.front) {
						this.three.scenes['3d'].remove(this.objects.front);
					}

					this.objects.front = gltf.scene;

					this.objects.front.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							if (o.name === 'Open') {
								o.rotation.x = 0;
							}

							if (o.material.name === 'Button Inside') {
								o.material.metalness /= 3;
							}

							if (o.material.name === 'Button Frame') {
								o.material.metalness /= 3;
							}

							if (o.material.name === 'Button Light') {
								o.material = new THREE.MeshPhongMaterial({ name: 'Button Light', color: 0xc6e0bf, emissive: 0x00ff00, reflectivity: 0.00 });
							}

							if (o.material.name === 'Camera') {
								o.material.metalness /= 3;
							}

							if (o.material.name === 'Light') {
								o.material = new THREE.MeshPhongMaterial({ name: 'Light', color: 0xc0c0c0, emissive: 0xfff090, reflectivity: 0.00 });
							}

							o.material.envMap = this.instance.envMap;
						}
					});

					this.three.scenes['3d'].add(this.objects.front);
					this.events(this.objects.front);

					this.doFront();
				});
			} else if (this.objects.front) {
				this.objects.front.traverse((o) => {
					if (o instanceof THREE.Mesh) {
						if (o.material.name === 'Material') {
							o.material = this.instance.materials.mailbox('Material', 'inox');
						}

						if (o.material.name === 'Button Light') {
							if (this.instance.extensions.dayNight.status !== 'night') {
								o.material.emissiveIntensity = 0.00;
							} else {
								o.material.emissiveIntensity = 12.00;
							}
						}

						if (o.material.name === 'Light') {
							if (this.instance.extensions.dayNight.status !== 'night') {
								o.material.emissiveIntensity = 0.00;
							} else {
								o.material.emissiveIntensity = 0.50;
							}
						}
					}
				});

				let diffFront = Maths.rotatePoint({
					x: 0,
					y: 0,
					z: this.target.getBlockDepth() / 2,
				}, this.target.rotation);

				this.objects.front.position.set(this.position.x - diffFront.x, this.position.y - this.getOffset() / 2 - 0.065, this.position.z - diffFront.z);
				this.objects.front.rotation.y = this.target.rotation + this.position.rotation;
				this.objects.front.visible = this.status;
			}
		} else if (this.objects.front) {
			this.objects.front.visible = false;
		}
	}

	doBack = () => {
		if (this.status && this.material.mailboxBack) {
			if (this.lock.back !== this.material.mailboxBack) {
				this.lock.back = this.material.mailboxBack;

				this.three.gltf.load(`/assets/new/mailboxes/${this.config.group}/models/${this.material.mailboxBack}/back.gltf`, (gltf) => {
					if (this.objects.back) {
						this.three.scenes['3d'].remove(this.objects.back);
					}

					this.objects.back = gltf.scene;

					this.objects.back.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							if (o.material.name === 'Key') {
								o.material.metalness /= 3;
							}

							o.material.envMap = this.instance.envMap;
						}
					});

					this.three.scenes['3d'].add(this.objects.back);
					this.events(this.objects.back);

					this.doBack();
				});
			} else if (this.objects.back) {
				this.objects.back.traverse((o) => {
					if (o instanceof THREE.Mesh) {
						if (o.material.name === 'Material') {
							o.material = this.instance.materials.mailbox('Material', 'inox');
						}

						if (o.material.name === 'Metal') {
							o.material = this.instance.materials.mailbox('Material', 'inox');
						}
					}
				});

				let diffBack = Maths.rotatePoint({
					x: 0,
					y: 0,
					z: -this.target.getBlockDepth() / 2,
				}, this.target.rotation);

				this.objects.back.position.set(this.position.x - diffBack.x, this.position.y - this.getOffset() / 2 - 0.065, this.position.z - diffBack.z);
				this.objects.back.rotation.y = this.target.rotation + this.position.rotation + Math.PI;
				this.objects.back.visible = this.status;
			}
		} else if (this.objects.back) {
			this.objects.back.visible = false;
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


export default Ledblock;