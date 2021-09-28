import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { lobbySetFieldX, lobbySetFieldY, lobbySetRounds, lobbySetShape } from '../../../redux/actions/lobbyActions';
import { lobbyOptionsType } from '../../../redux/types';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import socket from '../../../socketio';

function LobbyOptField() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  const user = useTypedSelector(state => state.user)
  return (
    <>
      <p className="text-lg my-1">{t('FIELD')}</p>
      <div className="w-full px-2">
        <div className="flex items-center">
          <p>{t('FIELD')}</p>
          <div className="flex ml-2 items-center">
            <p>x:</p>
            <input
              type="text"
              pattern="[0-9]"
              maxLength={2}
              className="ml-1 mr-4 w-16 lobbyOptInput"
              onChange={(e) => {
                if (user.uid !== lobby.ownerUID) return 0;
                const nums = e.target.value.match(/\d/g);
                const num = nums?.join('').substr(0, 2);
                if (num !== lobby.fieldX) {
                  dispatch(lobbySetFieldX(num || ''));
                  if ((num || '').length !== 0) {
                    socket.emit('LOBBY_OPTIONS', {
                      code: lobby.code,
                      option: 'setFieldX',
                      ownerUID: lobby.ownerUID,
                      fieldX: num || '1'
                    } as lobbyOptionsType);
                  }
                }
              }}
              value={lobby.fieldX}
            />
            <p>y:</p>
            <input
              type="text"
              pattern="[0-9]"
              maxLength={2}
              className="ml-1 mr-4 w-16 lobbyOptInput"
              onChange={(e) => {
                if (user.uid !== lobby.ownerUID) return 0;
                const nums = e.target.value.match(/\d/g);
                const num = nums?.join('').substr(0, 2);
                if (num !== lobby.fieldY) {
                  dispatch(lobbySetFieldY(num || ''));
                  if ((num || '').length !== 0) {
                    socket.emit('LOBBY_OPTIONS', {
                      code: lobby.code,
                      option: 'setFieldY',
                      ownerUID: lobby.ownerUID,
                      fieldY: num || '1'
                    } as lobbyOptionsType);
                  }
                }
              }}
              value={lobby.fieldY}
            />
          </div>
          <p className="ml-2">({Number(lobby.fieldX || 1) * Number(lobby.fieldY || 1)})</p>
        </div>
        <div className="flex items-center mt-2">
          <p>{t('ROUNDS')}</p>
          <input
            type="text"
            pattern="[0-9]"
            maxLength={2}
            className="ml-2 w-16 lobbyOptInput"
            onChange={(e) => {
              if (user.uid !== lobby.ownerUID) return 0;
              const nums = e.target.value.match(/\d/g);
              const num = nums?.join('').substr(0, 2);
              if (num !== lobby.rounds) {
                dispatch(lobbySetRounds(num || ''));
                if ((num || '').length !== 0) {
                  socket.emit('LOBBY_OPTIONS', {
                    code: lobby.code,
                    option: 'setRounds',
                    ownerUID: lobby.ownerUID,
                    rounds: num || '2'
                  } as lobbyOptionsType);
                }
              }
            }}
            value={lobby.rounds}
          />
          {lobby.rounds.length === 0 ? <p className="ml-4">1</p> : <></>}
        </div>
        <div className="flex items-center mt-2">
          <p>{t('SHAPE_TYPE')}</p>
          <div className="flex flex-wrap gap-x-2 ml-2">
            <button
              className="button button-green text-black"
              onClick={() => {
                if (user.uid !== lobby.ownerUID) return 0;
                if (lobby.shape !== 'square') {
                  dispatch(lobbySetShape('square'));
                  socket.emit('LOBBY_OPTIONS', {
                    code: lobby.code,
                    option: 'setShape',
                    ownerUID: lobby.ownerUID,
                    shape: 'square'
                  } as lobbyOptionsType);
                }
              }}
            >
              {t('SHAPE_SQUARE')}
            </button>
            {/* <button className="button button-red text-black cursor-not-allowed">{t('SHAPE_TRIANGLE')}</button>
            <button className="button button-red text-black cursor-not-allowed">{t('SHAPE_CIRCLE')}</button>
            <button className="button button-red text-black cursor-not-allowed">{t('SHAPE_RANDOM')}</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LobbyOptField;
