import { gameReducerType, GameActionsType } from './../types';

export const initialGameReducer: gameReducerType = {
  dots: [],
  time: { end: 0, start: 0 },
  replay: [],
  addScore: null,
  decreaseScore: null
};

export const gameReducer = (state = initialGameReducer, action: GameActionsType): gameReducerType => {
  switch (action.type) {
    case 'GAME_SET': {
      const { addScore, decreaseScore, dots, replay, time } = action.payload;
      const newState = {
        addScore,
        decreaseScore,
        dots,
        replay,
        time
      } as gameReducerType;
      return { ...state, ...newState };
    }
    case 'GAME_DOTS_SET': {
      const dots = action.payload;
      return { ...state, dots };
    }
    case 'GAME_REPLAY_SET': {
      const replay = action.payload;
      return { ...state, replay };
    }
    case 'GAME_SCORES_SET': {
      const { addScore, decreaseScore } = action.payload;
      return { ...state, addScore, decreaseScore };
    }
    case 'GAME_TIME_SET': {
      const time = action.payload;
      return { ...state, time };
    }
    default: {
      return { ...state };
    }
  }
};

export default gameReducer;
