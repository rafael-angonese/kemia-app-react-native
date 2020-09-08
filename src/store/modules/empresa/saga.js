import { takeLatest, all, call, put } from 'redux-saga/effects';
import { index } from '../../../services/empresa';
import { dataInSuccess, dataInFailure } from './actions';

import types from './types';

export function* dataInRequest() {
    try {
        const response = yield call(index);

        const { data } = response;
        yield put(dataInSuccess(data));
    } catch (error) {
        yield put(dataInFailure({}));
    }
}

export default all([
    takeLatest(types.DATA_IN_REQUEST, dataInRequest),
    // takeLatest(types.SIGN_OUT_REQUEST, signOutRequest),
]);
