import types from './types';

const INITIAL_STATE = {
    local: null,
    locais: [],
    errors: {},
    loading: false,
};

export default function local(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.DATA_IN_REQUEST:
            return { ...state, errors: {}, loading: true };

        case types.DATA_IN_SUCCESS:
            return {
                errors: {},
                locais: action.payload.data,
                loading: false,
            };

        case types.DATA_IN_FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false,
            };

        case types.STORE_IN_REQUEST:
            return { ...state, loading: true };

        case types.STORE_IN_SUCCESS:
            return {
                ...state,
                errors: {},
                loading: false,
            };

        case types.STORE_IN_FAILURE:
            return {
                ...state,
                loading: false,
            };

        case types.UPDATE_IN_REQUEST:
            return { ...state, loading: true };

        case types.UPDATE_IN_SUCCESS:
            return {
                ...state,
                errors: {},
                loading: false,
            };

        case types.UPDATE_IN_FAILURE:
            return {
                ...state,
                loading: false,
            };

        case types.DESTROY_IN_REQUEST:
            return { ...state, loading: true };

        case types.DESTROY_IN_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case types.DESTROY_IN_FAILURE:
            return {
                ...state,
                loading: false,
            };

        case types.SET_LOCAL:
            return { ...state, local: action.payload.local };

        default:
            return state;
    }
}
