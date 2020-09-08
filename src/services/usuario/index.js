import api from '../api';

export function index(params) {
    return api.get('/users', { params });
}
