import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/useTypedSelector';

function LobbyOptField() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
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
              value={lobby.field.split('x')[0]}
            />
            <p>y:</p>
            <input
              type="text"
              pattern="[0-9]"
              maxLength={2}
              className="ml-1 mr-4 w-16 lobbyOptInput"
              value={lobby.field.split('x')[1]}
            />
          </div>
        </div>
        <div className="flex items-center mt-2">
          <p>{t('ROUNDS')}</p>
          <input
            type="text"
            pattern="[0-9]"
            maxLength={2}
            className="ml-2 w-16 lobbyOptInput"
            value={lobby.rounds}
          />
        </div>
        <div className="flex items-center mt-2">
          <p>{t('SHAPE_TYPE')}</p>
          <div className="flex flex-wrap gap-x-2 ml-2">
            <button className="button button-green text-black">{t('SHAPE_SQUARE')}</button>
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
