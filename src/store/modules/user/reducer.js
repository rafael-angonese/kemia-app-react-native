import authTypes from '../auth/types';

const INITIAL_STATE = {
    user: {},
    error: {},
    loading: false,
};

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case authTypes.SIGN_IN_SUCCESS:
            return {
                user: action.payload.user,
            };

        case authTypes.SIGN_OUT_REQUEST:
            return INITIAL_STATE;

        default:
            return state;
    }
}
