import { lobbyReducer } from './lobbyReducer';
import { userReducer } from './userReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  lobby: lobbyReducer
});

export type RootState = ReturnType<typeof rootReducer>;
