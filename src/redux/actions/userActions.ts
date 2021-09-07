import { SET_USER, userInfoType, UserActionsType, SET_USER_ID } from './../types';
import { Dispatch } from 'redux';

export const setUser = (user: userInfoType) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: SET_USER, payload: user });
  };
};

export const setUserId = (id: string) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: SET_USER_ID, payload: id });
  };
};
