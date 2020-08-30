import api from '../api';

export function index() {
    return api.get('/empresas');
}
