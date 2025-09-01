class ThreeBuffer {
	constructor(init, run, update) {
		this.init = init;
		this.run = run;
		this.update = update;

		this.running = false;
		this.buffer = 0;
	}

	add = (instances = 1) => {
		this.buffer += instances;

		if (this.init) {
			this.init();
		}

		document.documentElement.classList.add('waiting');
	}

	remove = () => {
		this.buffer--;

		if (this.buffer <= 0) {
			this.done();

			document.documentElement.classList.remove('waiting');
		}
	}

	done = () => {
		if (!this.running) {
			this.running = true;

			if (this.run) {
				this.run();
			}
		} else if (this.update) {
			this.update();
		} else if (this.run) {
			this.run();
		}
	}
}


export default ThreeBuffer;