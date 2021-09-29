import { UserActionsType } from './../types';
import { userInfoType } from '../types';

export const initialUserState: userInfoType = {
  nickname: null,
  avatar: null,
  skin: 'standard',
  score: 0,
  firstLogin: 0,
  uid: null,
  id: undefined,
  isLoaded: false,
  skinURL: '',
  banned: false,
  isLeft: false
};

export const userReducer = (state = initialUserState, action: UserActionsType): userInfoType => {
  switch (action.type) {
    case 'USER_SET': {
      const { avatar, firstLogin, nickname, score, skin, uid, id, isLoaded, skinURL, banned, isLeft } = action.payload;
      const newState: userInfoType = {
        avatar,
        firstLogin,
        nickname,
        score,
        skin,
        uid,
        id,
        isLoaded,
        skinURL,
        banned,
        isLeft
      };
      return { ...state, ...newState };
    }
    case 'USER_SET_ID': {
      const id = action.payload;
      return { ...state, id };
    }
    case 'USER_SET_LOADING': {
      const loading = action.payload;
      return { ...state, isLoaded: loading };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
