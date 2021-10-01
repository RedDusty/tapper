// USER REDUCER
export const USER_SET = 'USER_SET';
export const USER_SET_ID = 'USER_SET_ID';
export const USER_SET_LOADING = 'USER_SET_LOADING';
export const USER_SET_SKIN = 'USER_SET_SKIN';
export const USER_SET_SKIN_COLOR = 'USER_SET_SKIN_COLOR';
export const USER_SET_SKIN_BORDER = 'USER_SET_SKIN_BORDER';
export const USER_SET_SKIN_BORDER_STYLE = 'USER_SET_SKIN_BORDER_STYLE';
export const USER_SET_SKIN_BORDER_COLOR = 'USER_SET_SKIN_BORDER_COLOR';
export const USER_SET_SKIN_BORDER_WIDTH = 'USER_SET_SKIN_BORDER_WIDTH';

export type skinTypesType = 'standard';

export type skinBorderStyleType = 'solid' | 'dashed' | 'dotted' | 'double';

export type skinType = {
  skin: skinTypesType;
  skinColor: string;
  skinBorder: boolean;
  skinBorderStyle: skinBorderStyleType;
  skinBorderColor: string;
  skinBorderWidth: number;
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
  skinOptions: skinType;
  banned: boolean;
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

export type UserActionsType = userSetType | userSetIdType | userSetLoadingType | userSetSkin;

// LOBBY REDUCER

export const LOBBY_SET = 'LOBBY_SET';
export const LOBBY_SET_CODE = 'LOBBY_SET_CODE';
export const LOBBY_SET_FIELD_X = 'LOBBY_SET_FIELD_X';
export const LOBBY_SET_FIELD_Y = 'LOBBY_SET_FIELD_Y';
export const LOBBY_SET_ROUNDS = 'LOBBY_SET_ROUNDS';
export const LOBBY_SET_SHAPE = 'LOBBY_SET_SHAPE';
export const LOBBY_SET_USERS = 'LOBBY_SET_USERS';
export const LOBBY_SET_IN_LOBBY_PLAYERS = 'LOBBY_SET_IN_LOBBY_PLAYERS';
export const LOBBY_SET_MAX_PLAYERS = 'LOBBY_SET_MAX_PLAYERS';
export const LOBBY_SET_MESSAGES = 'LOBBY_SET_MESSAGES';
export const LOBBY_SET_VISIBILITY = 'LOBBY_SET_VISIBILITY';

export type shapeType = 'square' | 'triangle' | 'circle' | 'random';

type optionType =
  | 'setVisibility'
  | 'setShape'
  | 'setRounds'
  | 'setFieldX'
  | 'setFieldY'
  | 'setInLobbyPlayers'
  | 'setMaxPlayers';

export type lobbySocketOptionsType = {
  code: string;
  option: string | visibilityType | shapeType;
  type: optionType;
};

export type lobbyOptionsType = {
  code: string;
  ownerUID: string;
  [key: string]: string | visibilityType;
  option: optionType;
};

type actionType = 'userKick' | 'userJoin' | 'userLeave' | 'hostChange' | 'userLoaded';

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

export type visibilityType = 'public' | 'private' | 'game';

export type lobbyType = {
  ownerUID: string;
  nickname: string;
  shape: shapeType;
  inLobbyPlayers: string;
  maxPlayers: string;
  rounds: string;
  fieldX: string;
  fieldY: string;
  messages: messageType[];
  users: userInfoType[];
  code: string;
  visibility: visibilityType;
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

export type lobbySetRoundsType = {
  type: typeof LOBBY_SET_ROUNDS;
  payload: string;
};

export type lobbySetShapeType = {
  type: typeof LOBBY_SET_SHAPE;
  payload: shapeType;
};

export type lobbySetUsersType = {
  type: typeof LOBBY_SET_USERS;
  payload: lobbyUsersGetType;
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
  | lobbySetRoundsType
  | lobbySetShapeType
  | lobbySetMaxPlayersType
  | lobbySetMessagesType
  | lobbySetVisibilityType
  | lobbySetInLobbyPlayersType
  | lobbySetUsersType;
