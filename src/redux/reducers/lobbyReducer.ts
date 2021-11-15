import { lobbyType, LobbyActionsType } from "./../types";

export const initialLobbyState: lobbyType = {
  ownerUID: "",
  nickname: "",
  fieldX: "",
  fieldY: "",
  users: [],
  code: "",
  visibility: "private",
  messages: [],
  inLobbyPlayers: "1",
  maxPlayers: "2",
  isStarted: false,
  startsIn: 10,
  bot: {
    isTurned: false,
    difficulty: "medium",
    speed: "6",
  },
};

export const lobbyReducer = (
  state = initialLobbyState,
  action: LobbyActionsType
): lobbyType => {
  switch (action.type) {
    case "LOBBY_SET": {
      return { ...state, ...action.payload };
    }
    case "LOBBY_SET_CODE": {
      return { ...state, code: action.payload };
    }
    case "LOBBY_SET_FIELD_X": {
      return { ...state, fieldX: action.payload };
    }
    case "LOBBY_SET_FIELD_Y": {
      return { ...state, fieldY: action.payload };
    }
    case "LOBBY_SET_MESSAGES": {
      return { ...state, messages: action.payload };
    }
    case "LOBBY_SET_VISIBILITY": {
      return { ...state, visibility: action.payload };
    }
    case "LOBBY_SET_USERS": {
      return { ...state, users: action.payload };
    }
    case "LOBBY_SET_IN_LOBBY_PLAYERS": {
      return { ...state, inLobbyPlayers: action.payload };
    }
    case "LOBBY_SET_MAX_PLAYERS": {
      return { ...state, maxPlayers: action.payload };
    }
    case "LOBBY_SET_STARTED": {
      return { ...state, isStarted: action.payload };
    }
    case "LOBBY_SET_STARTS_IN": {
      return { ...state, startsIn: action.payload };
    }
    case "LOBBY_SET_BOT": {
      return { ...state, bot: { ...state.bot, isTurned: action.payload } };
    }
    case "LOBBY_SET_BOT_DIFFICULTY": {
      const difficulty = action.payload;
      let speed = "";
      switch (difficulty) {
        case "easy":
          speed = "4";
          break;
        case "medium":
          speed = "6";
          break;
        case "hard":
          speed = "8";
          break;
        case "extreme":
          speed = "18";
          break;
        case "tapper":
          speed = "21";
          break;
        case "cheater-1":
          speed = "24";
          break;
        case "cheater-2":
          speed = "27";
          break;
        case "cheater-3":
          speed = "30";
          break;
        case "custom":
          break;
        default:
          speed = "0";
          break;
      }
      return {
        ...state,
        bot: { ...state.bot, difficulty: difficulty, speed: speed },
      };
    }
    case "LOBBY_SET_BOT_SPEED": {
      return { ...state, bot: { ...state.bot, speed: action.payload } };
    }
    default: {
      return { ...state };
    }
  }
};

export default lobbyReducer;
