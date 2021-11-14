import { GmessageType, GActionsType } from './../types';
import { Dispatch } from 'redux';
import { G_MESSAGES_SET } from '../types';

export const GmessagesSet = (messages: GmessageType[]) => {
  return (dispatch: Dispatch<GActionsType>) => {
    dispatch({ type: G_MESSAGES_SET, payload: messages });
  };
};