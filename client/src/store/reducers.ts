import {
  SET_TOKEN,
  SET_USER_NAME,
  SET_GLOBAL_MESSGAE,
  SET_GLOBAL_VISIBLE,
  SET_GLOBAL_TYPE
} from './constants';
import { AnyAction } from 'redux';

const INITITIAL_STATE = {
  token: '',
  userName: '',
  visible: false,
  message: '',
  type: ''
};

export type defaultState = typeof INITITIAL_STATE;

export default (state = INITITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_USER_NAME:
      return { ...state, userName: action.payload };
    case SET_GLOBAL_VISIBLE:
      return { ...state, visible: action.payload };
    case SET_GLOBAL_MESSGAE:
      return { ...state, message: action.payload };
    case SET_GLOBAL_TYPE:
      return { ...state, type: action.payload };
    default:
      return state;
  }
};
