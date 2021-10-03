import {
  USER_SET,
  userInfoType,
  UserActionsType,
  USER_SET_ID,
  USER_SET_LOADING,
  USER_SET_SKIN,
  skinType,
  USER_SET_SCORE
} from './../types';
import { Dispatch } from 'redux';

export const userSet = (user: userInfoType) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: USER_SET, payload: user });
  };
};

export const userSetScore = (score: number) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: USER_SET_SCORE, payload: score });
  };
};

export const userSetId = (id: string) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: USER_SET_ID, payload: id });
  };
};
export const userSetLoading = (loading: boolean) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: USER_SET_LOADING, payload: loading });
  };
};

export const userSetSkin = (skin: skinType) => {
  return (dispatch: Dispatch<UserActionsType>) => {
    dispatch({ type: USER_SET_SKIN, payload: skin });
  };
};
