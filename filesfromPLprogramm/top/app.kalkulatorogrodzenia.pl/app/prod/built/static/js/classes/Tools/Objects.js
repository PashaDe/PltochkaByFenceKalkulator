class Objects {
	static count = (o) => Objects.keys(o).length

	static in = (search, o) => {
		if (o.includes !== undefined) {
			return o.includes(search);
		}

		let status = false;

		Objects.values(o).forEach((v) => {
			if (v === search) status = true;
		});

		return status;
	}

	static find = (o, callback) => {
		for (let i = 0; i < o.length; i++) {
			if (callback(o[i])) {
				return o[i];
			}
		}

		return false;
	}

	static merge = (o1, o2) => {
		let o = { ...o1 };

		if (Objects.isObject(o1) && Objects.isObject(o2)) {
			Object.keys(o2).forEach((key) => {
				if (Objects.isObject(o2[key])) {
					if (!(key in o1)) {
						o = { ...o, ...{ [key]: o2[key] } };
					} else {
						o[key] = Objects.merge(o1[key], o2[key]);
					}
				} else {
					o = { ...o, ...{ [key]: o2[key] } };
				}
			});
		}

		return o;
	}

	// types
	static isArray = (o) => !!o && o.constructor === Array

	static isObject = (o) => !!o && o.constructor === Object

	// keys
	static first = (o) => Object.keys(o)[0]

	static last = (o) => Object.keys(o)[Object.keys(o).length - 1]

	// loops
	static keys = (o) => Object.keys(o).map((k) => k)

	static keysReverse = (o) => Object.keys(o).reverse().map((k) => k)

	static values = (o) => Object.keys(o).map((k) => o[k])

	static valuesReverse = (o) => Object.keys(o).reverse().map((k) => o[k])

	static entries = (o) => Object.keys(o).map((k) => [k, o[k]])

	static entriesReverse = (o) => Object.keys(o).reverse().map((k) => [k, o[k]])

	// operations
	static add = (o, value) => ({ ...o, ...value })

	static edit = (o, key, value) => {
		if (o[key]) {
			// eslint-disable-next-line no-param-reassign
			o[key] = { ...o[key], ...value };
		}

		return o;
	}

	static remove = (o, key) => {
		const { [key]: removed, ...result } = o;

		return result;
	}

	static clear = () => ({})
}


export default Objects;