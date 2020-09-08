import { takeLatest, all, call, put } from 'redux-saga/effects';
import { index } from '../../../services/usuario';
import { dataInSuccess, dataInFailure } from './actions';

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

export default all([
    takeLatest(types.DATA_IN_REQUEST, dataInRequest),
    // takeLatest(types.SIGN_OUT_REQUEST, signOutRequest),
]);
