import {
  GameActionsType,
  dotType,
  GAME_DOTS_SET,
  GAME_TIME_SET,
  replayType,
  GAME_REPLAY_SET,
  GAME_SCORES_SET,
  scoreType,
  timeType
} from './../types';
import { Dispatch } from 'redux';

export const gameDotsSet = (dots: dotType[]) => {
  return (dispatch: Dispatch<GameActionsType>) => {
    dispatch({ type: GAME_DOTS_SET, payload: dots });
  };
};
export const gameTimeSet = (time: timeType) => {
  return (dispatch: Dispatch<GameActionsType>) => {
    dispatch({ type: GAME_TIME_SET, payload: time });
  };
};
export const gameReplaySet = (replay: replayType[]) => {
  return (dispatch: Dispatch<GameActionsType>) => {
    dispatch({ type: GAME_REPLAY_SET, payload: replay });
  };
};
export const gameScoresSet = (scores: { addScore: scoreType[]; decreaseScore: scoreType[] }) => {
  return (dispatch: Dispatch<GameActionsType>) => {
    dispatch({ type: GAME_SCORES_SET, payload: scores });
  };
};
