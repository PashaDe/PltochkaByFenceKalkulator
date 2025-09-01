import * as THREE from 'three';


class Mailbox {
	/* --- MESH ----------------------------------------------- */

	doFront = () => {
		if (this.status && this.material.front) {
			if (this.lock.front !== this.material.front.model) {
				this.lock.front = this.material.front.model;

				this.three.gltf.load(`/assets/new/mailboxes/${this.config.group}/models/${this.material.front.model}/front.gltf?v=2025-05-03`, (gltf) => {
					if (this.objects.front) {
						this.three.scenes['3d'].remove(this.objects.front);
					}

					this.objects.front = gltf.scene;

					this.objects.front.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							if (o.material.name === 'Button_Body') {
								o.material.metalness /= 3;
							}

							if (o.material.name === 'Button_Push') {
								o.material.metalness /= 3;
							}

							if (o.material.name === 'Button_Light') {
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
							o.material = this.instance.materials.mailbox('Material', this.getColor());
						}

						if (o.material.name === 'Button_Light') {
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

				this.objects.front.position.set(this.position.front.x, this.position.front.y, this.position.front.z);
				this.objects.front.rotation.y = this.target.rotation + this.position.front.rotation;
				this.objects.front.visible = this.status;
			}
		} else if (this.objects.front) {
			this.objects.front.visible = false;
		}
	}

	doBack = () => {
		if (this.status && this.material.back) {
			if (this.lock.back !== this.material.back.model) {
				this.lock.back = this.material.back.model;

				this.three.gltf.load(`/assets/new/mailboxes/${this.config.group}/models/${this.material.back.model}/back.gltf?v=2025-05-03`, (gltf) => {
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
							o.material = this.instance.materials.mailbox('Material', this.getColor());
						}

						if (o.material.name === 'Metal') {
							o.material = this.instance.materials.mailbox('Material', this.getColor());
						}
					}
				});

				this.objects.back.position.set(this.position.back.x, this.position.back.y, this.position.back.z);
				this.objects.back.rotation.y = this.target.rotation + this.position.back.rotation;
				this.objects.back.visible = this.status;
			}
		} else if (this.objects.back) {
			this.objects.back.visible = false;
		}
	}

	doFrame = () => {
		if (this.status && (this.config.frame || this.material.additionals.frame.auto)) {
			if (this.lock.frame !== this.material.additionals.frame.model) {
				this.lock.frame = this.material.additionals.frame.model;

				this.three.gltf.load(`/assets/new/mailboxes/${this.config.group}/additionals/frame/${this.material.additionals.frame.model}.gltf?v=2025-05-03`, (gltf) => {
					if (this.objects.frame) {
						this.three.scenes['3d'].remove(this.objects.frame);
					}

					this.objects.frame = gltf.scene;

					this.three.scenes['3d'].add(this.objects.frame);
					this.events(this.objects.frame);

					this.doFrame();
				});
			} else if (this.objects.frame) {
				this.objects.frame.traverse((o) => {
					if (o instanceof THREE.Mesh) {
						if (o.material.name === 'Material') {
							o.material = this.instance.materials.mailbox('Material', this.getColor());
						}

						if (o.material.name === 'Metal') {
							o.material = this.instance.materials.mailbox('Metal', this.getColor());
						}

						o.material.envMap = this.instance.envMap;
					}
				});

				this.objects.frame.position.set(this.position.back.x, this.position.back.y, this.position.back.z);
				this.objects.frame.rotation.y = this.target.rotation + this.position.back.rotation;
				this.objects.frame.visible = this.status;
			}
		} else if (this.objects.frame) {
			this.objects.frame.visible = false;
		}
	}

	doRoof = () => {
		if (this.status && (this.config.roof || this.material.additionals.roof.auto)) {
			if (this.lock.roof !== this.material.additionals.roof.model) {
				this.lock.roof = this.material.additionals.roof.model;

				this.three.gltf.load(`/assets/new/mailboxes/${this.config.group}/additionals/roof/${this.material.additionals.roof.model}.gltf?v=2025-05-03`, (gltf) => {
					if (this.objects.roof) {
						this.three.scenes['3d'].remove(this.objects.roof);
					}

					this.objects.roof = gltf.scene;

					this.three.scenes['3d'].add(this.objects.roof);
					this.events(this.objects.roof);

					this.doRoof();
				});
			} else if (this.objects.roof) {
				this.objects.roof.traverse((o) => {
					if (o instanceof THREE.Mesh) {
						if (o.material.name === 'Material') {
							o.material = this.instance.materials.mailbox('Material', this.getColor());
						}

						o.material.envMap = this.instance.envMap;
					}
				});

				this.objects.roof.position.set(this.position.back.x, this.position.back.y + this.material.back.height / 2 + 0.02, this.position.back.z);
				this.objects.roof.rotation.y = this.target.rotation + this.position.back.rotation;
				this.objects.roof.visible = this.status;
			}
		} else if (this.objects.roof) {
			this.objects.roof.visible = false;
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


export default Mailbox;