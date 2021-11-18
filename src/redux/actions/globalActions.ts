import { GmessageType, GActionsType, G_USER_GAMES_SET, UGType } from './../types';
import { Dispatch } from 'redux';
import { G_MESSAGES_SET } from '../types';

export const GmessagesSet = (messages: GmessageType[]) => {
  return (dispatch: Dispatch<GActionsType>) => {
    dispatch({ type: G_MESSAGES_SET, payload: messages });
  };
};

export const GuserGamesSet = (userGames: UGType[]) => {
  return (dispatch: Dispatch<GActionsType>) => {
    dispatch({ type: G_USER_GAMES_SET, payload: userGames });
  };
};