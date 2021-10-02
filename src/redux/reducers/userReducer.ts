import { UserActionsType } from './../types';
import { userInfoType } from '../types';

export const initialUserState: userInfoType = {
  nickname: null,
  avatar: null,
  score: 0,
  firstLogin: 0,
  uid: null,
  id: undefined,
  isLoaded: false,
  key: '',
  skinOptions: {
    skin: 'standard',
    skinBorder: true,
    skinBorderColor: 'border-orange-600',
    skinBorderStyle: 'solid',
    skinBorderWidth: 2,
    skinColor: 'bg-red-300'
  },
  banned: false,
  isLeft: false
};

export const userReducer = (state = initialUserState, action: UserActionsType): userInfoType => {
  switch (action.type) {
    case 'USER_SET': {
      const { avatar, firstLogin, nickname, score, uid, id, isLoaded, skinOptions, banned, isLeft, key } =
        action.payload;
      const newState: userInfoType = {
        avatar,
        firstLogin,
        nickname,
        score,
        uid,
        id,
        isLoaded,
        skinOptions,
        banned,
        isLeft,
        key
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
    case 'USER_SET_SKIN': {
      const skinOptions = action.payload;
      return { ...state, skinOptions };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
