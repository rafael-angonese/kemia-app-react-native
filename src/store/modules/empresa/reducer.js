import types from './types';

const INITIAL_STATE = {
    empresa: null,
    empresas: [],
    error: {},
    loading: false,
};

export default function empresa(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.DATA_IN_REQUEST:
            return { ...state, loading: true };

        case types.DATA_IN_SUCCESS:
            return {
                error: {},
                empresas: action.payload.data,
                loading: false,
            };

        case types.DATA_IN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };

        case types.SET_EMPRESA:
            return { ...state, empresa: action.payload.empresa };

        default:
            return state;
    }
}
