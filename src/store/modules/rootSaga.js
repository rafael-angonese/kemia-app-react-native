import { all } from 'redux-saga/effects';

import auth from './auth/saga';
import user from './user/saga';
import empresa from './empresa/saga';

// export default function* rootSaga() {
//   return yield all([auth]);
// }

export default function* rootSaga() {
    // yield all([
    //     takeEvery(RepositoriesTypes.ADD_REPOSITORY_REQUEST, addRepository)
    // ]);
    return yield all([auth, user, empresa]);
}
