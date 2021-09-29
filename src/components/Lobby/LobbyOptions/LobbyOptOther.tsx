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
  const user = useTypedSelector(state => state.user)
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
            className={`button text-black ${lobby.visibility === 'private' ? 'button-green' : 'button-red'}`}
            onClick={() => {
              if (user.uid !== lobby.ownerUID) return 0;
              if (lobby.visibility === 'public') {
                dispatch(lobbySetVisibility('private'));
                socket.emit('LOBBY_OPTIONS', {
                  code: lobby.code,
                  option: 'setVisibility',
                  ownerUID: lobby.ownerUID,
                  visibility: 'private'
                } as lobbyOptionsType);
              }
            }}
          >
            {t('L_PRIVATE')}
          </button>
          <button
            className={`button text-black ${lobby.visibility === 'public' ? 'button-green' : 'button-red'}`}
            onClick={() => {
              if (user.uid !== lobby.ownerUID) return 0;
              if (lobby.visibility === 'private') {
                dispatch(lobbySetVisibility('public'));
                socket.emit('LOBBY_OPTIONS', {
                  code: lobby.code,
                  ownerUID: lobby.ownerUID,
                  visibility: 'public',
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
