import { useState } from 'react';
import LobbyChat from './LobbyChat';
import LobbyHeader from './LobbyHeader';
import LobbyOptions from './LobbyOptions';

export type lobbyTab = 'chat' | 'options';

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

function Lobby() {
  const [tab, setTab] = useState<lobbyTab>('chat');
  return (
    <div className="w-full h-full">
      <LobbyHeader setTab={setTab} />
      {renderTab(tab)}
    </div>
  );
}

export default Lobby;
