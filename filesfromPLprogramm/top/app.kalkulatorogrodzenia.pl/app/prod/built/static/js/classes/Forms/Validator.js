export class Validator {
	constructor(message, type, constraint = null) {
		this.message = message;
		this.type = type;
		this.constraint = constraint;
	}

	getMessage = () => this.message

	isValid = (value) => {
		switch (this.type) {
			case 'checked':
				return this.isValidChecked(value);

			case 'email':
				this.constraint = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;
				return this.isValidRegex(value);

			case 'min_max':
				return this.isValidMinMax(value);

			case 'not_blank':
				return this.isValidNotBlank(value);

			case 'regex':
				return this.isValidRegex(value);

			default:
				return true;
		}
	}

	isValidChecked = (value) => {
		if (!value) {
			return false;
		}

		return true;
	}

	isValidMinMax = (value) => {
		if (!(value.length >= this.constraint[0] && value.length <= this.constraint[1])) {
			return false;
		}

		return true;
	}

	isValidNotBlank = (value) => {
		if (!value) {
			return false;
		}

		return true;
	}

	isValidRegex = (value) => {
		if (!(this.constraint.test(value))) {
			return false;
		}

		return true;
	}
}