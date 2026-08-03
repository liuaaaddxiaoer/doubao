import http from './index';

export type ResponseType<T = any> = {
  code: number;
  msg: string;
  items: T;
};

export type HomeResponseType = {
    cover: string;
}

export function getHome() {
  return http.get<ResponseType<HomeResponseType[]>>('/home');
}
