import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import socket from '../../../socketio';
import LobbyOptField from './LobbyOptField';
import LobbyOptOther from './LobbyOptOther';
import LobbyOptPlayers from './LobbyOptPlayers';

function LobbyOptions() {
  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  const user = useTypedSelector((state) => state.user);

  return (
    <div
      className="select-text panelWidth my-0 py-2 mx-auto overflow-y-scroll bg-gray-600 flex flex-col items-center font-bold text-gray-200"
      style={{
        height: 'calc(100% - 96px)'
      }}
    >
      <div className={`select-none ${lobby.ownerUID === user.uid ? 'block' : 'hidden'}`}>
        <button
          className="button button-yellow text-black"
          onClick={() => {
            socket.emit('GAME_START', lobby);
          }}
        >
          {t('START')}
        </button>
      </div>
      <LobbyOptPlayers />
      <LobbyOptField />
      <LobbyOptOther />
    </div>
  );
}

export default LobbyOptions;
