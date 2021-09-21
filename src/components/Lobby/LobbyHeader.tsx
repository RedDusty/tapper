import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Chat from '../../icons/chat';
import Options from '../../icons/options';
import { lobbySetCode } from '../../redux/actions/lobbyActions';
import { useTypedSelector } from '../../redux/useTypedSelector';
import socket from '../../socketio';
import { lobbyTab } from './Lobby';

function LobbyHeader({ setTab }: { setTab: React.Dispatch<React.SetStateAction<lobbyTab>> }) {
  const code = useTypedSelector((state) => state.lobby.code);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('LOBBY_GET_CODE', (code) => {
      dispatch(lobbySetCode(code));
    });
    return () => {
      socket.off('LOBBY_GET_CODE');
    };
    // eslint-disable-next-line
  }, [code]);

  return (
      <div className="panelWidth h-12 p-2 mx-auto bg-gray-400 flex justify-evenly items-center">
        <button
          className="fill-current text-gray-200 hover:text-gray-300 focus:animate-pulse w-8 h-8"
          onClick={() => setTab('chat')}
        >
          <Chat />
        </button>
        <button
          className="fill-current text-gray-200 hover:text-gray-300 focus:animate-pulse w-8 h-8"
          onClick={() => setTab('options')}
        >
          <Options />
        </button>
        {typeof window.Clipboard !== 'undefined' ? (
          <button
            className="infoBlock copyCode py-1"
            onClick={(e) => {
              if (code.length > 0) {
                if (typeof window.Clipboard !== 'undefined') {
                  navigator.clipboard.writeText(code);
                  e.currentTarget.childNodes[0].textContent = `${t('COPIED')}: ${code}`;
                }
              }
            }}
          >
            <span className="toolTipText">{t('Copy to clipboard')}</span>
            {code.length !== 0 ? code : 'Wait...'}
          </button>
        ) : (
          <input
            type="text"
            readOnly={true}
            className="w-24 rounded-md p-2 m-2 font-bold outline-none text-center select-all"
            value={code.length !== 0 ? code : 'Wait...'}
          />
        )}
      </div>
  );
}

export default LobbyHeader;