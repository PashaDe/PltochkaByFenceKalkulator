import store from 'redux/store';
import types from './types';


const alert = (content) => {
	store.dispatch({ type: types.SHOW, kind: 'alert', content });
};

const confirm = (content, accept = null, decline = null) => {
	store.dispatch({ type: types.SHOW, kind: 'confirm', content, accept, decline });
};

const hide = () => {
	store.dispatch({ type: types.HIDE });
};


export {
	alert,
	confirm,
	hide,
};