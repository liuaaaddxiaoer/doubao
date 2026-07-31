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


function wrapPromise<T>(p: Promise<T>) : Promise<[any, T | null]> {
    return p
    .then((data) => [null, data] as [any, T])
    .catch((err) => [err, null] as [any, null])
}

export default {
    get<T>(url: string, params?: any, config?: AxiosRequestConfig){
        return wrapPromise<T>(http.get(url, {params, ...config}))
    },

    post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return wrapPromise<T>(http.post(url, data, config))
    }
}