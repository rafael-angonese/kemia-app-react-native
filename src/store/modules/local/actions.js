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

export function storeInRequest(params, callback) {
    return {
        type: types.STORE_IN_REQUEST,
        payload: { params, callback },
    };
}

export function storeInSuccess(data) {
    return {
        type: types.STORE_IN_SUCCESS,
        payload: { data },
    };
}

export function storeInFailure(error) {
    return {
        type: types.STORE_IN_FAILURE,
        payload: { error },
    };
}

export function updateInRequest(params, callback) {
    return {
        type: types.UPDATE_IN_REQUEST,
        payload: { params, callback },
    };
}

export function updateInSuccess(data) {
    return {
        type: types.UPDATE_IN_SUCCESS,
        payload: { data },
    };
}

export function updateInFailure(error) {
    return {
        type: types.UPDATE_IN_FAILURE,
        payload: { error },
    };
}

export function destroyInRequest(params, callback) {
    return {
        type: types.DESTROY_IN_REQUEST,
        payload: { params, callback },
    };
}

export function destroyInSuccess(data) {
    return {
        type: types.DESTROY_IN_SUCCESS,
        payload: { data },
    };
}

export function destroyInFailure(error) {
    return {
        type: types.DESTROY_IN_FAILURE,
        payload: { error },
    };
}

export function setLocal(local) {
    return {
        type: types.SET_LOCAL,
        payload: { local },
    };
}
