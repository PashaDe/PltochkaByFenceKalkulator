import store from 'redux/store';
import types from './types';


const get = (name) => store.getState().panel[name];

const set = (type, state = null, object = null) => {
	store.dispatch({ type: types.SET, content: { type, state, object } });
};

const reset = () => {
	store.dispatch({ type: types.RESET });
};


export {
	get,
	set,
	reset,
};