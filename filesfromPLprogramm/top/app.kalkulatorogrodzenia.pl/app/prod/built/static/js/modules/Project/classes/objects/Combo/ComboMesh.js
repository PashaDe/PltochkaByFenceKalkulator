/* eslint-disable no-constant-condition */
import * as THREE from 'three';


class Combo {
	/* --- MESH ----------------------------------------------- */

	doEpisode = () => {
		this.valuation = {};

		if (this.status && this.destination) {
			const path = `${this.instance.combo.system}/${this.instance.combo.variant}`;

			if (this.lock.episode !== path) {
				this.lock.episode = path;

				this.three.gltf.load(`/assets/img/combo/${path}.gltf`, (gltf) => {
					if (this.objects.episode) {
						this.three.scenes['3d'].remove(this.objects.episode);
					}

					this.objects.episode = gltf.scene;

					this.objects.episode.traverse((o) => {
						if (o instanceof THREE.Mesh) {
							this.elements[o.name] = o.clone();
						}
					});

					this.objects.episode.scale.set(0.01, 0.01, 0.01);
					this.three.scenes['3d'].add(this.objects.episode);
					this.events(this.objects.episode);

					this.doEpisode();
				});
			} else if (this.objects.episode) {
				const material = new THREE.MeshStandardMaterial({ color: this.getColor(), metalness: 0.00, roughness: 1.00 });

				let row;
				let element;

				let roof = (this.data.material.roof) ? this.data.material.elements[this.data.material.roof[0]].height : 0;
				let last = false;

				let x = { index: 0, key: 0, positionStart: 0, positionEnd: 0 };
				let y = { index: 0, key: 0, positionStart: 0, positionEnd: 0 };

				this.objects.episode.remove.call(this.objects.episode, ...this.objects.episode.children);

				while (true) {
					let cut = false;
					let cycle = 0;

					row = (!last) ? this.data.material.structure[y.key] : this.data.material.roof;
					element = row[x.key];

					x.positionEnd = 0;
					y.positionEnd += this.data.material.elements[element].height;

					if ((y.positionEnd <= this.data.height.normal && y.positionEnd + roof <= this.data.height.full) || last) {
						while (true) {
							element = row[x.key];

							if (!last) {
								const offset = (cycle === 0) ? this.data.material.offset[y.key] : this.data.material.offset[y.key] * 2;

								if (x.positionStart + offset >= this.data.material.destination * cycle) {
									x.positionStart += offset;
									x.positionEnd += offset;

									cycle++;
								}
							}

							x.positionEnd += this.data.material.elements[element].width;

							cut = (element === 'roof' && x.positionEnd > this.data.width);

							if (x.positionStart <= this.data.width - 0.02 && (x.positionEnd <= this.data.width + 0.02 || cut)) {
								const id = `${this.instance.combo.system}/${this.data.material.elements[element].material}/${this.instance.combo.color}`;

								if (!this.valuation[id]) {
									this.valuation[id] = {
										system: this.instance.combo.system,
										element: this.data.material.elements[element].material,
										color: this.instance.combo.color,
										quantity: 1,
									};
								} else {
									this.valuation[id].quantity++;
								}

								const o = this.elements[element].clone();

								o.material = material;
								o.position.x = (-this.wall.width / 2 + x.positionStart) * 100;
								o.position.y += y.positionStart * 100;
								o.scale.x = (cut) ? (this.data.width - x.positionStart) / this.data.material.elements[element].width : 1;

								this.objects.episode.add(o);

								if (cut) {
									break;
								}
							} else {
								break;
							}

							x.index++;
							x.key = x.index % row.length;
							x.positionStart = x.positionEnd;
						}

						x.index = 0;
						x.key = 0;
						x.positionStart = 0;

						y.index++;
						y.key = y.index % this.data.material.structure.length;
						y.positionStart = y.positionEnd;

						if (last) break;
					} else if (roof && y.index) {
						last = true;
					} else {
						break;
					}
				}

				this.objects.episode.position.set(this.position.x, this.position.y, this.position.z);
				this.objects.episode.rotation.y = this.wall.rotation.normal;
				this.objects.episode.visible = this.status;
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
}


export default Combo;