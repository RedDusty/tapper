import {
  lobbyType,
  LOBBY_SET,
  LobbyActionsType,
  LOBBY_SET_CODE,
  LOBBY_SET_FIELD_X,
  LOBBY_SET_FIELD_Y,
  messageType,
  LOBBY_SET_MESSAGES,
  LOBBY_SET_VISIBILITY,
  LOBBY_SET_MAX_PLAYERS,
  LOBBY_SET_IN_LOBBY_PLAYERS,
  LOBBY_SET_USERS,
  visibilityType,
  LOBBY_SET_STARTED,
  LOBBY_SET_STARTS_IN,
  userInfoType,
  LOBBY_SET_BOT,
  LOBBY_SET_BOT_DIFFICULTY,
  botDifficultyType,
} from "./../types";
import { Dispatch } from "redux";

export const lobbySet = (lobby: lobbyType) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET, payload: lobby });
  };
};

export const lobbySetStartsIn = (startsIn: number) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_STARTS_IN, payload: startsIn });
  };
};

export const lobbySetBot = (bot: boolean) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_BOT, payload: bot });
  };
};

export const lobbySetBotDifficulty = (bot: botDifficultyType) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_BOT_DIFFICULTY, payload: bot });
  };
};

export const lobbySetStarted = (isStarted: boolean) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_STARTED, payload: isStarted });
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
export const lobbySetMessages = (messages: messageType[]) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_MESSAGES, payload: messages });
  };
};
export const lobbySetVisibility = (visibility: visibilityType) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_VISIBILITY, payload: visibility });
  };
};
export const lobbySetUsers = (users: userInfoType[]) => {
  return (dispatch: Dispatch<LobbyActionsType>) => {
    dispatch({ type: LOBBY_SET_USERS, payload: users });
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
