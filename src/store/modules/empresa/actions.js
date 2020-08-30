import types from './types';

export function dataInRequest() {
    return {
        type: types.DATA_IN_REQUEST,
        payload: {},
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

export function setEmpresa(empresa) {
    return {
        type: types.SET_EMPRESA,
        payload: { empresa },
    };
}
