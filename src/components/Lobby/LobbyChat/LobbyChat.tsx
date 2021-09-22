import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { lobbySetMessages } from '../../../redux/actions/lobbyActions';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import socket from '../../../socketio';
import LobbyChatInput from './LobbyChatInput';
import LobbyMessage from './LobbyMessage';

function LobbyChat() {
  const {code, messages} = useTypedSelector((state) => state.lobby);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('LOBBY_GET_MESSAGES', (msgData) => {
      dispatch(lobbySetMessages(msgData));
    });
    return () => {
      socket.off('LOBBY_GET_MESSAGES');
    };
    // eslint-disable-next-line
  }, [code]);

  return (
    <div
      className="select-text panelWidth my-0 mx-auto bg-gray-600 grid"
      style={{
        gridTemplateRows: 'calc(100% - 128px) 80px',
        height: 'calc(100% - 48px)'
      }}
    >
      <div className="overflow-y-scroll w-full p-2">
        {messages.map((message, index) => {
          return <LobbyMessage {...message} key={message.uid + index} />;
        })}
      </div>
      <LobbyChatInput />
    </div>
  );
}

export default LobbyChat;
