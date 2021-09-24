import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  lobbySet,
  lobbySetFieldX,
  lobbySetFieldY,
  lobbySetinLobbyPlayers,
  lobbySetMaxPlayers,
  lobbySetRounds,
  lobbySetShape,
  lobbySetUsers,
  lobbySetVisibility
} from '../../redux/actions/lobbyActions';
import { lobbySocketOptionsType, lobbyType, lobbyUsersGetType, shapeType } from '../../redux/types';
import { useTypedSelector } from '../../redux/useTypedSelector';
import socket from '../../socketio';
import LobbyChat from './LobbyChat/LobbyChat';
import LobbyHeader from './LobbyHeader';
import LobbyOptions from './LobbyOptions/LobbyOptions';

export type lobbyTab = 'chat' | 'options';

export function renderImage(avatar: string) {
  if (avatar.length !== 0) {
    if (avatar === 'system') {
      return <div className="bg-blue-500 w-8 h-8 rounded-full"></div>;
    } else {
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
    }
  } else {
    return <div className="bg-green-600 w-8 h-8 rounded-full"></div>;
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
  const user = useTypedSelector((state) => state.user);

  useEffect(() => {
    socket.on('LOBBY_USERS_UPDATE', (users: lobbyUsersGetType) => {
      switch (users.type) {
        case 'userJoin': {
          dispatch(lobbySetinLobbyPlayers(String(users.value.length)));
          dispatch(lobbySetUsers(users));
          if (!lobby.code) {
            dispatch(lobbySet(users.lobby));
          }
          return 0;
        }
        case 'userLeave': {
          dispatch(lobbySetinLobbyPlayers(String(users.value.length)));
          dispatch(lobbySetUsers(users));
          return 0;
        }
        default:
          return 0;
      }
    });
    socket.on('LOBBY_OPTIONS_UPDATE', (data: lobbySocketOptionsType) => {
      if (user.id !== lobby.ownerID) {
        setOptions(dispatch, data, lobby);
      }
    });
    return () => {
      socket.off('LOBBY_USERS_UPDATE');
      socket.off('LOBBY_OPTIONS_UPDATE');
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

function setOptions(dispatch: Dispatch<any>, data: lobbySocketOptionsType, lobby: lobbyType) {
  switch (data.type) {
    case 'setFieldX': {
      dispatch(lobbySetFieldX(String(data.option)));
      return 0;
    }
    case 'setFieldY': {
      dispatch(lobbySetFieldY(String(data.option)));
      return 0;
    }
    case 'setInLobbyPlayers': {
      dispatch(lobbySetinLobbyPlayers(String(data.option)));
      return 0;
    }
    case 'setMaxPlayers': {
      dispatch(lobbySetMaxPlayers(String(data.option)));
      return 0;
    }
    case 'setRounds': {
      dispatch(lobbySetRounds(String(data.option)));
      return 0;
    }
    case 'setShape': {
      dispatch(lobbySetShape(data.option as shapeType));
      return 0;
    }
    case 'setVisibility': {
      dispatch(lobbySetVisibility(Boolean(data.option)));
      return 0;
    }
    default:
      return 0;
  }
}
