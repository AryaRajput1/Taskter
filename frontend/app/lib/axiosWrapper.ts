import axios from 'axios'

const BASE_BACKENDURL = import.meta.VITE_BASE_BE_URL || 'http://localhost:5000/api/v1'
const axiosWrapper = axios.create({
    baseURL: BASE_BACKENDURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosWrapper.interceptors.request.use(async (config) => {
    return config
})

axiosWrapper.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        window.dispatchEvent(new Event('force-logout'))
    }

    return Promise.reject(error)
})

export default axiosWrapper