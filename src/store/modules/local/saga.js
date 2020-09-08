import { takeLatest, all, call, put } from 'redux-saga/effects';
import { index, store, update, destroy } from '../../../services/local';
import {
    dataInSuccess,
    dataInFailure,
    storeInSuccess,
    storeInFailure,
    updateInSuccess,
    updateInFailure,
    destroyInSuccess,
    destroyInFailure,
} from './actions';

import types from './types';

export function* dataInRequest({ payload }) {
    try {
        const { params } = payload;
        const response = yield call(index, params);

        const { data } = response;
        yield put(dataInSuccess(data));
    } catch (error) {
        yield put(dataInFailure({ erro: 'Não foi possível buscar os dados' }));
    }
}

export function* storeInRequest({ payload }) {
    try {
        const { params, callback } = payload;
        const response = yield call(store, params);

        const { data } = response;
        callback(true);
        yield put(storeInSuccess(data));
    } catch (errors) {
        const { callback } = payload;
        callback(false);
        yield put(storeInFailure({}));
    }
}

export function* updateInRequest({ payload }) {
    try {
        const { params, callback } = payload;
        const response = yield call(update, params);

        const { data } = response;
        callback(true);
        yield put(updateInSuccess(data));
    } catch (errors) {
        const { callback } = payload;
        callback(false);
        yield put(updateInFailure({}));
    }
}

export function* destroyInRequest({ payload }) {
    try {
        const { params, callback } = payload;
        const response = yield call(destroy, params);

        const { data } = response;
        callback(true);
        yield put(destroyInSuccess(data));
    } catch (errors) {
        const { callback } = payload;
        callback(false);
        yield put(destroyInFailure({}));
    }
}

export default all([
    takeLatest(types.DATA_IN_REQUEST, dataInRequest),
    takeLatest(types.STORE_IN_REQUEST, storeInRequest),
    takeLatest(types.UPDATE_IN_REQUEST, updateInRequest),
    takeLatest(types.DESTROY_IN_REQUEST, destroyInRequest),
]);
