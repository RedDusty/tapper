// USER REDUCER
export const USER_SET = 'USER_SET';
export const USER_SET_ID = 'USER_SET_ID';

export type skinType = 'standard';

export type userInfoType = {
  nickname: string;
  avatar: string;
  skin: skinType;
  rank: number;
  firstLogin: number;
  uid: string;
  id: string | undefined;
};

export type userSetType = {
  type: typeof USER_SET;
  payload: userInfoType;
};

export type userSetIdType = {
  type: typeof USER_SET_ID;
  payload: string;
};

export type UserActionsType = userSetType | userSetIdType;

// LOBBY REDUCER

export const LOBBY_SET = 'LOBBY_SET';
export const LOBBY_GET_CODE = 'LOBBY_GET_CODE';

export type shapeType = 'square' | 'triangle' | 'circle';

export type lobbyType = {
  ownerID: string;
  nickname: string;
  shape: shapeType;
  players: string;
  rounds: number;
  field: string;
  users: userInfoType[];
  code: string;
};

export type lobbySetType = {
  type: typeof LOBBY_SET;
  payload: lobbyType;
};

export type lobbyGetCodeType = {
  type: typeof LOBBY_GET_CODE;
  payload: string;
};

export type LobbyActionsType = lobbySetType | lobbyGetCodeType;
