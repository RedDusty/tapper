import { lobbyType, LobbyActionsType } from './../types';

export const initialLobbyState: lobbyType = {
  ownerID: '',
  nickname: '',
  shape: 'square',
  rounds: 0,
  field: '',
  users: [],
  code: '',
  isPrivate: true,
  messages: [],
  inLobbyPlayers: 1,
  maxPlayers: 2
};

export const lobbyReducer = (state = initialLobbyState, action: LobbyActionsType): lobbyType => {
  switch (action.type) {
    case 'LOBBY_SET': {
      const { field, ownerID, nickname, inLobbyPlayers, maxPlayers, messages, rounds, shape, users, code, isPrivate } =
        action.payload;
      const newState: lobbyType = {
        field,
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

      console.log(code);

      return { ...state, code: code };
    }
    default: {
      return { ...state };
    }
  }
};

export default lobbyReducer;
