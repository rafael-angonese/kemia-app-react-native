import { combineReducers } from 'redux';

import auth from './auth/reducer';
import empresa from './empresa/reducer';
import local from './local/reducer';
import usuario from './usuario/reducer';

export default combineReducers({
    auth,
    empresa,
    local,
    usuario,
});
