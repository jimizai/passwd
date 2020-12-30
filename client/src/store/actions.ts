import { SET_TOKEN } from './constants';

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token
});
