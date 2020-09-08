import types from './types';

const INITIAL_STATE = {
    usuarios: [],
    errors: {},
    loading: false,
};

export default function usuario(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.DATA_IN_REQUEST:
            return { ...state, errors: {}, loading: true };

        case types.DATA_IN_SUCCESS:
            return {
                errors: {},
                usuarios: action.payload.data,
                loading: false,
            };

        case types.DATA_IN_FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false,
            };

        default:
            return state;
    }
}
