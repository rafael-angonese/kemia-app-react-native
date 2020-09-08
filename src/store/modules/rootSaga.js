import { all } from 'redux-saga/effects';

import auth from './auth/saga';
import empresa from './empresa/saga';
import local from './local/saga';
import usuario from './usuario/saga';

// export default function* rootSaga() {
//   return yield all([auth]);
// }

export default function* rootSaga() {
    // yield all([
    //     takeEvery(RepositoriesTypes.ADD_REPOSITORY_REQUEST, addRepository)
    // ]);
    return yield all([auth, empresa, local, usuario]);
}
