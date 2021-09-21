import { lobbyType, LobbyActionsType } from './../types';

export const initialLobbyState: lobbyType = {
  ownerID: '',
  nickname: '',
  shape: 'square',
  rounds: '0',
  fieldX: '',
  fieldY: '',
  users: [],
  code: '',
  isPrivate: true,
  messages: [],
  inLobbyPlayers: '1',
  maxPlayers: '2'
};

export const lobbyReducer = (state = initialLobbyState, action: LobbyActionsType): lobbyType => {
  switch (action.type) {
    case 'LOBBY_SET': {
      const { fieldX, fieldY, ownerID, nickname, inLobbyPlayers, maxPlayers, messages, rounds, shape, users, code, isPrivate } =
        action.payload;
      const newState: lobbyType = {
        fieldX,
        fieldY,
        ownerID,
        nickname,
        inLobbyPlayers,
        maxPlayers,
        messages,
        rounds,
        shape,
        users,
        code,
        isPrivate
      };
      return { ...state, ...newState };
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
    case 'LOBBY_SET_ROUNDS': {
      const rounds = action.payload;
      return { ...state, rounds };
    }
    case 'LOBBY_SET_SHAPE': {
      const shape = action.payload;
      return { ...state, shape };
    }
    default: {
      return { ...state };
    }
  }
};

export default lobbyReducer;
