// USER REDUCER
export const USER_SET = "USER_SET";
export const USER_SET_SCORE = "USER_SET_SCORE";
export const USER_SET_ID = "USER_SET_ID";
export const USER_SET_LOADING = "USER_SET_LOADING";
export const USER_SET_LEFT = "USER_SET_LEFT";
export const USER_SET_SKIN = "USER_SET_SKIN";
export const USER_SET_SKIN_COLOR = "USER_SET_SKIN_COLOR";
export const USER_SET_SKIN_BORDER = "USER_SET_SKIN_BORDER";
export const USER_SET_SKIN_BORDER_STYLE = "USER_SET_SKIN_BORDER_STYLE";
export const USER_SET_SKIN_BORDER_COLOR = "USER_SET_SKIN_BORDER_COLOR";
export const USER_SET_SKIN_BORDER_WIDTH = "USER_SET_SKIN_BORDER_WIDTH";

export type skinTypesType = "standard";

export type skinBorderStyleType = "solid" | "dashed" | "dotted" | "double";

export type skinType = {
  type: skinTypesType;
  color: string;
  withBorder: boolean;
  borderColor: string;
  borderStyle: skinBorderStyleType;
  borderWidth: number;
};

export type userInfoType = {
  nickname: string | null;
  avatar: string | null;
  score: number | undefined;
  firstLogin: number;
  uid: string | null;
  id: string | undefined;
  isLoaded?: boolean;
  isLeft?: boolean;
  skin: skinType;
  banned: boolean;
  key: string | null;
};

export type userSetSkin = {
  type: typeof USER_SET_SKIN;
  payload: skinType;
};

export type userSetType = {
  type: typeof USER_SET;
  payload: userInfoType;
};

export type userSetIdType = {
  type: typeof USER_SET_ID;
  payload: string;
};
export type userSetLoadingType = {
  type: typeof USER_SET_LOADING;
  payload: boolean;
};
export type userSetLeftType = {
  type: typeof USER_SET_LEFT;
  payload: boolean;
};

export type userSetScoreType = {
  type: typeof USER_SET_SCORE;
  payload: number;
};

export type UserActionsType =
  | userSetType
  | userSetIdType
  | userSetLoadingType
  | userSetSkin
  | userSetScoreType
  | userSetLeftType;

// LOBBY REDUCER

export const LOBBY_SET = "LOBBY_SET";
export const LOBBY_SET_CODE = "LOBBY_SET_CODE";
export const LOBBY_SET_FIELD_X = "LOBBY_SET_FIELD_X";
export const LOBBY_SET_FIELD_Y = "LOBBY_SET_FIELD_Y";
export const LOBBY_SET_USERS = "LOBBY_SET_USERS";
export const LOBBY_SET_IN_LOBBY_PLAYERS = "LOBBY_SET_IN_LOBBY_PLAYERS";
export const LOBBY_SET_MAX_PLAYERS = "LOBBY_SET_MAX_PLAYERS";
export const LOBBY_SET_MESSAGES = "LOBBY_SET_MESSAGES";
export const LOBBY_SET_VISIBILITY = "LOBBY_SET_VISIBILITY";
export const LOBBY_SET_STARTED = "LOBBY_SET_STARTED";
export const LOBBY_SET_STARTS_IN = "LOBBY_SET_STARTS_IN";
export const LOBBY_SET_BOT = "LOBBY_SET_BOT";
export const LOBBY_SET_BOT_DIFFICULTY = "LOBBY_SET_BOT_DIFFICULTY";

type optionType =
  | "setVisibility"
  | "setFieldX"
  | "setFieldY"
  | "setInLobbyPlayers"
  | "setMaxPlayers"
  | "setBot"
  | "setDifficulty";

export type lobbySocketOptionsType = {
  code: string;
  option: string | visibilityType;
  type: optionType;
};

export type lobbyOptionsType = {
  code: string;
  ownerUID: string;
  [key: string]: string | visibilityType;
  option: optionType;
};

type actionType =
  | "userKick"
  | "userJoin"
  | "userLeave"
  | "userOwner"
  | "userLoaded"
  | "userSkinChange"
  | "usersGet";

export type lobbyUsersType = {
  code: string;
  ownerUID: string;
  action: actionType;
  user: userInfoType;
};

export type lobbyUsersGetType = {
  type: actionType;
  value: userInfoType[];
  lobby: lobbyType;
  uid: string;
};

export type messageType = {
  avatar: string;
  id: string;
  nickname: string;
  uid: string;
  message: string;
  time: number;
  code: string;
};

export type visibilityType = "public" | "private" | "game";

export type botDifficultyType =
  | "easy"
  | "medium"
  | "hard"
  | "extreme"
  | "tapper"
  | "cheater-1"
  | "cheater-2"
  | "cheater-3";

export type botType = {
  isTurned: boolean;
  difficulty: botDifficultyType;
};

export type lobbyType = {
  ownerUID: string;
  nickname: string;
  inLobbyPlayers: string;
  maxPlayers: string;
  fieldX: string;
  fieldY: string;
  messages: messageType[];
  users: userInfoType[];
  code: string;
  visibility: visibilityType;
  bot: botType;
  isStarted: boolean;
  startsIn: number;
};

export type lobbySetStartsInType = {
  type: typeof LOBBY_SET_STARTS_IN;
  payload: number;
};

export type lobbySetStartedType = {
  type: typeof LOBBY_SET_STARTED;
  payload: boolean;
};

export type lobbySetBotType = {
  type: typeof LOBBY_SET_BOT;
  payload: boolean;
};

export type lobbySetBotDifficultyType = {
  type: typeof LOBBY_SET_BOT_DIFFICULTY;
  payload: botDifficultyType;
};

export type lobbySetType = {
  type: typeof LOBBY_SET;
  payload: lobbyType;
};

export type lobbySetCodeType = {
  type: typeof LOBBY_SET_CODE;
  payload: string;
};

export type lobbySetFieldXType = {
  type: typeof LOBBY_SET_FIELD_X;
  payload: string;
};

export type lobbySetFieldYType = {
  type: typeof LOBBY_SET_FIELD_Y;
  payload: string;
};

export type lobbySetUsersType = {
  type: typeof LOBBY_SET_USERS;
  payload: userInfoType[];
};
export type lobbySetInLobbyPlayersType = {
  type: typeof LOBBY_SET_IN_LOBBY_PLAYERS;
  payload: string;
};

export type lobbySetMaxPlayersType = {
  type: typeof LOBBY_SET_MAX_PLAYERS;
  payload: string;
};

export type lobbySetMessagesType = {
  type: typeof LOBBY_SET_MESSAGES;
  payload: messageType[];
};
export type lobbySetVisibilityType = {
  type: typeof LOBBY_SET_VISIBILITY;
  payload: visibilityType;
};

export type LobbyActionsType =
  | lobbySetType
  | lobbySetCodeType
  | lobbySetFieldXType
  | lobbySetFieldYType
  | lobbySetMaxPlayersType
  | lobbySetMessagesType
  | lobbySetVisibilityType
  | lobbySetInLobbyPlayersType
  | lobbySetUsersType
  | lobbySetStartedType
  | lobbySetStartsInType
  | lobbySetBotType
  | lobbySetBotDifficultyType;

// GAME REDUCER;

export const GAME_SET = "GAME_SET";
export const GAME_DOTS_SET = "GAME_DOTS_SET";
export const GAME_TIME_SET = "GAME_TIME_SET";
export const GAME_REPLAY_SET = "GAME_REPLAY_SET";
export const GAME_SCORES_SET = "GAME_SCORES_SET";

export type dotType = {
  posX: number;
  posY: number;
  user: userInfoType | undefined;
  index: number;
};

export type replayType = {
  user: userInfoType;
  index: number;
  time: number;
};

export type timeType = {
  start: number;
  end: number;
};

export type scoreType = {
  user: userInfoType;
  score: number;
  scoreChange: "add" | "decrease";
};

export type gameReducerType = {
  dots: dotType[];
  time: timeType;
  replay: replayType[];
  addScore: scoreType[] | null;
  decreaseScore: scoreType[] | null;
};

export type gameSetType = {
  type: typeof GAME_SET;
  payload: gameReducerType;
};

export type gameTimeSetType = {
  type: typeof GAME_TIME_SET;
  payload: timeType;
};

export type gameReplaySetType = {
  type: typeof GAME_REPLAY_SET;
  payload: replayType[];
};

export type gameScoresSetType = {
  type: typeof GAME_SCORES_SET;
  payload: {
    addScore: scoreType[];
    decreaseScore: scoreType[];
  };
};

export type gameDotsSetType = {
  type: typeof GAME_DOTS_SET;
  payload: dotType[];
};

export type GameActionsType =
  | gameSetType
  | gameDotsSetType
  | gameScoresSetType
  | gameReplaySetType
  | gameTimeSetType;

export const G_MESSAGES_SET = "G_MESSAGES_SET";

export type GmessageType = {
  avatar: string | null;
  id: string;
  nickname: string | null;
  uid: string | null;
  message: string;
  time: number;
};

export type globalReducerType = {
  messages: GmessageType[];
};

export type GmessagesSetType = {
  type: typeof G_MESSAGES_SET;
  payload: GmessageType[];
};

export type GActionsType = GmessagesSetType;
