import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../redux/useTypedSelector';
import socket from '../../socketio';
import LobbyChatInput from './LobbyChatInput';
import LobbyMessage from './LobbyMessage';

export type messageType = { avatar: string; id: string; nickname: string; uid: string; message: string; time: number };

function LobbyChat() {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isInputFocus, setInputFocus] = useState<boolean>(false);

  const code = useTypedSelector((state) => state.lobby.code);

  useEffect(() => {
    socket.on('LOBBY_GET_MESSAGES', (msgData) => {
      setMessages(msgData);
    });
    return () => {
      socket.off('LOBBY_GET_MESSAGES');
    };
  }, [code]);

  return (
    <div
      className="select-text panelWidth my-0 mx-auto bg-gray-600 grid"
      style={{ gridTemplateRows: `${isInputFocus ? 'calc(100% - 128px) 80px' : 'calc(100% - 112px) 64px'}`, height: 'calc(100% - 48px)' }}
    >
      <div className="overflow-y-scroll w-full p-2">
        {messages.map((message, index) => {
          return <LobbyMessage {...message} key={message.uid + index} />;
        })}
      </div>
      <LobbyChatInput isInputFocus={isInputFocus} setInputFocus={setInputFocus} />
    </div>
  );
}

export default LobbyChat;
