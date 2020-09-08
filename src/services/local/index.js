import api from '../api';

export function index(params) {
    return api.get('/locais', { params });
}

export async function store(params) {
    return api.post('/locais/store', params)
}

export async function update(params) {
    return api.put('/locais/' + params.id, params)
}

export async function destroy(params) {
    return api.delete('/locais/' + params)
}
