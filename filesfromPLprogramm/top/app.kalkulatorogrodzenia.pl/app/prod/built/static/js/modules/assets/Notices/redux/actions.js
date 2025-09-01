import Objects from 'classes/Tools/Objects';

import store from 'redux/store';
import types from './types';


const createNotice = (notice, type = 'default') => {
	let title = null;
	let content = null;

	if (Objects.isArray(notice)) {
		title = notice[0];
		content = notice[1];
	} else {
		content = notice;
	}

	return { type, title, content };
};

const set = (notice, type = 'default') => store.dispatch({ type: types.SET, notice: createNotice(notice, type) });

const add = (notice, type = 'default') => store.dispatch({ type: types.ADD, notice: createNotice(notice, type) });

const remove = (id) => (store.dispatch({ type: types.REMOVE, id }));

const clear = () => (store.dispatch({ type: types.CLEAR }));


export {
	set,
	add,
	remove,
	clear,
};