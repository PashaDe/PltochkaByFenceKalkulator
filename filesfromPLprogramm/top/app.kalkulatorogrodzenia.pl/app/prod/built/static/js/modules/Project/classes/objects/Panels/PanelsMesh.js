/* eslint-disable operator-linebreak */
import * as THREE from 'three';

import Maths from 'classes/Tools/Maths';


class Panels {
	/* --- MESH ----------------------------------------------- */

	doEpisode = () => {
		this.valuation = {};

		if (this.status && this.material) {
			const path = `${this.config.group}/models/${this.config.model}/model`;

			if (this.lock.episode !== `${path}${this.config.height}`) {
				this.lock.episode = `${path}${this.config.height}`;

				this.three.gltf.load(`/assets/new/panels/${path}.gltf`, (panel) => {
					this.elements.panel = {};

					panel.scene.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							switch (o.material.name) {
								case 'Material':
									o.material = this.instance.materials.panels.material;
									break;

								case 'Inside':
									o.material = this.instance.materials.panels.inside;
									break;

								case 'Mokka':
									o.material = this.instance.materials.panels.mokka;
									break;

								default:
							}

							switch (o.parent.name) {
								case 'Slat_L':
								case 'Slat_R':
									const { count } = this.material.heights[this.config.height];

									if (count < 6) {
										this.cut(o, { y: [0.295 * (6 - count)] });
									}

									this.elements.panel[o.parent.name.replace('Slat_', 'slat')] = o.parent.clone();
									break;

								case 'Adapter':
									this.elements.panel.adapter = o.clone();
									break;

								case 'Inside':
									this.elements.panel.inside = o.clone();
									break;

								case 'Panel_Special_22':
								case 'Panel_Special_27':
									o.castShadow = true;

									this.elements.panel.panel = o.clone();
									break;

								default:
									if (o.name === 'Panel_Pattern') {
										o.castShadow = true;

										this.elements.panel.pattern = o.clone();
									}
							}
						}
					});

					this.three.gltf.load(`/assets/new/panels/${this.config.group}/additionals/pole_${this.material.heights[this.config.height].pole}.gltf`, (pole) => {
						this.elements.pole = pole.scene.clone();

						this.elements.pole.traverse((o) => {
							if (o instanceof THREE.Mesh) {
								switch (o.material.name) {
									case 'Material':
										o.material = this.instance.materials.panels.material;
										break;

									case 'Roof':
										o.material = this.instance.materials.panels.roof;
										break;

									default:
								}
							}
						});

						if (!this.objects.episode) {
							this.objects.episode = new THREE.Scene();

							this.three.scenes['3d'].add(this.objects.episode);
							this.events(this.objects.episode);
						}

						this.doEpisode();
					});
				});
			} else if (this.objects.episode) {
				this.objects.episode.position.set(this.wall.position.normal.x, this.getWallHeight(), this.wall.position.normal.z);
				this.objects.episode.rotation.y = this.wall.rotation.normal;
				this.objects.episode.visible = true;

				this.objects.episode.remove.call(this.objects.episode, ...this.objects.episode.children);

				const panels = this.data.panels;
				const count = this.material.heights[this.config.height].count;

				const origin = {
					w: -this.wall.width / 2 - this.data.origin.start,
					h: this.material.variant.bottom,
				};

				let w = 0;
				let h = 0;

				for (let i = 1; i <= panels + 1; i++) {
					h = 0;

					// poles
					if (
						(this.data.start && i === 1)		// first
						||
						(i > 1 && i <= panels)				// normal
						||
						(this.data.end && i === panels + 1)	// last
					) {
						const o = this.elements.pole.clone();

						o.position.x = origin.w + w + this.material.variant.pole / 2;
						this.objects.episode.add(o);

						this.add('poles', ['pole', this.config.height.replace('_', '')], 'czarny');

						w += this.material.variant.pole;
					} else {
						w += this.material.variant.pole / 2;
					}

					// panels
					if (
						i < panels							// normal
						||
						(i === panels && this.data.last)	// last
					) {
						let width;
						let cut;

						if (i === panels) {
							width = this.data.last;
							cut = this.material.variant.width - width;
						} else if (i === panels - 1) {
							width = this.data.prelast;
							cut = this.material.variant.width - width;
						} else {
							width = this.material.variant.width;
							cut = 0;
						}

						const x = origin.w + w - this.material.variant.slip;

						// Slat L
						{
							const o = this.elements.panel.slatL.clone();

							o.position.x = x + 0.001;
							o.position.y = origin.h + h;
							this.objects.episode.add(o);
						}

						// Slat R
						{
							const o = this.elements.panel.slatR.clone();

							o.position.x = x + width - 0.001;
							o.position.y = origin.h + h;
							this.objects.episode.add(o);
						}

						for (let j = 1; j <= count + 1; j++) {
							// Adapters
							{
								const o = this.elements.panel.adapter.clone();

								o.position.x = x;
								o.position.y = origin.h + h;
								this.objects.episode.add(o);

								if (cut) {
									this.cut(o, { x: [cut] });
								}

								h += this.material.variant.adapter;
							}

							// Panels
							if (j <= count) {
								if (this.material.pattern && j === count - 1) {
									const o = this.elements.panel.pattern.clone();

									o.position.x = x;
									o.position.y = origin.h + h;
									this.objects.episode.add(o);

									if (cut) {
										this.crop(o, { x: [cut] });
									}

									h += this.material.pattern;
								} else {
									const o = this.elements.panel.panel.clone();

									o.position.x = x;
									o.position.y = origin.h + h;
									this.objects.episode.add(o);

									if (cut) {
										this.cut(o, { x: [cut] });
									}

									h += this.material.panel;
								}
							}

							// Insides
							if (this.material.inside && j <= count - 1) {
								{
									const o = this.elements.panel.adapter.clone();

									o.position.x = x;
									o.position.y = origin.h + h;
									this.objects.episode.add(o);

									if (cut) {
										this.cut(o, { x: [cut] });
									}

									h += this.material.variant.adapter;
								}

								{
									const o = this.elements.panel.inside.clone();

									o.position.x = x;
									o.position.y = origin.h + h;
									this.objects.episode.add(o);

									if (cut) {
										this.cut(o, { x: [cut] });
									}

									h += this.material.inside;
								}
							}
						}

						if (width > this.material.variant.width / 2) {
							this.add('panels', [this.config.model, this.config.height.replace('_', ''), '150'], 'mokka');
						} else {
							this.add('panels', [this.config.model, this.config.height.replace('_', ''), '75'], 'mokka');
						}

						w += width - this.material.variant.slip * 2;
					}
				}
			}
		} else if (this.objects.episode) {
			this.objects.episode.visible = false;
		}
	}

	doEpisodeConstant = () => {
		this.valuation = {};

		if (this.status && this.material) {
			const path = `${this.config.model}/${this.config.height.replace('_', '')}`;

			if (this.lock.episode !== path) {
				this.lock.episode = path;

				this.three.gltf.load(`/assets/new/panels/${this.config.group}/models/${path}/150.gltf`, (panel150) => {
					this.elements.panel150 = panel150.scene.clone();

					this.elements.panel150.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							if (o.material.name === 'Material') {
								o.material = this.instance.materials.panels.material;
							}

							if (o.material.name === 'Inside') {
								o.material = this.instance.materials.panels.inside;
							}

							if (o.material.name === 'Mokka') {
								o.material = this.instance.materials.panels.mokka;
							}

							if (o.name === 'Slat') {
								o.visible = false;
							}
						}
					});

					this.three.gltf.load(`/assets/new/panels/${this.config.group}/models/${path}/75.gltf`, (panel75) => {
						this.elements.panel75 = panel75.scene.clone();

						this.elements.panel75.traverse((o) => {
							if (o instanceof THREE.Mesh) {
								if (o.material.name === 'Material') {
									o.material = this.instance.materials.panels.material;
								}

								if (o.material.name === 'Inside') {
									o.material = this.instance.materials.panels.inside;
								}

								if (o.material.name === 'Mokka') {
									o.material = this.instance.materials.panels.mokka;
								}

								if (o.name === 'Slat') {
									o.visible = false;
								}
							}
						});

						this.three.gltf.load(`/assets/new/panels/${this.config.group}/additionals/pole_${this.material.heights[this.config.height].pole}.gltf`, (pole) => {
							this.elements.pole = pole.scene.clone();

							this.elements.pole.traverse((o) => {
								if (o instanceof THREE.Mesh) {
									if (o.material.name === 'Material') {
										o.material = this.instance.materials.panels.material;
									}

									if (o.material.name === 'Roof') {
										o.material = this.instance.materials.panels.roof;
									}
								}
							});

							if (!this.objects.episode) {
								this.objects.episode = new THREE.Scene();

								this.three.scenes['3d'].add(this.objects.episode);
								this.events(this.objects.episode);
							}

							this.doEpisode();
						});
					});
				});
			} else if (this.objects.episode) {
				this.objects.episode.remove.call(this.objects.episode, ...this.objects.episode.children);

				let width;
				let position;
				let rotation;

				if (!this.data.join) {
					const offset = this.wall.pole1.wall.panels.data.width - ((this.wall.pole1.calcAngle()) ? this.wall.pole1.wall.panels.material.variant.pole / 2 : 0);
					const diff = Maths.rotatePoint({ x: offset, y: 0, z: 0 }, this.wall.pole1.wall.rotation.normal);
					const point = this.wall.pole1.wall.data.normal.point1;

					const point1 = { x: point.x + diff.x, y: 0, z: point.z + diff.z };
					const point2 = this.wall.data.normal.point2;
					const center = Maths.getCenter({ x: point1.x, y: point1.z }, { x: point2.x, y: point2.z });

					width = Maths.getDistance({ x: point1.x, y: point1.z }, { x: point2.x, y: point2.z });
					position = { x: center.x, y: 0, z: center.y };
					rotation = Maths.getRotation({ x: point1.x, y: point1.z }, { x: point2.x, y: point2.z });
				} else {
					width = this.wall.width;
					position = this.wall.position.normal;
					rotation = this.wall.rotation.normal;
				}

				const panels = this.data.intervals + this.data.rest;
				const start = -width / 2;

				let w = 0;

				for (let i = 1; i <= panels; i++) {
					// poles
					if (this.data.start || i > 1) {
						const o = this.elements.pole.clone();

						o.position.x = start + w + this.material.variant.pole / 2;
						this.objects.episode.add(o);

						w += this.material.variant.pole;

						this.add('poles', ['pole', this.config.height.replace('_', '')], 'czarny');
					} else {
						w += this.material.variant.pole / 2;
					}

					// panels
					if (!(this.data.rest && i === panels)) {
						const o = this.elements.panel150.clone();

						o.position.x = start + w - this.material.variant.slip;
						o.position.y = 0.055;
						this.objects.episode.add(o);

						w += this.material.variant.width - this.material.variant.slip * 2;

						this.add('panels', [this.config.model, this.config.height.replace('_', ''), '150'], 'mokka');
					} else {
						const o = this.elements.panel75.clone();

						o.position.x = start + w - this.material.variant.slip;
						o.position.y = 0.055;
						this.objects.episode.add(o);

						w += this.material.variant.width / 2 - this.material.variant.slip * 2;

						this.add('panels', [this.config.model, this.config.height.replace('_', ''), '75'], 'mokka');
					}

					// pole last
					if (this.data.end && i === panels) {
						const o = this.elements.pole.clone();

						o.position.x = start + w + this.material.variant.pole / 2;
						this.objects.episode.add(o);

						this.add('poles', ['pole', this.config.height.replace('_', '')], 'czarny');
					}
				}

				this.objects.episode.position.set(position.x, this.getWallHeight(), position.z);
				this.objects.episode.rotation.y = rotation;
				this.objects.episode.visible = true;
			}
		} else if (this.objects.episode) {
			this.objects.episode.visible = false;
		}
	}

	events = (o) => {
		if (this.instance.editMode()) {
			this.instance.onClick(o, () => {
				this.displayOptions();
			});
		}
	}

	add = (subtype, element, color) => {
		const id = `${element.join('_')}_${color}`;

		if (!this.valuation[id]) {
			this.valuation[id] = {
				subtype,
				group: this.config.group,
				element: element.join('_'),
				color,
				quantity: 1,
			};
		} else {
			this.valuation[id].quantity++;
		}
	}

	size = (object) => {
		const box = new THREE.Box3().setFromObject(object.clone());

		return box.getSize(new THREE.Vector3());
	}

	center = (object) => {
		const box = new THREE.Box3().setFromObject(object.clone());

		return box.getCenter(new THREE.Vector3());
	}

	cut = (object, axis = {}) => {
		object.geometry = object.geometry.clone();

		const size = this.size(object);
		const { position, uv } = object.geometry.attributes;

		for (let i = 0; i < position.count; i++) {
			if (axis.x) {
				const bound = axis.x[1] || size.x / 2;
				const cut = axis.x[0];

				if (position.getX(i) > bound) {
					position.setX(i, position.getX(i) - cut);
					uv.setX(i, uv.getX(i) - cut);
				}
			}

			if (axis.y) {
				const bound = axis.y[1] || size.y / 2;
				const cut = axis.y[0];

				if (position.getY(i) > bound) {
					position.setY(i, position.getY(i) - cut);
					uv.setY(i, uv.getY(i) - cut);
				}
			}

			if (axis.z) {
				const bound = axis.z[1] || size.z / 2;
				const cut = axis.z[0];

				if (position.getZ(i) > bound) {
					position.setZ(i, position.getZ(i) - cut);
					uv.setZ(i, uv.getZ(i) - cut);
				}
			}
		}
	};

	crop = (object, axis = {}) => {
		object.material = object.material.clone();

		if (object.parent) {
			object.parent.updateMatrixWorld();
		}

		const size = this.size(object);

		if (axis.x) {
			const bound = size.x;
			const cut = axis.x[0];

			object.position.x += bound - cut;

			const position = object.getWorldPosition(new THREE.Vector3());
			const quaternion = object.getWorldQuaternion(new THREE.Quaternion());

			const vector = new THREE.Vector3(-1, 0, 0);
			vector.applyQuaternion(quaternion);

			object.material.clippingPlanes = [new THREE.Plane(vector, position.x * -vector.x + position.y * -vector.y + position.z * -vector.z)];
			object.material.clipShadows = true;

			object.position.x -= bound - cut;
		}
	};
}


export default Panels;