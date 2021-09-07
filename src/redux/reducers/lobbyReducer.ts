import { lobbyType, LobbyActionsType } from './../types';

export const initialLobbyState: lobbyType = {
  id: '',
  nickname: '',
  shape: 'square',
  players: '',
  rounds: 0,
  field: '',
  users: []
};

export const lobbyReducer = (state = initialLobbyState, action: LobbyActionsType): lobbyType => {
  switch (action.type) {
    case 'SET_LOBBY': {
      const { field, id, nickname, players, rounds, shape, users } = action.payload;
      const newState: lobbyType = {
        field,
        id,
        nickname,
        players,
        rounds,
        shape,
        users
      };
      return { ...state, ...newState };
    }
    default: {
      return { ...state };
    }
  }
};

export default lobbyReducer;
