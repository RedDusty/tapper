import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import StartPageLogo from './StartPageLogo';

function StartPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full flex items-center flex-col">
      <StartPageLogo />
      <div className="flex mt-4 gap-4">
        <NavLink to="/ranking" className="button button-yellow">
          {t('RANKING')}
        </NavLink>
        <NavLink to="/games" className="button button-yellow">
          {t('PLAY')}
        </NavLink>
      </div>
      <div className="flex mt-4 gap-4">
        <NavLink to="/skins" className="button button-green">
          {t('SKINS')}
        </NavLink>
        <NavLink to="/replays" className="button button-green">
          {t('REPLAYS')}
        </NavLink>
      </div>
      <div className="flex mt-4 gap-4">
        <div className="bg-yellow-500 rounded-full w-8 h-8"></div>
        <p>User</p>
        <button className="button button-red">{t('LOG_OUT')}</button>
      </div>
    </div>
  );
}

export default StartPage;
