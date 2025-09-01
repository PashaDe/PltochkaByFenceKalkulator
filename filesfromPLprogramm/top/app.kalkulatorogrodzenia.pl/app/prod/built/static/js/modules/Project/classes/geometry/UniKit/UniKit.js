import Geometry from 'classes/Three/Geometry';
import Helper from 'classes/Tools/Helper';
import Objects from 'classes/Tools/Objects';


class UniKit extends Geometry {
	bound = (type, size, direction) => {
		switch (direction) {
			case 'center':
				switch (type) {
					case 1:
						return -size / 2;

					case 2:
						return size / 2;

					default:
				}
				break;

			case 'left':
			case 'bottom':
				switch (type) {
					case 1:
						return 0;

					case 2:
						return size;

					default:
				}
				break;

			case 'right':
			case 'top':
				switch (type) {
					case 1:
						return -size;

					case 2:
						return 0;

					default:
				}
				break;

			default:
		}

		return 0;
	}

	sum = (dependencies) => {
		let result = 0;

		dependencies.forEach((value) => {
			result += Helper.aN(value);
		});

		return result;
	}

	space = (variant) => {
		/* if (this.config.customizable?.flex) {
			return this.args.custom.flex;
		} */

		if (this.config.customizable?.space) {
			return this.args.custom.space;
		}

		return variant.structure.space;
	}

	panels = {
		data: (range) => {
			const structure = [];

			const element = {
				index: 0,
				key: 0,
				variant: false,
				start: 0,
				end: 0,
				offset: 0,
			};

			switch (this.config.panels.mode) {
				case 'fill':
					element.index = 0;
					element.key = -1;
					element.variant = {};
					element.start = 0;
					element.end = range;
					element.offset = element.end;

					structure.push({ ...element });
					break;

				case 'simple':
					const count = Math.floor((range + this.space(this.config.panels.variant)) / (this.config.panels.variant.structure.size + this.space(this.config.panels.variant)));

					for (let i = 1; i <= count; i++) {
						element.index = i;
						element.key = -1;
						element.variant = this.config.panels.variant;
						element.start = element.offset;
						element.end = element.start + element.variant.structure.size;
						element.offset = element.end + this.space(element.variant);

						structure.push({ ...element });
					}
					break;

				case 'continuous':
					for (let i = 1; i <= 1000; i++) {
						element.index = i;
						element.key = (element.index - 1) % Objects.count(this.config.panels.variant);
						element.variant = this.config.panels.variant[element.key];
						element.start = element.offset;
						element.end = element.start + element.variant.structure.size;
						element.offset = element.end + this.space(element.variant);

						if (element.end <= range) {
							structure.push({ ...element });
						} else {
							break;
						}
					}

					if (this.config.panels.end !== false) {
						for (let index = structure.length - 1; index >= 0; index--) {
							if (structure[index].key !== this.config.panels.end) {
								structure.splice(-1);
							} else {
								break;
							}
						}
					}
					break;

				case 'first':
				case 'last':
					for (let i = 1; i <= 1000; i++) {
						element.index = i;
						element.key = (element.index <= this.config.panels.count) ? 0 : 1;
						element.variant = this.config.panels.variant[element.key];
						element.start = element.offset;
						element.end = element.start + element.variant.structure.size;
						element.offset = element.end + this.space(element.variant);

						if (element.end <= range) {
							structure.push({ ...element });
						} else {
							break;
						}
					}

					if (this.config.panels.mode === 'last') {
						if (structure.length) {
							const size = structure[structure.length - 1].end;

							structure.reverse();

							structure.forEach((subelement, i) => {
								subelement.index = i + 1;
								subelement.start = (subelement.end - size) * -1;
								subelement.end = subelement.start + subelement.variant.structure.size;
								subelement.offset = subelement.end + this.space(subelement.variant);
							});
						}
					}
					break;

				default:
			}

			/* if (structure.length && this.config.flexible) {
				const space = this.args.flex;
				const { min, max } = this.config.flexible;

				let diff = (range - structure[structure.length - 1].end) / (structure.length - 1);

				if (space + diff > max) {
					diff = max - space;
				}

				if (space + diff < min) {
					diff = 0;
				}

				if (diff > 0) {
					structure.forEach((p, i) => {
						p.start += i * diff;
						p.end += i * diff;
						p.offset += (i + 1) * diff;
					});
				}
			} */

			return {
				count: structure.length,
				size: (structure.length) ? structure[structure.length - 1].end : 0,
				structure,
			};
		},

		draw: (w1, w2, h1, h2, d = 0) => {
			this.data.panels.structure.forEach((element) => {
				let material = 0;
				let unwrap = { type: 'fill', unit: { x: 1.50, y: 0.40 } };

				if (this.config.panels.material) {
					this.config.panels.material.forEach((materialConfig) => {
						let n;

						switch (materialConfig.mode) {
							case 'all':
								material = materialConfig.material;
								unwrap.type = materialConfig.wrap;
								unwrap.unit = materialConfig.unit;
								break;

							case 'continuous':
								n = (this.data.panels.count - element.index) % (materialConfig.variant.offset + materialConfig.variant.amount);

								if (n >= materialConfig.variant.offset && n < materialConfig.variant.offset + materialConfig.variant.amount) {
									material = materialConfig.material;
									unwrap.type = materialConfig.wrap;
								}
								break;

							case 'top':
								n = this.data.panels.count - element.index;

								if (n >= materialConfig.variant.offset && n < materialConfig.variant.offset + materialConfig.variant.amount) {
									material = materialConfig.material;
									unwrap.type = materialConfig.wrap;
								}
								break;

							case 'bottom':
								n = element.index - 1;

								if (n >= materialConfig.variant.offset && n < materialConfig.variant.offset + materialConfig.variant.amount) {
									material = materialConfig.material;
									unwrap.type = materialConfig.wrap;
								}
								break;

							default:
						}
					});
				}

				switch (this.config.type) {
					case 'horizontal':
						this.rect(w1 + this.D, w2 - this.D, h1 + element.start, h1 + element.end, d - Helper.aN(element.variant.depth) / 2, d + Helper.aN(element.variant.depth) / 2, { rotationY: element.variant.structure?.angle }, material, unwrap);
						break;

					case 'vertical':
						const range = w2 - w1;
						const count = Math.floor((range + this.space(this.config.panels.variant)) / (this.config.panels.variant.structure.size + this.space(this.config.panels.variant)));

						if (count) {
							const offset = (range - this.data.panels.structure[count - 1].end) / 2;

							if (element.index <= count) {
								if (this.nearestJoiner(w1 + offset + element.start) < 0.08) {
									this.rect(w1 + offset + element.start, w1 + offset + element.end, h1 - this.h1 + this.D, h2 + 0.01 - this.D, -this.config.joiners.depth / 2, this.config.joiners.depth / 2, { rotationX: element.variant.structure?.angle }, material, unwrap);
								} else {
									this.rect(w1 + offset + element.start, w1 + offset + element.end, h1 + this.D, h2 - this.D, d - Helper.aN(element.variant.depth) / 2, d + Helper.aN(element.variant.depth) / 2, { rotationX: element.variant.structure?.angle }, material, unwrap);
								}
							}
						}
						break;

					default:
				}
			});
		},
	}

	nearestJoiner = (w) => {
		let result = Infinity;

		if (this.joiners && this.joiners.length) {
			this.joiners.forEach((p) => {
				const distance = w - p.start;

				if (distance > 0) {
					if (result > distance) {
						result = distance;
					}
				}
			});
		}

		return result;
	}
}


export default UniKit;