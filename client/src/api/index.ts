import { get, post, put, del } from './request';

export const getPasswords = (params: { current?: number; page_size?: number }) =>
  get('/passwords', params);

export const createPassword = (params: { key: string; value: string }) =>
  post('/passwords', params);

export const updatePassword = (params: {
  id: number;
  key?: string;
  value?: string;
  length?: number;
}) => put('/passwords/:id', params);

export const delPassword = (params: { id: number }) => del('/passwords/:id', params);

export const login = (params: { email: string; password: string }) => post('/users/login', params);

export const signup = (params: { email: string; password: string; username: string }) =>
  post('/users/signup', params);
