import types from './types';

const INITIAL_STATE = {
    token: null,
    user: {},
    error: {},
    signed: false,
    loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.SIGN_IN_REQUEST:
            return { ...state, loading: true };

        case types.SIGN_IN_SUCCESS:
            return {
                error: {},
                token: action.payload.token,
                user: action.payload.user,
                signed: true,
                loading: false,
            };

        case types.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };

        case types.SIGN_OUT_REQUEST:
            return INITIAL_STATE;

        default:
            return state;
    }
}
