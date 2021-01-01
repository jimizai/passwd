import { SET_TOKEN, SET_USER_NAME } from './constants';
import { Dispatch } from 'redux';

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token
});

export const setUserName = (username: string) => ({
  type: SET_USER_NAME,
  payload: username
});

export const setUserInfo = ({ token, username }: { token: string; username: string }) => {
  return (dispatch: Dispatch) => {
    dispatch(setToken(token));
    dispatch(setUserName(username));
  };
};
