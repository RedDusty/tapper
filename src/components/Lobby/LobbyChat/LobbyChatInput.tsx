import { useState } from 'react';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import { getSocket } from '../../../socketio';

function LobbyChatInput() {
  const [message, setMessage] = useState<string>('');

  const { code } = useTypedSelector((state) => state.lobby);
  const { avatar, id, nickname, uid } = useTypedSelector((state) => state.user);

  return (
    <div className="bg-gray-300 h-20 p-2 grid items-center gap-x-2" style={{ gridTemplateColumns: '1fr min-content' }}>
      <textarea
        className="bg-gray-100 rounded-md px-2 h-full resize-none outline-none w-full"
        onChange={(e) => setMessage(e.target.value.substr(0, 99).replace(/\s+/g, ' '))}
        value={message}
      ></textarea>
      <div>
        <button
          className={`button-green font-bold p-1 flex items-center rounded-lg select-none ${
            code.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
          onClick={() => {
            if (code.length > 0) {
              if (message.length > 0)
                if (!(message.length === 1 && message.charAt(0) === ' ')) {
                  getSocket().emit('LOBBY_MESSENGER', {
                    avatar,
                    id,
                    nickname,
                    uid,
                    message: message.substr(0, 99).replace(/\s+/g, ' '),
                    time: Date.now(),
                    code
                  });
                  setMessage('');
                }
            }
          }}
        >
          {code.length > 0 ? 'Send' : 'Wait...'}
        </button>
        <p
          className={`text-xs font-bold select-none bg-gray-100 flex justify-center items-center mt-2 py-1 rounded-md ${
            message.length > 65 ? (message.length >= 99 ? 'text-red-500' : 'text-yellow-500') : 'text-black'
          }`}
        >
          {message.length}/99
        </p>
      </div>
    </div>
  );
}

export default LobbyChatInput;
