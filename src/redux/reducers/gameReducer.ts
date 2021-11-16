import { gameReducerType, GameActionsType } from "./../types";

export const initialGameReducer: gameReducerType = {
  dots: [],
  time: { end: 0, start: 0 },
  replay: [],
  addScore: null,
  decreaseScore: null,
};

export const gameReducer = (
  state = initialGameReducer,
  action: GameActionsType
): gameReducerType => {
  switch (action.type) {
    case "GAME_SET": {
      return { ...state, ...action.payload };
    }
    case "GAME_DOTS_SET": {
      return { ...state, dots: action.payload };
    }
    case "GAME_DOT_SET": {
      const dots = state.dots.slice(0);
      dots[action.payload.index].user = action.payload.user
      return { ...state, dots: dots };
    }
    case "GAME_REPLAY_SET": {
      return { ...state, replay: action.payload };
    }
    case "GAME_SCORES_SET": {
      return {
        ...state,
        addScore: action.payload.addScore,
        decreaseScore: action.payload.decreaseScore,
      };
    }
    case "GAME_TIME_SET": {
      return { ...state, time: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default gameReducer;
