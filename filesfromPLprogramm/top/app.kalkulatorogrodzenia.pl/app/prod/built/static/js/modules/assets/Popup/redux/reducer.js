import types from './types';


const init = {
	status: false,
	content: null,
	toolbar: null,
};

const reducer = (state = init, action) => {
	switch (action.type) {
		case types.SHOW:
			return {
				...state,
				status: true,
				content: action.content,
				toolbar: action.toolbar,
			};

		case types.HIDE:
			return {
				...state,
				status: false,
				content: null,
				toolbar: null,
			};

		default:
			return state;
	}
};


export default reducer;