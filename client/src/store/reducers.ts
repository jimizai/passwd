import { SET_TOKEN, SET_USER_NAME } from './constants';
import { AnyAction } from 'redux';

const INITITIAL_STATE = {
  token: '',
  userName: ''
};

export type defaultState = typeof INITITIAL_STATE;

export default (state = INITITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_USER_NAME:
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};
