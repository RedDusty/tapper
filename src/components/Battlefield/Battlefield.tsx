import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameDotsSet, gameReplaySet, gameScoresSet, gameTimeSet } from '../../redux/actions/gameActions';
import { lobbySetUsers } from '../../redux/actions/lobbyActions';
import { userSetLoading } from '../../redux/actions/userActions';
import { dotType, lobbyUsersGetType } from '../../redux/types';
import { useTypedSelector } from '../../redux/useTypedSelector';
import socket from '../../socketio';
import Dot from './Dot';
import LoadingWindow from './LoadingWindow';

function Battlefield({ dataGained }: { dataGained: boolean }) {
  const [dotSize, setDotSize] = useState<number>(12);
  const [htmlField, setHtmlField] = useState<JSX.Element[]>([]);
  const [canStart, setStart] = useState<boolean>(false);

  const { user } = useTypedSelector((state) => state);
  const { lobby } = useTypedSelector((state) => state);
  const startsIn = useTypedSelector((state) => state.lobby.startsIn);
  const dispatch = useDispatch();

  const setField = (dots: dotType[]) => {
    let tempField: JSX.Element[] = [];

    dots.forEach((dot, index) => tempField.push(<Dot index={index} user={dot.user} />));

    setHtmlField(tempField);
  };

  useEffect(() => {
    if (canStart === false && dataGained === true) {
      if (window.innerWidth > window.innerHeight) {
        setDotSize((window.innerHeight - 64) / Number(lobby.fieldX));
      } else {
        setDotSize((window.innerWidth - 64) / Number(lobby.fieldX));
      }
      const fieldSize = Number(Number(lobby.fieldX) * Number(lobby.fieldY));

      for (let index = 0; index < fieldSize; index++) {
        if (index === fieldSize - 1) {
          setTimeout(() => {
            socket.emit('USER_LOADED', { user: user, isLoaded: true, lobby: lobby });
            dispatch(userSetLoading(true));
            setHtmlField((arr) => [...arr, <Dot key={'Dot' + index} index={index} user={undefined} />]);
          }, fieldSize * 10);
        } else {
          setTimeout(() => {
            setHtmlField((arr) => [...arr, <Dot key={'Dot' + index} index={index} user={undefined} />]);
          }, index * 10);
        }
      }
    }
    socket.on('GAME_END', (data) => {
      dispatch(gameDotsSet(data.dots));
      dispatch(gameTimeSet(data.time));
      dispatch(gameReplaySet(data.replay));
    });
    socket.on('GAME_END_SCORE', (data) => {
      dispatch(gameDotsSet(data.dots));
      dispatch(gameTimeSet(data.time));
      dispatch(gameReplaySet(data.replay));
      dispatch(gameScoresSet({ addScore: data.addScore, decreaseScore: data.decreaseScore }));
    });
    if (startsIn <= 0) {
      socket.on('GAME_TAP', (data) => {
        dispatch(gameDotsSet(data.dots));
        setField(data.dots);
      });
    }
    socket.once('GAME_LOADED', (data) => {
      setStart(data);
    });
    socket.on('USER_LOADED_RETURN', (data) => {
      const loadUsers: lobbyUsersGetType = {
        lobby: lobby,
        type: 'userLoaded',
        value: data
      };
      dispatch(lobbySetUsers(loadUsers));
    });
    return () => {
      socket.off('GAME_TAP');
      socket.off('GAME_LOADED');
      socket.off('USER_LOADED_RETURN');
    };
    // eslint-disable-next-line
  }, [dataGained, startsIn]);
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 'calc(100% - 48px)' }}>
      <div
        className="grid w-full h-full p-2 justify-center"
        style={{
          gridTemplateColumns: `repeat(${lobby.fieldX}, ${dotSize}px)`,
          gridTemplateRows: `repeat(${lobby.fieldY}, ${dotSize}px)`
        }}
      >
        {htmlField}
      </div>
      {lobby.startsIn <= 0 ? <></> : <LoadingWindow canStart={canStart} />}
    </div>
  );
}

export default Battlefield;
