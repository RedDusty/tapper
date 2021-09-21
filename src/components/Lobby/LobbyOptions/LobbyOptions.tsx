import { useTranslation } from 'react-i18next';
import LobbyOptField from './LobbyOptField';
import LobbyOptOther from './LobbyOptOther';
import LobbyOptPlayers from './LobbyOptPlayers';

function LobbyOptions() {
  const { t } = useTranslation();

  return (
    <div
      className="select-text panelWidth my-0 py-2 mx-auto overflow-y-scroll bg-gray-600 flex flex-col items-center font-bold text-gray-200"
      style={{
        height: 'calc(100% - 96px)'
      }}
    >
      <div className="select-none">
        <button className="button button-yellow text-black">{t('START')}</button>
      </div>
      <LobbyOptPlayers />
      <LobbyOptField />
      <LobbyOptOther />
    </div>
  );
}

export default LobbyOptions;
