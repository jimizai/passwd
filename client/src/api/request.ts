import BaseHttp from './http';
import axios, { AxiosRequestConfig } from 'axios';
import HandlerExceptions from './handleExceptions';
import store from '../store';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/api';

axios.interceptors.request.use(
  (conf: AxiosRequestConfig) => {
    conf.headers.authorization = `Bearer ${store.getState().token}`;
    return conf;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  // @ts-ignore
  response => HandlerExceptions(response),
  error => Promise.reject(error)
);

const createRequest = () => {
  return new BaseHttp(axios);
};

const bindRequest = <T extends keyof BaseHttp, U extends BaseHttp[T]>(method: T): U => {
  const request = createRequest();
  return (request[method] as any).bind(request);
};

export const get = bindRequest('get');
export const post = bindRequest('post');
export const put = bindRequest('put');
export const del = bindRequest('delete');
