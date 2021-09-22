import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { lobbySetVisibility } from '../../../redux/actions/lobbyActions';
import { lobbyOptionsType } from '../../../redux/types';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import socket from '../../../socketio';
import { renderImage } from '../Lobby';

function LobbyOptOther() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  return (
    <>
      <p className="text-lg my-1">{t('L_OTHER')}</p>
      <div className="w-full px-2">
        <div className="flex gap-x-2 items-center">
          <p>{t('L_OWNER') + ':'}</p>
          {renderImage(lobby.users[0].avatar)}
          <p>{lobby.nickname}</p>
        </div>
        <div className="flex gap-x-2 mt-2 items-center">
          <p>{t('VISIBILITY')}</p>
          <button
            className={`button text-black ${lobby.isPrivate ? 'button-green' : 'button-red'}`}
            onClick={() => {
              if (lobby.isPrivate === false) {
                dispatch(lobbySetVisibility(true));
                socket.emit('LOBBY_OPTIONS', {
                  code: lobby.code,
                  option: 'setVisibility',
                  ownerID: lobby.ownerID,
                  visibility: true
                } as lobbyOptionsType);
              }
            }}
          >
            {t('L_PRIVATE')}
          </button>
          <button
            className={`button text-black ${lobby.isPrivate ? 'button-red' : 'button-green'}`}
            onClick={() => {
              if (lobby.isPrivate === true) {
                dispatch(lobbySetVisibility(false));
                socket.emit('LOBBY_OPTIONS', {
                  code: lobby.code,
                  ownerID: lobby.ownerID,
                  visibility: false,
                  option: 'setVisibility'
                } as lobbyOptionsType);
              }
            }}
          >
            {t('L_PUBLIC')}
          </button>
        </div>
      </div>
    </>
  );
}

export default LobbyOptOther;
