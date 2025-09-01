import Objects from 'classes/Tools/Objects';

import types from './types';


const init = {
	update: null,
	view: null,
	content: null,
	objects: [],
};

const reducer = (state = init, action) => {
	switch (action.type) {
		case types.ADD:
			return {
				...state,
				update: Date.now(),
				objects: Objects.add(state.objects, action.object),
			};

		case types.EDIT:
			return {
				...state,
				update: Date.now(),
				objects: Objects.edit(state.objects, action.id, action.object),
			};

		case types.RESET:
			return {
				...state,
				update: Date.now(),
				objects: Objects.clear(),
			};

		case types.SET_VIEW:
			return {
				...state,
				view: action.view,
			};

		case types.SET_CONTENT:
			return {
				...state,
				content: action.content,
			};

		default:
			return state;
	}
};


export default reducer;