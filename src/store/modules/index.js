import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import empresa from './empresa/reducer';

export default combineReducers({
    auth,
    user,
    empresa,
});
