import { lobbyType, SET_LOBBY, LobbyActionsType } from './../types';
import { Dispatch } from 'redux';

export const setLobby = (lobby: lobbyType) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: SET_LOBBY, payload: lobby });
  };
};
