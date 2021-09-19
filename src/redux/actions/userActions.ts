import { USER_SET, userInfoType, UserActionsType, USER_SET_ID } from './../types';
import { Dispatch } from 'redux';

export const userSet = (user: userInfoType) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: USER_SET, payload: user });
  };
};

export const userSetId = (id: string) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: USER_SET_ID, payload: id });
  };
};
