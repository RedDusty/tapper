import { lobbyType, LobbyActionsType } from './../types';

export const initialLobbyState: lobbyType = {
  ownerUID: '',
  nickname: '',
  fieldX: '',
  fieldY: '',
  users: [],
  code: '',
  visibility: 'private',
  messages: [],
  inLobbyPlayers: '1',
  maxPlayers: '2',
  isStarted: false,
  startsIn: 10,
};

export const lobbyReducer = (state = initialLobbyState, action: LobbyActionsType): lobbyType => {
  switch (action.type) {
    case 'LOBBY_SET': {
      return { ...state, ...action.payload };
    }
    case 'LOBBY_SET_CODE': {
      const code = action.payload;
      return { ...state, code: code };
    }
    case 'LOBBY_SET_FIELD_X': {
      const fieldX = action.payload;
      const newField = fieldX;
      return { ...state, fieldX: newField };
    }
    case 'LOBBY_SET_FIELD_Y': {
      const fieldY = action.payload;
      const newField = fieldY;
      return { ...state, fieldY: newField };
    }
    case 'LOBBY_SET_MESSAGES': {
      const messages = action.payload;
      return { ...state, messages };
    }
    case 'LOBBY_SET_VISIBILITY': {
      const visibility = action.payload;
      return { ...state, visibility: visibility };
    }
    case 'LOBBY_SET_USERS': {
      const users = action.payload.value;
      return { ...state, users };
    }
    case 'LOBBY_SET_IN_LOBBY_PLAYERS': {
      const inLobbyPlayers = action.payload;
      return { ...state, inLobbyPlayers };
    }
    case 'LOBBY_SET_MAX_PLAYERS': {
      const maxPlayers = action.payload;
      return { ...state, maxPlayers };
    }
    case 'LOBBY_SET_STARTED': {
      const isStarted = action.payload;
      return { ...state, isStarted };
    }
    case 'LOBBY_SET_STARTS_IN': {
      const startsIn = action.payload;
      return { ...state, startsIn };
    }
    default: {
      return { ...state };
    }
  }
};

export default lobbyReducer;
