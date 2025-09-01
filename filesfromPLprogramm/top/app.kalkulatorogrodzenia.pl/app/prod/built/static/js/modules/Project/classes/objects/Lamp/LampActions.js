class LampActions {
	constructor(instance, target) {
		this.instance = instance;
		this.target = target;
	}

	set = (state) => {
		this.target.config = state;
		this.target.reload();

		this.instance.setModified();
	}
}


export default LampActions;