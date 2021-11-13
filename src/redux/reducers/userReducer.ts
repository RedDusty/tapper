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
  skin: {
    type: 'standard',
    withBorder: true,
    borderColor: 'lime-600',
    borderStyle: 'solid',
    borderWidth: 2,
    color: 'orange-300',
    only2Colors: false
  },
  banned: false,
  isLeft: false
};

export const userReducer = (state = initialUserState, action: UserActionsType): userInfoType => {
  switch (action.type) {
    case 'USER_SET': {
      const { avatar, firstLogin, nickname, score, uid, id, isLoaded, skin, banned, isLeft, key } =
        action.payload;
      const newState: userInfoType = {
        avatar,
        firstLogin,
        nickname,
        score,
        uid,
        id,
        isLoaded,
        skin,
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
      const skin = action.payload;
      return { ...state, skin };
    }
    case 'USER_SET_SCORE': {
      const score = action.payload;
      return { ...state, score };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
