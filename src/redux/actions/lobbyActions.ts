import { lobbyType, LOBBY_SET, LobbyActionsType, LOBBY_GET_CODE } from './../types';
import { Dispatch } from 'redux';

export const lobbySet = (lobby: lobbyType) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET, payload: lobby });
  };
};

export const lobbyGetCode = (code: string) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_GET_CODE, payload: code });
  };
};
