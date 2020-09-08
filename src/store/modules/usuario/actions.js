import types from './types';

export function dataInRequest(params) {
    return {
        type: types.DATA_IN_REQUEST,
        payload: { params },
    };
}

export function dataInSuccess(data) {
    return {
        type: types.DATA_IN_SUCCESS,
        payload: { data },
    };
}

export function dataInFailure(error) {
    return {
        type: types.DATA_IN_FAILURE,
        payload: { error },
    };
}
