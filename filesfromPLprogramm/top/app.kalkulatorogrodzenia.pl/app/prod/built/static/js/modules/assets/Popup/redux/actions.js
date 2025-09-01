import store from 'redux/store';
import types from './types';


const show = (content, toolbar = null) => {
	store.dispatch({ type: types.SHOW, content, toolbar });
};

const hide = () => {
	store.dispatch({ type: types.HIDE });
};


export {
	show,
	hide,
};