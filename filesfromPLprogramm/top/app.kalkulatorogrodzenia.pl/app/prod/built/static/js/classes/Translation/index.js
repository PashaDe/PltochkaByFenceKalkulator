import container from 'redux/container';


const ___ = (id) => {
	if (container.translations && container.translations[id]) {
		return container.translations[id];
	}

	return id;
};


export {
	___,
};