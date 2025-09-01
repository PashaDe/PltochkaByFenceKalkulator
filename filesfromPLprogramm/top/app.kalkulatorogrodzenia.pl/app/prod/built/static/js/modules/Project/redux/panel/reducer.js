import types from './types';


const init = {
	type: null,
	state: null,
	object: null,
};

const reducer = (state = init, action) => {
	switch (action.type) {
		case types.SET:
			return {
				...state,
				type: action.content.type,
				state: action.content.state,
				object: action.content.object,
			};

		case types.RESET:
			return {
				...state,
				type: null,
				state: null,
				object: null,
			};

		default:
			return state;
	}
};


export default reducer;