import BaseHttp from './http';
import axios, { AxiosRequestConfig } from 'axios';
import HandlerExceptions from './handleExceptions';

axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  (conf: AxiosRequestConfig) => {
    conf.headers.authentication = '';
    return conf;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  // @ts-ignore
  response => HandlerExceptions(response),
  error => Promise.reject(error)
);

export const createRequest = () => new BaseHttp(axios);

export const get = createRequest().get;
export const post = createRequest().post;
export const del = createRequest().delete;
export const put = createRequest().put;
