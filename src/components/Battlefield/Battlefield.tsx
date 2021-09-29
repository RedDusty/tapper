import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { lobbySetUsers } from '../../redux/actions/lobbyActions';
import { userSetLoading } from '../../redux/actions/userActions';
import { lobbyUsersGetType, userInfoType } from '../../redux/types';
import { useTypedSelector } from '../../redux/useTypedSelector';
import socket from '../../socketio';
import { dotType, fieldType } from '../Lobby/Lobby';
import Dot from './Dot';
import LoadingWindow from './LoadingWindow';

function Battlefield({
  field,
  users,
  setField,
  setUsers,
  dataGained
}: {
  field: fieldType;
  users: userInfoType[];
  setField: React.Dispatch<React.SetStateAction<fieldType>>;
  setUsers: React.Dispatch<React.SetStateAction<userInfoType[]>>;
  dataGained: boolean;
}) {
  const [dotSize, setDotSize] = useState<number>(12);
  const [htmlField, setHtmlField] = useState<JSX.Element[]>([]);
  const [canStart, setStart] = useState<boolean>(false);
  const [startsIn, setStartsIn] = useState<number>(10);

  const { user } = useTypedSelector((state) => state);
  const { lobby } = useTypedSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (canStart === false && dataGained === true) {
      if (window.innerWidth > window.innerHeight) {
        setDotSize((window.innerHeight - 64) / field.fieldX);
      } else {
        setDotSize((window.innerWidth - 64) / field.fieldX);
      }
      const fieldSize = Number(Number(field.fieldX) * Number(field.fieldY));

      for (let index = 0; index < fieldSize; index++) {
        if (index === fieldSize - 1) {
          setTimeout(() => {
            socket.emit('USER_LOADED', { user: user, isLoaded: true, lobby: lobby });
            dispatch(userSetLoading(true));
            setHtmlField((arr) => [...arr, <Dot key={'Dot' + (index + 1)} startsIn={startsIn} index={index + 1} />]);
          }, fieldSize * 10);
        } else {
          setTimeout(() => {
            setHtmlField((arr) => [...arr, <Dot key={'Dot' + (index + 1)} startsIn={startsIn} index={index + 1} />]);
          }, index * 10);
        }
      }
    }
    if (startsIn <= 0) {
      socket.once('GAME_TAP', (data) => {
        const tappedIndex = field.dots.findIndex((dot) => dot.index === data.index);
        const tappedDot: dotType = Object.create(field.dots[tappedIndex]);
        const newDot = (tappedDot.user = data.user);
        const dots = [...field.dots, newDot];
        setField({ dots: dots, fieldX: field.fieldX, fieldY: field.fieldY });
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
      }
      dispatch(lobbySetUsers(loadUsers));
      setUsers(data);
    });
    return () => {
      socket.off('GAME_TAP');
      socket.off('GAME_LOADED');
      socket.off('USER_LOADED_RETURN');
    };
    // eslint-disable-next-line
  }, [dataGained]);
  return (
    <div className="w-full flex items-center justify-center" style={{ height: 'calc(100% - 48px)' }}>
      <div
        className="grid w-full h-full p-2 justify-center"
        style={{
          gridTemplateColumns: `repeat(${field.fieldX}, ${dotSize}px)`,
          gridTemplateRows: `repeat(${field.fieldY}, ${dotSize}px)`
        }}
      >
        {htmlField}
      </div>
      {startsIn <= 0 ? (
        <></>
      ) : (
        <LoadingWindow users={users} startsIn={startsIn} setStartsIn={setStartsIn} canStart={canStart} />
      )}
    </div>
  );
}

export default Battlefield;
