import api from '../api';

export function signin(username, senha) {
    return api.post('/authenticate', { username, senha });
}
