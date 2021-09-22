import { NavLink } from 'react-router-dom';
import { lobbyType, shapeType } from '../redux/types';
import { useTypedSelector } from '../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import socket from '../socketio';
import { lobbySet } from '../redux/actions/lobbyActions';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { renderImage } from './Lobby/Lobby';

type lobbyShortType = {
  avatar: string;
  nickname: string;
  shape: shapeType;
  inLobbyPlayers: string;
  maxPlayers: string;
  rounds: string;
  fieldX: string;
  fieldY: string;
  code: string;
};

function GamesList() {
  const { user } = useTypedSelector((state) => state);
  const [lobbyList, setLobbyList] = useState<lobbyShortType[]>([]);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('LOBBY_GET_FIRST', user.id);
    socket.on('LOBBY_GET', (lobbyListArray) => {
      setLobbyList(lobbyListArray);
    });
    return () => {
      socket.off('LOBBY_GET');
    };
    // eslint-disable-next-line
  }, []);

  const renderLobbyList = lobbyList.map((lobby) => {
    let colorRounds = 'text-black';
    if (Number(lobby.rounds) > 1) colorRounds = 'text-green-800';
    if (Number(lobby.rounds) >= 3) colorRounds = 'text-blue-800';
    if (Number(lobby.rounds) >= 5) colorRounds = 'text-yellow-800';
    if (Number(lobby.rounds) >= 7) colorRounds = 'text-red-800';

    let colorField = 'text-black';

    if (Number(lobby.fieldX) * Number(lobby.fieldY) > 25) colorField = 'text-green-800';
    if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 49) colorField = 'text-blue-800';
    if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 81) colorField = 'text-yellow-800';
    if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 144) colorField = 'text-red-800';

    let colorPlayers = 'text-black';

    if (Number(lobby.maxPlayers) > 1) colorPlayers = 'text-green-800';
    if (Number(lobby.maxPlayers) >= 3) colorPlayers = 'text-blue-800';
    if (Number(lobby.maxPlayers) >= 5) colorPlayers = 'text-yellow-800';
    if (Number(lobby.maxPlayers) >= 7) colorPlayers = 'text-red-800';

    let shapeColor = 'text-green-800';

    if (lobby.shape === 'triangle') shapeColor = 'text-yellow-800';
    if (lobby.shape === 'circle') shapeColor = 'text-blue-800';
    if (lobby.shape === 'random') shapeColor = 'text-red-800';

    return (
      <div className="p-2 m-2 grid grid-cols-4 items-center hover:bg-gray-200">
        <div className="flex items-center font-bold">
          {renderImage(lobby.avatar)}
          <p className="ml-1">{lobby.nickname}</p>
        </div>
        <div className="flex flex-col ml-4 text-sm">
          <div className="flex flex-row">
            <p className={`${colorRounds}`}>{lobby.rounds}</p>
            <p className={`ml-2 ${colorField}`}>
              {lobby.fieldX + 'x' + lobby.fieldY + ` (${Number(lobby.fieldX) * Number(lobby.fieldY)})`}
            </p>
          </div>
          <p className={`${shapeColor}`}>{t(`SHAPE_${lobby.shape.toUpperCase()}`)}</p>
        </div>
        <div className={`${colorPlayers} text-xl font-bold`}>{lobby.inLobbyPlayers + '/' + lobby.maxPlayers}</div>
        <button className="ml-2 button button-yellow">{lobby.code}</button>
      </div>
    );
  });
  return (
    <div className="panelWidth my-0 mx-auto h-full">
      <div className="h-full">
        <div className="flex justify-evenly pt-4">
          <NavLink to="/" className="button button-green">
            {t('MAIN')}
          </NavLink>
          <div className="button bg-gray-300 hover:bg-gray-200">{t('L_PUBLIC') + ': ' + lobbyList.length}</div>
          <NavLink
            to="/lobby"
            className="button button-yellow"
            onClick={() => {
              if (user.id) {
                dispatch(
                  lobbySet({
                    fieldX: '3',
                    fieldY: '3',
                    ownerID: user.id,
                    nickname: user.nickname,
                    inLobbyPlayers: '1',
                    maxPlayers: '2',
                    messages: [],
                    rounds: '1',
                    shape: 'square',
                    users: [user],
                    code: '',
                    isPrivate: true
                  })
                );
                socket.emit('LOBBY_CREATE', {
                  fieldX: '3',
                  fieldY: '3',
                  ownerID: user.id,
                  nickname: user.nickname,
                  inLobbyPlayers: '1',
                  maxPlayers: '2',
                  messages: [],
                  rounds: '1',
                  shape: 'square',
                  users: [user],
                  code: '',
                  isPrivate: true
                } as lobbyType);
              }
            }}
          >
            {t('CREATE')}
          </NavLink>
        </div>
        <div className="overflow-y-scroll" style={{ height: 'calc(100% - 104px)' }}>
          {renderLobbyList}
        </div>
      </div>
    </div>
  );
}

export default GamesList;
