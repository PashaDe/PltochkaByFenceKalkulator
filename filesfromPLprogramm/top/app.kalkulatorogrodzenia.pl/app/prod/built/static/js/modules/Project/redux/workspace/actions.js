import store from 'redux/store';
import types from './types';


const add = (position, id, node, views = null, status = true) => {
	store.dispatch({
		type: types.ADD,
		object: {
			[id]: {
				position,
				id,
				node,
				views,
				status,
			},
		},
	});
};

const edit = (id, object) => {
	store.dispatch({
		type: types.EDIT,
		id,
		object,
	});
};

const reset = () => {
	store.dispatch({ type: types.RESET });
};

const setView = (view) => {
	store.dispatch({ type: types.SET_VIEW, view });
};

const setContent = (content) => {
	store.dispatch({ type: types.SET_CONTENT, content });
};


export {
	add,
	edit,
	reset,
	setView,
	setContent,
};