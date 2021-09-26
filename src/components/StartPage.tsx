import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../redux/useTypedSelector';
import StartPageLogo from './StartPageLogo';

function StartPage() {
  const [isError, setError] = useState<boolean>(!('IntersectionObserver' in window));
  const [isVisibleError, setVisibilityError] = useState<boolean>(false);
  const { t } = useTranslation();

  const { code } = useTypedSelector((state) => state.lobby);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <StartPageLogo />
      <div className="flex mt-4 gap-4">
        <NavLink to="/ranking" className="button button-yellow">
          {t('RANKING')}
        </NavLink>
        {isError === false ? (
          code.length === 6 ? (
            <NavLink to="/lobby" className="button button-yellow">
              {t('LOBBY')}
            </NavLink>
          ) : (
            <NavLink to="/games" className="button button-yellow">
              {t('PLAY')}
            </NavLink>
          )
        ) : (
          <></>
        )}
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
      <div className={`bg-red-200 font-bold text-black rounded-md p-2 mt-4 mx-auto my-0 flex gap-2 items-center ${isError ? 'block' : 'hidden'}`}>
        There`s some error{' '}
        <button className="button button-red" onClick={() => setVisibilityError(true)}>
          Show
        </button>
      </div>
      <div
        className={`w-screen h-screen bg-black bg-opacity-50 fixed justify-center items-center ${
          isVisibleError ? 'flex' : 'hidden'
        }`}
      >
        <div className="bg-red-100 panelWidth p-2 lg:rounded-md">
          <button className="button button-red" onClick={() => setVisibilityError(false)}>
            Close
          </button>
          <div className="text-black mt-2 p-2 overflow-y-auto h-96">
            <p className="font-bold">{t('API_UNAVAILABLE')}</p>
            <div className="mt-2 flex flex-col md:flex-row">
              <div className="px-4 mt-2">
                <p className="font-bold">PC</p>
                <ul className="mt-1 list-item list-disc">
                  <li>Google Chrome v.58 {t('OR_HIGHER')}</li>
                  <li>Chromium Edge v.16 {t('OR_HIGHER')}</li>
                  <li>Firefox v.55 {t('OR_HIGHER')}</li>
                  <li>Opera v.45 {t('OR_HIGHER')}</li>
                  <li>Safari v.12.1 {t('OR_HIGHER')}</li>
                </ul>
              </div>
              <div className="px-4 mt-2">
                <p className="font-bold">Mobile</p>
                <ul className="mt-1 list-item list-disc">
                  <li>Web View (Android) v.51 {t('OR_HIGHER')}</li>
                  <li>Google Chrome v.51 {t('OR_HIGHER')}</li>
                  <li>Chromium Edge v.15 {t('OR_HIGHER')}</li>
                  <li>Firefox v.55 {t('OR_HIGHER')}</li>
                  <li>Opera v.93 {t('OR_HIGHER')}</li>
                  <li>Safari v.12.2 {t('OR_HIGHER')}</li>
                  <li>Samsung Internet v.7.2 {t('OR_HIGHER')}</li>
                  <li>QQ Browser v.10.4 {t('OR_HIGHER')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
