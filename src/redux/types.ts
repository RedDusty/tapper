// USER REDUCER
export const SET_USER = 'SET_USER';
export const SET_USER_ID = 'SET_USER_ID';

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

export type setUserType = {
  type: typeof SET_USER;
  payload: userInfoType;
};

export type setUserIdType = {
  type: typeof SET_USER_ID;
  payload: string;
};

export type UserActionsType = setUserType | setUserIdType;

// LOBBY REDUCER

export const SET_LOBBY = 'SET_LOBBY';

export type shapeType = 'square' | 'triangle' | 'circle';

export type lobbyType = {
  id: string;
  nickname: string;
  shape: shapeType;
  players: string;
  rounds: number;
  field: string;
  users: userInfoType[];
};

export type setLobbyType = {
  type: typeof SET_LOBBY;
  payload: lobbyType;
};

export type LobbyActionsType = setLobbyType;
