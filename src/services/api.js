
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://10.19.14.6:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;