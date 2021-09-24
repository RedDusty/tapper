import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { lobbySet, lobbySetinLobbyPlayers, lobbySetUsers } from '../../redux/actions/lobbyActions';
import { lobbyUsersGetType } from '../../redux/types';
import { useTypedSelector } from '../../redux/useTypedSelector';
import socket from '../../socketio';
import LobbyChat from './LobbyChat/LobbyChat';
import LobbyHeader from './LobbyHeader';
import LobbyOptions from './LobbyOptions/LobbyOptions';

export type lobbyTab = 'chat' | 'options';

export function renderImage(avatar: string) {
  if (avatar.length !== 0) {
    return (
      <div className="bg-gray-500 w-8 h-8 animate-pulse rounded-full">
        <img
          src={avatar}
          alt={''}
          className="w-full h-full rounded-full"
          onLoad={(e) => {
            e.currentTarget.parentElement?.classList.remove('animate-pulse');
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.classList.remove('bg-gray-500');
            e.currentTarget.parentElement?.classList.remove('animate-pulse');
            e.currentTarget.parentElement?.classList.add('bg-red-500');
          }}
        />
      </div>
    );
  } else {
    return <div className="bg-blue-600 w-8 h-8 rounded-full"></div>;
  }
}

function renderTab(tab: lobbyTab, code: string) {
  if (code.length > 0) {
    switch (tab) {
      case 'chat': {
        return <LobbyChat />;
      }
      case 'options': {
        return <LobbyOptions />;
      }
      default: {
        return <></>;
      }
    }
  } else {
    return <div>Loading...</div>;
  }
}

export function Lobby() {
  const [tab, setTab] = useState<lobbyTab>('chat');
  const dispatch = useDispatch();

  const lobby = useTypedSelector((state) => state.lobby);

  useEffect(() => {
    socket.on('LOBBY_USERS_UPDATE', (users: lobbyUsersGetType) => {
      switch (users.type) {
        case 'userJoin': {
          dispatch(lobbySetinLobbyPlayers(String(users.value.length)));
          dispatch(lobbySetUsers(users));
          if (!lobby.code) {
            dispatch(lobbySet(users.lobby));
          }
          break;
        }

        default:
          break;
      }
    });
    return () => {
      socket.off('LOBBY_USERS_UPDATE');
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="w-full h-full">
      <LobbyHeader setTab={setTab} />
      {renderTab(tab, lobby.code)}
    </div>
  );
}
