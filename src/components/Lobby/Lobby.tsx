import { useState } from 'react';
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

function renderTab(tab: lobbyTab) {
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
}

export function Lobby() {
  const [tab, setTab] = useState<lobbyTab>('chat');
  return (
    <div className="w-full h-full">
      <LobbyHeader setTab={setTab} />
      {renderTab(tab)}
    </div>
  );
}
