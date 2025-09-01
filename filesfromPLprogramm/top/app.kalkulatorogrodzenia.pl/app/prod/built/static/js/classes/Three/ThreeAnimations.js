/* eslint-disable max-classes-per-file */
import Objects from 'classes/Tools/Objects';


class Cycle {
	constructor(callback) {
		this.callback = callback;

		this.duration = 0;
		this.data = {};

		this.status = false;
		this.time = { start: 0, current: 0 };
		this.state = 0;
	}

	animation = () => {
		if (this.status) {
			this.time.current = Date.now() - this.time.start;
			this.state = this.time.current / this.duration;

			if (this.state < 0) {
				this.time.current = 0;
				this.state = 0;
			}

			if (this.state > 1) {
				this.time.current = this.duration;
				this.state = 1;

				this.stop();
			}

			this.callback(this);
		}
	}

	start = (time, data = {}) => {
		if (!this.status) {
			this.duration = time;
			this.data = data;

			this.status = true;
			this.time = { start: Date.now(), current: 0 };
			this.state = 0;
		}
	}

	stop = () => {
		this.status = false;
	}
}


class ThreeAnimations {
	constructor(instance, three) {
		this.instance = instance;
		this.three = three;

		this.animations = [];
		this.cycles = [];
	}

	add = (id, callback) => {
		this.animations[id] = callback;

		return this.animations[id];
	}

	cycle = (id, callback) => {
		this.cycles[id] = new Cycle(callback);

		return this.cycles[id];
	}

	render = () => {
		Objects.values(this.animations).forEach((animation) => animation());
		Objects.values(this.cycles).forEach((cycle) => cycle.animation());
	}
}


export default ThreeAnimations;