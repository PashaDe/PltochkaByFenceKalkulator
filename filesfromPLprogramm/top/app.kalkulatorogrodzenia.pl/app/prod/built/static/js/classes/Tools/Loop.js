class Loop {
	constructor() {
		this.index = 0;
		this.status = true;
	}

	run = (callback) => {
		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (this.status) {
				callback();

				this.index++;
			} else {
				break;
			}
		}
	}

	break = () => {
		this.status = false;
	}
}


export default Loop;