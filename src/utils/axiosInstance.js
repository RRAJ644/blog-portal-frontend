import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL
console.log(url, '====url')
const axiosInstance = axios.create({
  baseURL: url,
  timeout: 60000,
  headers: {
    Authorization: JSON.parse(localStorage.getItem('token')),
    'Access-Control-Allow-Origin': '*', // TODO: add origin domain here
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
})

export default axiosInstance
