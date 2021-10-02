import { lobbyReducer } from './lobbyReducer';
import { userReducer } from './userReducer';
import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  lobby: lobbyReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
