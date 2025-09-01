import Http from 'classes/Http';
import Objects from 'classes/Tools/Objects';


export class Form {
	constructor(instance, action, prefix) {
		this.instance = instance;
		this.action = action;
		this.prefix = prefix;

		this.fields = this.instance.state.fields;

		this.init();
	}

	init = () => {
		Objects.entries(this.fields).forEach(([name, field]) => {
			this.fields[name].value = (field.value) ? field.value : '';
			this.fields[name].errors = [];
		});

		if (this.fields._token) {
			Http.post(this.action, {
				success: (response) => {
					this.fields._token.value = response.form._token.value;

					this.setLoading(false);
				},
				cancel: (cancel) => {
					this.cancel = cancel;
				},
			});
		}
	}

	cancel = () => {}

	onChange = (event) => {
		if (!this.instance.state.loading) {
			const { name } = event.target;
			const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

			this.fields[name].value = value;
			this.validateField(name, value);

			this.instance.forceUpdate();
		}
	}

	onSubmit = (event) => {
		event.preventDefault();

		if (!this.instance.state.loading && this.isValid()) {
			let data = [];

			Objects.entries(this.fields).forEach(([name, field]) => {
				const formName = (this.prefix) ? `${this.prefix}[${name}]` : name;

				if (field.value) {
					data[formName] = field.value;
				}
			});

			this.setLoading(true);

			Http.post(this.action, {
				data,
				success: (response) => {
					this.setLoading(false);

					this.instance.onSubmit(response);
				},
				cancel: (cancel) => {
					this.cancel = cancel;
				},
			});
		}
	}

	isValid = () => {
		let status = true;

		Objects.entries(this.fields).forEach(([name, field]) => {
			if (!this.validateField(name, field.value)) {
				status = false;
			}
		});

		this.instance.forceUpdate();

		return status;
	}

	validateField = (name, value) => {
		let status = true;

		if (this.fields[name].validators && this.fields[name].validators.length) {
			this.fields[name].errors = [];

			Objects.values(this.fields[name].validators).forEach((validator) => {
				if (!validator.isValid(value)) {
					status = false;
					this.fields[name].errors.push(validator.getMessage());
				}
			});
		}

		return status;
	}

	setResponseErrors = (response) => {
		Objects.keys(this.fields).forEach((name) => {
			this.fields[name].errors = [];

			Objects.values(response.form[name].errors).forEach((error) => {
				this.fields[name].errors.push(error);
			});
		});

		this.instance.forceUpdate();
	};

	setLoading = (status) => {
		if (status) {
			document.documentElement.classList.add('waiting');
		} else {
			document.documentElement.classList.remove('waiting');
		}

		this.instance.setState({ loading: status });
	};
}