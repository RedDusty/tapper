import { lobbyType, LOBBY_SET, LobbyActionsType, LOBBY_SET_CODE } from './../types';
import { Dispatch } from 'redux';

export const lobbySet = (lobby: lobbyType) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET, payload: lobby });
  };
};

export const lobbySetCode = (code: string) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_CODE, payload: code });
  };
};
