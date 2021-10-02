import { useEffect, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../redux/useTypedSelector';

function InfoButton() {
  const { pathname } = useLocation();
  const [render, setRender] = useState(<></>);
  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  useEffect(() => {
    if (pathname !== '/lobby' && lobby.code.length === 6 && lobby.visibility !== 'game') {
      setRender(toLocation(t, 'lobby'));
    } else if (pathname === '/lobby' && lobby.visibility !== 'game') {
      setRender(toLocation(t, ''));
    } else if (pathname === '/skins' || pathname === '/score' || pathname === '/replays' || pathname === '/games') {
      setRender(toLocation(t, ''));
    } else {
      setRender(<></>);
    }
    // eslint-disable-next-line
  }, [pathname]);
  return render;
}

export default InfoButton;

const toLocation: (t: TFunction<'translation'>, location: string) => JSX.Element = (t, location) => {
    const text = location === 'lobby' ? 'LOBBY' : 'MAIN'
  return (
    <Link
      className="rounded-md px-2 m-2 font-bold flex items-center justify-center button-green"
      to={'/' + location}
    >
      {t(text)}
    </Link>
  );
};
