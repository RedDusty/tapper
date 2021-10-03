import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logOut, signInWithGoogle } from '../firebase';
import { useTypedSelector } from '../redux/useTypedSelector';
import { renderImage } from './Lobby/Lobby';
import StartPageLogo from './StartPageLogo';

function StartPage() {
  const [isError] = useState<boolean>(!('IntersectionObserver' in window));
  const [isVisibleError, setVisibilityError] = useState<boolean>(false);
  const { t } = useTranslation();

  const { code } = useTypedSelector((state) => state.lobby);
  const user = useTypedSelector((state) => state.user);

  const renderGame = () => {
    if (code && code.length === 6 && user.uid !== null && isError === false) {
      return (
        <Link to="/lobby" className="button button-yellow">
          {t('LOBBY')}
        </Link>
      );
    } else if (user.uid !== null && isError === false) {
      return (
        <Link to="/games" className="button button-yellow">
          {t('PLAY')}
        </Link>
      );
    } else if (isError) {
      return <></>;
    } else {
      return <></>;
    }
  };

  const renderUser = () => {
    if (user.uid !== null) {
      return (
        <>
          <div>
            <div className="flex items-center">
              {renderImage(user.avatar)}
              <p className="ml-2">{user.nickname || user.uid.slice(0, 16)}</p>
            </div>
            <div className="w-0 h-0 relative left-10 top-2">{(user.score || 0).toFixed(3)}</div>
          </div>
          <button className="button button-red" onClick={() => logOut()}>
            {t('LOG_OUT')}
          </button>
        </>
      );
    } else {
      return (
        <button className="button button-green" onClick={() => signInWithGoogle()}>
          {t('LOGIN')}
        </button>
      );
    }
  };

  const renderOptions = () => {
    if (user.uid !== null) {
      return (
        <div className="flex mt-4 gap-4">
          <Link to="/skins" className="button button-green">
            {t('SKINS')}
          </Link>
          <Link to="/replays" className="button button-green">
            {t('REPLAYS')}
          </Link>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <StartPageLogo />
      <div className="flex mt-4 gap-4">
        <Link to="/score" className="button button-yellow">
          {t('SCORE')}
        </Link>
        {renderGame()}
      </div>
      {renderOptions()}
      <div className="flex mt-4 gap-4 items-center justify-center">{renderUser()}</div>
      <div
        className={`bg-red-200 font-bold text-black rounded-md p-2 mt-4 mx-auto my-0 flex gap-2 items-center ${
          isError ? 'block' : 'hidden'
        }`}
      >
        There`s some error
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
