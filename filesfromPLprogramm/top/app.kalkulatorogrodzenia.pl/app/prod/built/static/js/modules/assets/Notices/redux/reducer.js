import Objects from 'classes/Tools/Objects';

import types from './types';


const init = {
	entities: {},
};

const reducer = (state = init, action) => {
	switch (action.type) {
		case types.SET:
			return {
				...state,
				entities: { 0: action.notice },
			};

		case types.ADD:
			const id = (Objects.count(state.entities)) ? parseInt(Objects.last(state.entities), 10) + 1 : 0;

			return {
				...state,
				entities: Objects.add(state.entities, { [id]: action.notice }),
			};

		case types.REMOVE:
			return {
				...state,
				entities: Objects.remove(state.entities, action.id),
			};

		case types.CLEAR:
			return {
				...state,
				entities: {},
			};

		default:
			return state;
	}
};


export default reducer;