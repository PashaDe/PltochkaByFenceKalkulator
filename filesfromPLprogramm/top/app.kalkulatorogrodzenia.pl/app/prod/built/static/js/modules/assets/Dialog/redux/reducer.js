import types from './types';


const init = {
	status: false,
	kind: null,
	content: null,
	accept: null,
	decline: null,
};

const reducer = (state = init, action) => {
	switch (action.type) {
		case types.SHOW:
			return {
				...state,
				status: true,
				kind: action.kind,
				content: action.content,
				accept: action.accept,
				decline: action.decline,
			};

		case types.HIDE:
			return {
				...state,
				status: false,
				kind: null,
				content: null,
				accept: null,
				decline: null,
			};

		default:
			return state;
	}
};


export default reducer;