import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Cross from '../../../icons/cross';
import { lobbySetMaxPlayers } from '../../../redux/actions/lobbyActions';
import { lobbyOptionsType } from '../../../redux/types';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import socket from '../../../socketio';
import { renderImage } from '../Lobby';

function LobbyOptPlayers() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  const userState = useTypedSelector((state) => state.user);
  return (
    <>
      <p className="text-lg my-1">{t('PLAYERS') + ' ' + lobby.inLobbyPlayers + '/' + lobby.maxPlayers}</p>
      <div className="w-full px-2">
        <div className="flex items-center">
          <p>{t('L_MAX_PLAYERS')}</p>
          <input
            type="text"
            pattern="[0-9]"
            maxLength={2}
            className="ml-2 lobbyOptInput w-16"
            value={lobby.maxPlayers}
            onChange={(e) => {
              if (userState.id !== lobby.ownerID) return 0;
              const nums = e.target.value.match(/\d/g);
              const num = nums?.join('').substr(0, 2);
              if (num !== lobby.maxPlayers) {
                dispatch(lobbySetMaxPlayers(num || ''));
                if ((num || '').length !== 0) {
                  socket.emit('LOBBY_OPTIONS', {
                    code: lobby.code,
                    option: 'setMaxPlayers',
                    ownerID: lobby.ownerID,
                    maxPlayers: num || lobby.inLobbyPlayers || '2'
                  } as lobbyOptionsType);
                }
              }
            }}
          />
          {lobby.maxPlayers === '' ? <p className="ml-2">{lobby.inLobbyPlayers}</p> : <></>}
        </div>
        <div className="bg-white p-2 rounded-md text-black max-h-48 lg:max-h-96 overflow-y-auto mt-2">
          {lobby.users.map((user) => {
            return (
              <div className="flex items-center p-2 my-2 w-min hover:bg-gray-200 rounded-md" key={user.id + '|||' + user.uid}>
                {renderImage(user.avatar)} <p className="ml-2">{user.nickname.substr(0, 24)}</p>{' '}
                {user.id === lobby.ownerID ? (
                  <></>
                ) : userState.id === lobby.ownerID ? (
                  <button
                    className="w-8 h-8 ml-2 fill-current bg-gray-300 text-gray-500 hover:text-red-600 hover:bg-red-200 p-1.5 rounded-full"
                    onClick={() => {}}
                  >
                    <Cross />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default LobbyOptPlayers;
