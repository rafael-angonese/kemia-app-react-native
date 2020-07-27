import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    //baseURL: 'http://localhost:3333',
    //baseURL: 'http:18.123.68.123:3333',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api