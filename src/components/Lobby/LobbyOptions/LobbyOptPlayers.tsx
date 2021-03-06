import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { lobbySetMaxPlayers } from '../../../redux/actions/lobbyActions';
import { lobbyOptionsType } from '../../../redux/types';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import { getSocket } from '../../../socketio';
import LobbyPlayersList from './LobbyPlayersList';

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
          <p>{t('MAX_PLAYERS')}</p>
          <input
            type="text"
            pattern="[0-9]"
            maxLength={2}
            className="ml-2 lobbyOptInput w-16"
            value={lobby.maxPlayers}
            onChange={(e) => {
              if (userState.uid !== lobby.ownerUID) return 0;
              const nums = e.target.value.match(/\d/g);
              const num = nums?.join('').substr(0, 2);
              if (num !== lobby.maxPlayers) {
                dispatch(lobbySetMaxPlayers(num || ''));
                if ((num || '').length !== 0) {
                  const emmitedNumber = () => {
                    if (num && Number(num) > 2) {
                      if (Number(num) > 8) {
                        return 8;
                      } else {
                        return num;
                      }
                    } else {
                      return String(2);
                    }
                  };
                  getSocket().emit('LOBBY_OPTIONS', {
                    code: lobby.code,
                    option: 'setMaxPlayers',
                    ownerUID: lobby.ownerUID,
                    maxPlayers: emmitedNumber()
                  } as lobbyOptionsType);
                }
              }
            }}
          />
          {lobby.maxPlayers === '' ? <p className="ml-2">{lobby.inLobbyPlayers}</p> : <></>}
        </div>
        <LobbyPlayersList />
      </div>
    </>
  );
}

export default LobbyOptPlayers;
