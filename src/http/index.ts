import axios, { AxiosRequestConfig } from 'axios'

const http = axios.create({
    baseURL: 'http://10.60.6.42:8000',
    timeout: 60000,
})

http.interceptors.response.use((res) => {
    const resBody = res.data
    if (resBody.code != 200) {
        return Promise.reject(resBody)
    }
    return resBody
}, (err) => Promise.reject(err))

export default {
    get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
        return http.get(url, {params, ...config})
    },

    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return http.post(url, data, config)
    }
}