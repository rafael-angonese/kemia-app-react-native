import types from './types';

export function signInRequest(username, senha) {
    return {
        type: types.SIGN_IN_REQUEST,
        payload: { username, senha },
    };
}

export function signInSuccess(token, user) {
    return {
        type: types.SIGN_IN_SUCCESS,
        payload: { token, user },
    };
}

export function signInFailure(error) {
    return {
        type: types.SIGN_IN_FAILURE,
        payload: { error },
    };
}

export function signOutRequest() {
    return {
        type: types.SIGN_OUT_REQUEST,
    };
}
