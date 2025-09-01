import container from 'redux/container';

import Http from 'classes/Http';


class Timer {
	constructor(instance) {
		this.instance = instance;

		this.saveInterval = 10;

		this.time = 0;
		this.diff = 0;
		this.active = true;
		this.timestamp = Date.now();
	}

	init = () => {
		if (
			this.instance.editMode()
			&& (!this.instance.project.user_id || this.instance.project.user_id === container.user?.id)
		) {
			this.events();
			this.start();
		}
	}

	events = () => {
		['blur'].forEach((event) => window.addEventListener(event, () => {
			this.update();

			this.active = false;
		}));

		['focus'].forEach((event) => window.addEventListener(event, () => {
			this.update();

			this.active = true;
		}));
	}

	update = () => {
		const timestamp = Date.now();

		if (this.active) {
			this.time += timestamp - this.timestamp;
		}

		this.timestamp = timestamp;
	}

	start = () => {
		if (!this.interval) {
			this.interval = setInterval(() => {
				this.action();
			}, this.saveInterval * 1000);
		}
	}

	stop = () => {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	action = () => {
		this.update();

		if (this.active) {
			Http.post('time/', {
				data: {
					id: this.instance.id,
					time: this.time - this.diff,
				},
			});

			this.diff = this.time;
		}
	}
}


export default Timer;