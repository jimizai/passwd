import * as actionTypes from './constants';
import { Dispatch } from 'redux';
import { defaultState } from './reducers';

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

export const setUserInfo = ({ token, username }: { token: string; username: string }) => {
  return (dispatch: Dispatch) => {
    dispatch(setToken(token));
    dispatch(setUserName(username));
  };
};

export const setGlobalMessage = (message: string) => {
  return (dispatch: Dispatch, getState: () => defaultState) => {
    const state = getState();
    if ((!state.message && message) || !message) {
      dispatch(setMessage(message));
    }
  };
};
