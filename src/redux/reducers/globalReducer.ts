import { GActionsType, globalReducerType } from "../types";

export const initialGlobalReducer: globalReducerType = {
  messages: [],
};

export const globalReducer = (
  state = initialGlobalReducer,
  action: GActionsType
): globalReducerType => {
  switch (action.type) {
    case "G_MESSAGES_SET": {
      return { ...state, messages: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default globalReducer;
