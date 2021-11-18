import { GActionsType, globalReducerType } from "../types";

export const initialGlobalReducer: globalReducerType = {
  messages: [],
  userGames: [],
};

export const globalReducer = (
  state = initialGlobalReducer,
  action: GActionsType
): globalReducerType => {
  switch (action.type) {
    case "G_MESSAGES_SET": {
      return { ...state, messages: action.payload };
    }
    case "G_USER_GAMES_SET": {
      return { ...state, userGames: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default globalReducer;
