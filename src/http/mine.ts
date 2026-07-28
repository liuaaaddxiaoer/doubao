import http from './index'

export type ResponseType<T = any> = {
    code: number,
    msg: string,
    data: T
}

export function getAllCreations() {
    return http.get<ResponseType<string[]>>('/kvm')
} 