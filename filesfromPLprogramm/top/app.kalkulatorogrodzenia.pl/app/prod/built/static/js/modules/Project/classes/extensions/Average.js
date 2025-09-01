import Maths from 'classes/Tools/Maths';
import { ___ } from 'classes/Translation';


class Average {
	constructor(instance) {
		this.instance = instance;

		this.secureLoop = 100;

		this.cache = {
			active: false,
			start: null,
			end: null,
		};
	}

	reset = () => {
		this.cache.active = false;
		this.cache.start = null;
		this.cache.end = null;
	}

	start = () => {
		this.reset();

		this.cache.active = true;

		this.instance.extensions.communique.set(`${___('Wybierz pierwszy element')}...`);
	}

	addPoleToAverage = (id) => {
		if (this.cache.active) {
			if (this.instance.poles[id]) {
				if (!this.cache.start && !this.cache.end) {
					this.cache.start = this.instance.poles[id];

					this.instance.extensions.communique.set(`${___('Wybierz ostatni element')}...`);

					return;
				}

				if (this.cache.start && !this.cache.end) {
					this.cache.end = this.instance.poles[id];

					this.instance.extensions.communique.set(null);
					this.run();
				}
			}
		}
	}

	run = () => {
		if (this.cache.start && this.cache.end) {
			if (this.cache.start.id !== this.cache.end.id) {
				let start;
				let end;

				if (parseInt(this.cache.start.id, 10) < parseInt(this.cache.end.id, 10)) {
					start = this.cache.start;
					end = this.cache.end;
				} else {
					start = this.cache.end;
					end = this.cache.start;
				}

				this.verifyAction(start, end);
			}
		}

		this.reset();
	}

	verifyAction = (start, end) => {
		let index = 0;
		let pole = start;

		let status = true;
		let distance = 0;

		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (pole.blockMaterial.block.type === 'corner' && !(pole.id === start.id || pole.id === end.id)) {
				status = false;
				break;
			}

			if (index > this.secureLoop || pole.id === end.id) {
				break;
			}

			if (pole.config.polygonBreak) {
				status = false;
				break;
			}

			pole = pole.next;
			index++;

			distance += pole.wall.width;
		}

		if (status && distance) {
			this.runAction(start, end, Maths.round(distance / index));
		} else {
			this.instance.extensions.communique.set(`${___('Tych elementów nie można rostawić równomiernie')}.`);
		}
	}

	runAction = (start, end, between) => {
		let index = 0;
		let pole = start;

		let diff = 0;
		let diffPrev = 0;

		let cornerRotation = 0;

		if (start.config.blockMaterialId.indexOf('c1-') === 0) {
			cornerRotation = start.next.rotation - start.rotation;
		}

		const rotation = start.rotation + Maths.degreesToRotation(start.blockMaterial.block.type === 'corner' ? 180 - start.angle : 0) + cornerRotation;

		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (!pole.config.virtual) {
				switch (pole.blockMaterial.block.type) {
					case 'cuboid':
						diff = pole.width / 2;
						break;

					case 'corner':
						diff = pole.depth + pole.points.r.x;
						break;

					default:
				}
			} else {
				diff = 0;
			}

			if (pole.id !== start.id && pole.id !== end.id) {
				const position = pole.prev.position;
				const distance = Maths.rotatePoint({ x: between + diff + diffPrev, z: 0 }, rotation);

				pole.position.x = position.x + distance.x;
				pole.position.z = position.z + distance.z;

				pole.moveUpdate(false);
			}

			if (index > this.secureLoop || pole.id === end.id) {
				break;
			}

			pole = pole.next;
			index++;

			diffPrev = diff;
		}

		this.instance.extensions.communique.set(`${___('Elementy zostały pomyślnie rozstawione')}.`);
	}
}


export default Average;