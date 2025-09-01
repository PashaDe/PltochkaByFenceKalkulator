import * as THREE from 'three';

import OpenLineGeometry from '../../geometry/Open/LineGeometry';
import OpenCircleGeometry from '../../geometry/Open/CircleGeometry';
import DualLineGeometry from '../../geometry/OpenDual/DualLineGeometry';
import DualCircleGeometry from '../../geometry/OpenDual/DualCircleGeometry';
import BoxGeometry from '../../geometry/Manufacture/BoxGeometry';
import PolesGeometry from '../../geometry/Manufacture/PolesGeometry';
import GateSlidingFixedGeometry from '../../geometry/Manufacture/GateSlidingFixedGeometry';
import SpanGeometry from '../../geometry/Span/SpanGeometry';
import WicketKit from '../../geometry/UniKit/WicketKit';
import GateSlidingKit from '../../geometry/UniKit/GateSlidingKit';


class Manufacture {
	/* --- MESH ----------------------------------------------- */

	doSketchLine = () => {
		if (this.status && this.config.status && this.data.width && this.data.height) {
			let geometry = null;

			switch (this.wall.config.kind) {
				case 'wicket':
					geometry = new OpenLineGeometry(this.data.width, this.config.directionVertical, this.config.directionHorizontal);
					break;

				case 'gate':
					if (this.config.type === 'swing') {
						geometry = new DualLineGeometry(this.data.width, this.config.directionVertical);
					}
					break;

				default:
			}

			if (geometry) {
				let material = new THREE.LineBasicMaterial({
					color: 0x2a2a2a,
				});

				if (!this.objects.sketchLine) {
					this.objects.sketchLine = new THREE.Line(geometry, material);
					this.three.scenes['2d'].add(this.objects.sketchLine);
				} else {
					this.objects.sketchLine.geometry = geometry;
					this.objects.sketchLine.material = material;
				}

				this.objects.sketchLine.position.set(this.position.x, this.instance.dpsi(0, 0), this.position.z);
				this.objects.sketchLine.rotation.y = this.wall.rotation.normal;
				this.objects.sketchLine.visible = true;
			} else if (this.objects.sketchLine) {
				this.objects.sketchLine.visible = false;
			}
		} else if (this.objects.sketchLine) {
			this.objects.sketchLine.visible = false;
		}
	}

	doSketchCircle = () => {
		if (this.status && this.config.status && this.data.width && this.data.height) {
			let geometry = null;

			switch (this.wall.config.kind) {
				case 'wicket':
					geometry = new OpenCircleGeometry(this.data.width, this.config.directionVertical, this.config.directionHorizontal);
					break;

				case 'gate':
					if (this.config.type === 'swing') {
						geometry = new DualCircleGeometry(this.data.width, this.config.directionVertical);
					}
					break;

				default:
			}

			if (geometry) {
				let material = new THREE.LineDashedMaterial({
					color: 0x3a3a3a,
					dashSize: 0.04,
					gapSize: 0.03,
				});

				if (!this.objects.sketchCircle) {
					this.objects.sketchCircle = new THREE.Line(geometry, material);
					this.three.scenes['2d'].add(this.objects.sketchCircle);
				} else {
					this.objects.sketchCircle.geometry = geometry;
					this.objects.sketchCircle.material = material;
				}

				this.objects.sketchCircle.computeLineDistances();

				this.objects.sketchCircle.position.set(this.position.x, this.instance.dpsi(0, 0), this.position.z);
				this.objects.sketchCircle.rotation.y = this.wall.rotation.normal;
				this.objects.sketchCircle.visible = true;
			} else if (this.objects.sketchCircle) {
				this.objects.sketchCircle.visible = false;
			}
		} else if (this.objects.sketchCircle) {
			this.objects.sketchCircle.visible = false;
		}
	}

	doGhost = () => {
		if (this.status && !this.config.status) {
			const color = 0x373737;

			let material = [
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
				new THREE.MeshStandardMaterial({ ...this.instance.params.ghost, color }),
			];

			let geometry = new SpanGeometry('center', { width: this.wall.width, height: this.wall.fullHeight }, { width: 0.02, depth: 0.04, space: 0 }, { height: 0.08, depth: 0.02, space: 0.02, angle: 0 });

			if (!this.objects.ghost) {
				this.objects.ghost = new THREE.Mesh(geometry, material);
				this.objects.ghost.castShadow = this.instance.details.shadowsPrecision >= 100;
				this.three.scenes['3d'].add(this.objects.ghost);

				if (this.instance.getSystem().adds.wickets && this.instance.getSystem().adds.gates) {
					this.events(this.objects.ghost);
				}
			} else {
				this.objects.ghost.geometry = geometry;
				this.objects.ghost.material = material;
			}

			this.objects.ghost.position.set(this.position.x, this.position.y, this.position.z);
			this.objects.ghost.rotation.y = this.wall.rotation.normal;
			this.objects.ghost.visible = true;
		} else if (this.objects.ghost) {
			this.objects.ghost.visible = false;
		}
	}

	doFixed = () => {
		if (this.status && this.config.status && this.data.width && this.data.height) {
			let object;

			switch (this.wall.config.kind) {
				case 'wicket':
					object = this.doFixedWicket();
					break;

				case 'gate':
					if (this.config.type === 'sliding') {
						object = this.doFixedGateSliding();
					}

					if (this.config.type === 'swing') {
						object = this.doFixedGateSwing();
					}
					break;

				default:
			}

			if (object) {
				if (!this.objects.fixed) {
					this.objects.fixed = new THREE.Mesh(object.geometry, object.material);
					this.objects.fixed.castShadow = this.instance.details.shadowsPrecision >= 100;
					this.three.scenes['3d'].add(this.objects.fixed);

					this.events(this.objects.fixed);
				} else {
					this.objects.fixed.geometry = object.geometry;
					this.objects.fixed.material = object.material;
				}

				this.objects.fixed.position.set(this.position.x, this.position.y, this.position.z);
				this.objects.fixed.rotation.y = this.wall.rotation.normal + this.data.additional.rotation;
				this.objects.fixed.visible = true;
			} else if (this.objects.fixed) {
				this.objects.fixed.visible = false;
			}
		} else if (this.objects.fixed) {
			this.objects.fixed.visible = false;
		}
	}

	doFixedWicket = () => {
		const materialMetal = this.instance.materials.metal(this.getColor());

		let material = [
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
		];

		let geometry = new PolesGeometry(this.data.width, this.data.pole.width, this.data.pole.height, this.data.pole.depth, this.data.pole.left, this.data.pole.right, { left: 0, right: 0 });

		return { material, geometry };
	}

	doFixedGateSliding = () => {
		const materialMetal = this.instance.materials.metal(this.getColor());
		const materialSteel = this.instance.materials.metal(0xc0c0c0);

		let material = [
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,

			materialSteel,
			materialSteel,
			materialSteel,
			materialSteel,
			materialSteel,
			materialSteel,
		];

		let geometry = new GateSlidingFixedGeometry(
			this.data.width,
			this.data.height + this.material.size.bottomSpace,
			{
				inside: this.data.additional.inside,
				support: this.material.support,
				extra: this.material.extra.width,
				space: this.material.size.bottomSpace,
			},
			this.data.outRotation,
			this.data.direction,
		);

		return { material, geometry };
	}

	doFixedGateSwing = () => {
		const materialMetal = this.instance.materials.metal(this.getColor());

		let material = [
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
		];

		let geometry = new PolesGeometry(this.data.width, this.data.pole.width, this.data.pole.height, this.data.pole.depth, this.data.pole.left, this.data.pole.right, { left: 0, right: 0 });

		return { material, geometry };
	}

	doMoving1 = () => {
		if (this.status && this.config.status && this.data.width && this.data.height) {
			let object;

			switch (this.wall.config.kind) {
				case 'wicket':
					object = this.doMovingWicket();
					break;

				case 'gate':
					if (this.config.type === 'sliding') {
						object = this.doMovingGateSliding();
					}

					if (this.config.type === 'swing') {
						object = this.doMoving1GateSwing();
					}
					break;

				default:
			}

			if (object) {
				if (!this.objects.moving1) {
					this.objects.moving1 = new THREE.Mesh(object.geometry, object.material);
					this.objects.moving1.castShadow = this.instance.details.shadowsPrecision >= 100;
					this.three.scenes['3d'].add(this.objects.moving1);

					this.events(this.objects.moving1);
				} else {
					this.objects.moving1.geometry = object.geometry;
					this.objects.moving1.material = object.material;
				}

				this.objects.moving1.position.set(this.data.span1.position.x, this.data.span1.position.y, this.data.span1.position.z);
				this.objects.moving1.rotation.y = this.wall.rotation.normal + this.data.rotation;
				this.objects.moving1.visible = true;
			} else if (this.objects.moving1) {
				this.objects.moving1.visible = false;
			}
		} else if (this.objects.moving1) {
			this.objects.moving1.visible = false;
		}
	}

	doMoving2 = () => {
		if (this.status && this.config.status && this.data.width && this.data.height) {
			let object;

			switch (this.wall.config.kind) {
				case 'gate':
					if (this.config.type === 'swing') {
						object = this.doMoving2GateSwing();
					}
					break;

				default:
			}

			if (object) {
				if (!this.objects.moving2) {
					this.objects.moving2 = new THREE.Mesh(object.geometry, object.material);
					this.objects.moving2.castShadow = this.instance.details.shadowsPrecision >= 100;
					this.three.scenes['3d'].add(this.objects.moving2);

					this.events(this.objects.moving2);
				} else {
					this.objects.moving2.geometry = object.geometry;
					this.objects.moving2.material = object.material;
				}

				this.objects.moving2.position.set(this.data.span2.position.x, this.data.span2.position.y, this.data.span2.position.z);
				this.objects.moving2.rotation.y = this.wall.rotation.normal - this.data.rotation;
				this.objects.moving2.visible = true;
			} else if (this.objects.moving2) {
				this.objects.moving2.visible = false;
			}
		} else if (this.objects.moving2) {
			this.objects.moving2.visible = false;
		}
	}

	doMovingWicket = () => {
		const materialMetal = this.instance.materials.metal(this.getColor());
		const materialSheet = this.instance.materials.sheet(this.getColor());
		const materialPerfor = new THREE.MeshStandardMaterial({ ...this.instance.params.perfor, map: this.instance.textures.perfor[this.config.variant], aoMap: this.instance.textures.perfor[this.config.variant] });
		const materialWood = new THREE.MeshStandardMaterial({ ...this.instance.params.wood, map: this.instance.textures.wood, aoMap: this.instance.textures.wood });

		let material = [
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,

			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,

			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,

			materialWood,
			materialWood,
			materialWood,
			materialWood,
			materialWood,
			materialWood,
		];

		let geometry = WicketKit.geometry(
			this.data.params.args,
			this.material,
			this.data.params.data,
		);

		return { material, geometry };
	}

	doMovingGateSliding = () => {
		const materialMetal = this.instance.materials.metal(this.getColor());
		const materialSheet = this.instance.materials.sheet(this.getColor());
		const materialPerfor = new THREE.MeshStandardMaterial({ ...this.instance.params.perfor, map: this.instance.textures.perfor[this.config.variant], aoMap: this.instance.textures.perfor[this.config.variant] });
		const materialWood = new THREE.MeshStandardMaterial({ ...this.instance.params.wood, map: this.instance.textures.wood, aoMap: this.instance.textures.wood });

		let material = [
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,

			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,

			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,

			materialWood,
			materialWood,
			materialWood,
			materialWood,
			materialWood,
			materialWood,
		];

		let geometry = GateSlidingKit.geometry(
			{ ...this.data.params.args, ...{ inside: this.data.additional.inside } },
			this.material,
			this.data.params.data,
		);

		return { material, geometry };
	}

	doMoving1GateSwing = () => {
		const materialMetal = this.instance.materials.metal(this.getColor());
		const materialSheet = this.instance.materials.sheet(this.getColor());
		const materialPerfor = new THREE.MeshStandardMaterial({ ...this.instance.params.perfor, map: this.instance.textures.perfor[this.config.variant], aoMap: this.instance.textures.perfor[this.config.variant] });
		const materialWood = new THREE.MeshStandardMaterial({ ...this.instance.params.wood, map: this.instance.textures.wood, aoMap: this.instance.textures.wood });

		let material = [
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,

			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,

			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,

			materialWood,
			materialWood,
			materialWood,
			materialWood,
			materialWood,
			materialWood,
		];

		let geometry = WicketKit.geometry(
			{ ...this.data.params.args, ...{ direction: 'left' } },
			this.material,
			this.data.params.data,
		);

		return { material, geometry };
	}

	doMoving2GateSwing = () => {
		const materialMetal = this.instance.materials.metal(this.getColor());
		const materialSheet = this.instance.materials.sheet(this.getColor());
		const materialPerfor = new THREE.MeshStandardMaterial({ ...this.instance.params.perfor, map: this.instance.textures.perfor[this.config.variant], aoMap: this.instance.textures.perfor[this.config.variant] });
		const materialWood = new THREE.MeshStandardMaterial({ ...this.instance.params.wood, map: this.instance.textures.wood, aoMap: this.instance.textures.wood });

		let material = [
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,

			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,
			materialSheet,

			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,
			materialPerfor,

			materialWood,
			materialWood,
			materialWood,
			materialWood,
			materialWood,
			materialWood,
		];

		let geometry = WicketKit.geometry(
			{ ...this.data.params.args, ...{ direction: 'right' } },
			this.material,
			this.data.params.data,
		);

		return { material, geometry };
	}

	doThread = () => {
		if (this.data.thread) {
			let object;

			switch (this.wall.config.kind) {
				case 'wicket':
					object = this.doThreadWicket();
					break;

				case 'gate':
					if (this.config.type === 'swing') {
						// object = this.doThreadGate();
					}
					break;

				default:
			}

			if (object) {
				if (!this.objects.thread) {
					this.objects.thread = new THREE.Mesh(object.geometry, object.material);
					this.three.scenes['3d'].add(this.objects.thread);

					this.events(this.objects.thread);
				} else {
					this.objects.thread.geometry = object.geometry;
					this.objects.thread.material = object.material;
				}

				this.objects.thread.position.set(this.data.thread.position.x, this.data.thread.position.y, this.data.thread.position.z);
				this.objects.thread.rotation.y = this.wall.rotation.normal;
				this.objects.thread.visible = true;
			} else if (this.objects.thread) {
				this.objects.thread.visible = false;
			}
		} else if (this.objects.thread) {
			this.objects.thread.visible = false;
		}
	}

	doThreadWicket = () => {
		const materialMetal = this.instance.materials.metal(this.getColor());

		let material = [
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
			materialMetal,
		];

		let geometry = new BoxGeometry(this.data.thread.width - 0.005, this.data.thread.height, this.data.thread.depth);

		return { material, geometry };
	}

	doHinge1 = () => {
		this.doHinge('hinge1');
	}

	doHinge2 = () => {
		this.doHinge('hinge2');
	}

	doHinge = (indicator) => {
		if (this.data[indicator]) {
			const model = 'hinge';

			if (this.lock[indicator] !== model) {
				this.lock[indicator] = model;

				this.three.gltf.load(`/assets/img/manufactures/${model}.gltf`, (gltf) => {
					if (this.objects[indicator]) {
						this.three.scenes['3d'].remove(this.objects[indicator]);
					}

					this.objects[indicator] = gltf.scene;

					this.objects[indicator].traverse((o) => {
						if (o instanceof THREE.Mesh) {
							switch (o.name) {
								case 'H1':
								case 'H1T':
								case 'H1B':
								case 'H2':
								case 'H2T':
								case 'H2B':
									o.material = this.instance.materials.chrome;
									break;

								default:
									o.material.metalness = 0.00;
									o.material.roughness = 0.70;
									break;
							}
						}
					});

					this.three.scenes['3d'].add(this.objects[indicator]);
					this.events(this.objects[indicator]);

					this.doHinge(indicator);
				});
			} else if (this.objects[indicator]) {
				const scale = 100;
				const size = this.data[indicator].width;
				const position = [this.data[indicator].space, this.data.height - this.data[indicator].space];

				this.objects[indicator].traverse((o) => {
					if (o instanceof THREE.Mesh) {
						switch (o.name) {
							// element 1
							case 'B1':
							case 'X1':
								o.position.y = (position[0]) * scale;
								o.rotation.y = this.data[indicator].rotation.fixed;
								break;

							case 'H1':
								o.position.y = (position[0]) * scale;
								break;

							case 'H1T':
								o.position.y = (position[0] + size / 2) * scale;
								break;

							case 'H1B':
								o.position.y = (position[0] - size / 2) * scale;
								break;

							// element 2
							case 'B2':
							case 'X2':
								o.position.y = (position[1]) * scale;
								o.rotation.y = this.data[indicator].rotation.fixed;
								break;

							case 'H2':
								o.position.y = (position[1]) * scale;
								break;

							case 'H2T':
								o.position.y = (position[1] + size / 2) * scale;
								break;

							case 'H2B':
								o.position.y = (position[1] - size / 2) * scale;
								break;

							default:
						}
					}
				});

				this.objects[indicator].position.set(this.data[indicator].position.x, this.data[indicator].position.y, this.data[indicator].position.z);
				this.objects[indicator].rotation.y = this.data[indicator].rotation.rotation + this.data[indicator].rotation.model;
				this.objects[indicator].scale.set(0.01, 0.01, 0.01);
				this.objects[indicator].visible = this.status;
			}
		} else if (this.objects[indicator]) {
			this.objects[indicator].visible = false;
		}
	}

	doHandle1 = () => {
		this.doHandle('handle1');
	}

	doHandle2 = () => {
		this.doHandle('handle2');
	}

	doHandle = (indicator) => {
		if (this.data[indicator] && this.material.handle) {
			const model = this.material.handle;

			if (this.lock[indicator] !== model) {
				this.lock[indicator] = model;

				this.three.gltf.load(`/assets/img/manufactures/handle/${model}.gltf`, (gltf) => {
					if (this.objects[indicator]) {
						this.three.scenes['3d'].remove(this.objects[indicator]);
					}

					this.objects[indicator] = gltf.scene;

					this.objects[indicator].traverse((o) => {
						if (o instanceof THREE.Mesh) {
							switch (o.name) {
								case 'Back':
								case 'Bol':
								case 'Hand':
									o.material = this.instance.materials.chrome;
									break;

								default:
									o.material.metalness = 0.00;
									o.material.roughness = 0.70;
									break;
							}
						}
					});

					this.three.scenes['3d'].add(this.objects[indicator]);
					this.events(this.objects[indicator]);

					this.doHandle(indicator);
				});
			} else if (this.objects[indicator]) {
				this.objects[indicator].traverse((o) => {
					if (o instanceof THREE.Mesh) {
						switch (o.name) {
							case 'Hand':
								o.rotation.z = this.data[indicator].rotation.hand;
								break;

							default:
						}
					}
				});

				this.objects[indicator].position.set(this.data[indicator].position.x, this.data[indicator].position.y, this.data[indicator].position.z);
				this.objects[indicator].rotation.y = this.data[indicator].rotation.rotation + this.data[indicator].rotation.model;
				this.objects[indicator].visible = this.status;
			}
		} else if (this.objects[indicator]) {
			this.objects[indicator].visible = false;
		}
	}

	doLamp = () => {
		if (this.data.lamp) {
			const model = 'lamp';

			if (this.lock.lamp !== model) {
				this.lock.lamp = model;

				this.three.gltf.load(`/assets/img/manufactures/${model}.gltf`, (gltf) => {
					if (this.objects.lamp) {
						this.three.scenes['3d'].remove(this.objects.lamp);
					}

					this.objects.lamp = gltf.scene;

					this.objects.lamp.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							o.material.metalness = 0;
							o.material.roughness = 1;
						}
					});

					this.objects.lamp.scale.set(0.01, 0.01, 0.01);
					this.three.scenes['3d'].add(this.objects.lamp);

					this.doLamp();
				});
			} else if (this.objects.lamp) {
				this.objects.lamp.traverse((o) => {
					if (o instanceof THREE.Mesh) {
						if (o.name === 'G') {
							o.material.metalness = this.data.lamp.light;
						}
					}
				});

				this.objects.lamp.position.set(this.data.lamp.position.x, this.data.lamp.position.y, this.data.lamp.position.z);
				this.objects.lamp.rotation.y = this.wall.rotation.normal + this.data.additional.rotation;
				this.objects.lamp.visible = !!this.data.lamp;
			}
		} else if (this.objects.lamp) {
			this.objects.lamp.visible = false;
		}
	}

	events = (o) => {
		if (this.instance.editMode()) {
			this.instance.onClick(o, () => {
				this.displayOptions();
			});
		}

		o.on('rightclick', () => {
			if (this.status && this.config.status) {
				const time = (this.wall.config.kind === 'wicket') ? 1200 : this.material.opentime * 1000;
				const revert = (this.wall.config.kind === 'wicket' || this.config.type === 'swing') ? this.rotation > 0 : this.data.params.args.open;

				this.animation.start(time, { revert });
			}
		});
	}
}


export default Manufacture;