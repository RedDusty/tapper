import { NavLink } from 'react-router-dom';
import { lobbyType, shapeType } from '../redux/types';
import { useTypedSelector } from '../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import socket from '../socketio';
import { lobbySet } from '../redux/actions/lobbyActions';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LobbyItem from './Lobby/LobbyItem';

export type lobbyShortType = {
  ownerID: string;
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
    return <LobbyItem {...lobby} />;
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
                const defaultLobby: lobbyType = {
                  fieldX: '3',
                  fieldY: '3',
                  ownerID: user.id,
                  nickname: user.nickname,
                  inLobbyPlayers: '1',
                  maxPlayers: '2',
                  messages: [
                    {
                      avatar: '',
                      code: '',
                      id: 'systemID',
                      message: 'System message. Test',
                      nickname: 'System',
                      time: Date.now(),
                      uid: 'systemUID'
                    }
                  ],
                  rounds: '1',
                  shape: 'square',
                  users: [user],
                  code: '',
                  isPrivate: true
                };
                dispatch(lobbySet(defaultLobby));
                socket.emit('LOBBY_CREATE', defaultLobby);
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
