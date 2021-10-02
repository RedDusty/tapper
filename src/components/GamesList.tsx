import { Link } from 'react-router-dom';
import { lobbyType, shapeType } from '../redux/types';
import { useTypedSelector } from '../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import socket from '../socketio';
import { lobbySet } from '../redux/actions/lobbyActions';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LobbyItem from './Lobby/LobbyItem';

export type lobbyShortType = {
  ownerUID: string;
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
  const { user, lobby } = useTypedSelector((state) => state);
  const [lobbyList, setLobbyList] = useState<lobbyShortType[]>([]);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('LOBBY_GET', (lobbyListArray) => {
      setLobbyList(lobbyListArray);
    });
    return () => {
      socket.off('LOBBY_GET');
    };
    // eslint-disable-next-line
  }, []);

  const renderLobbyList = lobbyList.map((lobby) => {
    return <LobbyItem {...lobby} key={lobby.code} />;
  });
  return (
    <div className="panelWidth my-0 mx-auto h-full">
      <div className="h-full">
        <div className="flex justify-evenly pt-4">
          <Link to="/" className="button button-green">
            {t('MAIN')}
          </Link>
          <div className="button bg-gray-300 hover:bg-gray-200">{t('L_PUBLIC') + ': ' + lobbyList.length}</div>
          <Link
            to="/lobby"
            className="button button-yellow"
            onClick={() => {
              if (user.uid && lobby.code.length === 0) {
                const defaultLobby: lobbyType = {
                  fieldX: '3',
                  fieldY: '3',
                  ownerUID: user.uid!,
                  nickname: user.nickname?.slice(0, 16) || user.uid?.slice(0, 16) || user.id!.slice(0, 16),
                  inLobbyPlayers: '1',
                  maxPlayers: '2',
                  messages: [
                    {
                      avatar: 'system',
                      code: '',
                      id: 'system',
                      message: 'Score is only works in public games with other players.',
                      nickname: 'System',
                      time: Date.now(),
                      uid: 'system'
                    }
                  ],
                  rounds: '1',
                  shape: 'square',
                  users: [user],
                  code: '',
                  visibility: 'private',
                  isStarted: false,
                  startsIn: 10,
                  dots: []
                };
                dispatch(lobbySet(defaultLobby));
                socket.emit('LOBBY_CREATE', defaultLobby);
              }
            }}
          >
            {t(lobby.code.length === 6 ? 'LOBBY' : 'CREATE')}
          </Link>
        </div>
        <div className="overflow-y-scroll" style={{ height: 'calc(100% - 104px)' }}>
          {renderLobbyList}
        </div>
      </div>
    </div>
  );
}

export default GamesList;
