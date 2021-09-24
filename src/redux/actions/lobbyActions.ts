import {
  lobbyType,
  LOBBY_SET,
  LobbyActionsType,
  LOBBY_SET_CODE,
  shapeType,
  LOBBY_SET_SHAPE,
  LOBBY_SET_ROUNDS,
  LOBBY_SET_FIELD_X,
  LOBBY_SET_FIELD_Y,
  messageType,
  LOBBY_SET_MESSAGES,
  LOBBY_SET_VISIBILITY,
  LOBBY_SET_MAX_PLAYERS,
  LOBBY_SET_IN_LOBBY_PLAYERS,
  LOBBY_SET_USERS,
  lobbyUsersGetType
} from './../types';
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

export const lobbySetFieldX = (fieldX: string) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_FIELD_X, payload: fieldX });
  };
};
export const lobbySetFieldY = (fieldY: string) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_FIELD_Y, payload: fieldY });
  };
};
export const lobbySetRounds = (rounds: string) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_ROUNDS, payload: rounds });
  };
};
export const lobbySetShape = (shape: shapeType) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_SHAPE, payload: shape });
  };
};
export const lobbySetMessages = (messages: messageType[]) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_MESSAGES, payload: messages });
  };
};
export const lobbySetVisibility = (visibility: boolean) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_VISIBILITY, payload: visibility });
  };
};
export const lobbySetUsers = (lobby: lobbyUsersGetType) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_USERS, payload: lobby });
  };
};
export const lobbySetinLobbyPlayers = (inLobbyPlayers: string) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_IN_LOBBY_PLAYERS, payload: inLobbyPlayers });
  };
};
export const lobbySetMaxPlayers = (maxPlayers: string) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_MAX_PLAYERS, payload: maxPlayers });
  };
};
