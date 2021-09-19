import { UserActionsType } from './../types';
import { userInfoType } from '../types';

export const initialUserState: userInfoType = {
  nickname: 'Loading',
  avatar: '',
  skin: 'standard',
  rank: 0,
  firstLogin: 0,
  uid: '',
  id: undefined
};

export const userReducer = (state = initialUserState, action: UserActionsType): userInfoType => {
  switch (action.type) {
    case 'USER_SET': {
      const { avatar, firstLogin, nickname, rank, skin, uid, id } = action.payload;
      const newState: userInfoType = {
        avatar,
        firstLogin,
        nickname,
        rank,
        skin,
        uid,
        id
      };
      return { ...state, ...newState };
    }
    case 'USER_SET_ID': {
      const id = action.payload;
      return { ...state, id };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
