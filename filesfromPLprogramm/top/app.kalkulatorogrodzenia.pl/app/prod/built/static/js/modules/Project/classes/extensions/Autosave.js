import container from 'redux/container';


class Autosave {
	constructor(instance) {
		this.instance = instance;

		this.time = 120;
	}

	set = (status) => {
		if (
			this.instance.editMode()
			&& (!this.instance.project.user_id || this.instance.project.user_id === container.user?.id)
			&& status
		) {
			this.start();
		} else {
			this.stop();
		}
	}

	start = () => {
		if (!this.interval) {
			this.interval = setInterval(() => {
				this.instance.extensions.storage.save(false);
			}, this.time * 1000);
		}
	}

	stop = () => {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
}


export default Autosave;