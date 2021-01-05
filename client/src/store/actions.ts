import * as actionTypes from './constants';
import { Dispatch } from 'redux';
import { defaultState } from './reducers';
import { MessageType } from '../enums';

export const setToken = (token: string) => ({
  type: actionTypes.SET_TOKEN,
  payload: token
});

export const setUserName = (username: string) => ({
  type: actionTypes.SET_USER_NAME,
  payload: username
});

export const setMessage = (message: string) => ({
  type: actionTypes.SET_GLOBAL_MESSGAE,
  payload: message
});

export const setType = (type: MessageType) => ({
  type: actionTypes.SET_GLOBAL_TYPE,
  payload: type
});

export const setUserInfo = ({ token, username }: { token: string; username: string }) => {
  return (dispatch: Dispatch) => {
    dispatch(setToken(token));
    dispatch(setUserName(username));
    if (token && username) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    }
  };
};

export const syncUserInfo = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem('token') || '';
    const username = localStorage.getItem('username') || '';
    dispatch(setUserInfo({ token, username }));
  };
};

export const setGlobalMessage = (params: { message: string; type: MessageType }) => {
  return (dispatch: Dispatch, getState: () => defaultState) => {
    const state = getState();
    if ((!state.message && params.message) || !params.message) {
      dispatch(setType(params.type));
      dispatch(setMessage(params.message));
    }
  };
};
