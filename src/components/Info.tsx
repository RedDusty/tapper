import { useEffect, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Connection from '../icons/connection';
import { useTypedSelector } from '../redux/useTypedSelector';
import socket from '../socketio';

function latencyShow(latency: number | '?' | 'Offline' | 'Reconnect', t: TFunction<'translation'>) {
  if (typeof latency === 'number') {
    if (latency >= 10000) {
      return `10 ${t('S')} >`;
    } else if (latency >= 1000 && latency < 10000) {
      return `${(latency / 1000).toFixed(1)} ${t('S')}`;
    } else if (latency < 1000) {
      return `${latency} ${t('MS')}`;
    } else {
      return `? ${t('MS')}`;
    }
  } else if (latency === 'Offline') {
    return `Offline`;
  } else {
    return `? ${t('MS')}`;
  }
}

function countUsers(users: number | '?', t: TFunction<'translation'>) {
  if (typeof users === 'number') {
    if (users >= 1000000) {
      return `${(users / 1000000).toFixed(1) + t('M')}`;
    } else if (users >= 1000 && users < 10000000) {
      return `${(users / 1000).toFixed(1) + t('K')}`;
    } else if (users < 1000) {
      return users;
    } else {
      return '?';
    }
  } else {
    return '?';
  }
}

function Info() {
  const [latency, setLatency] = useState<number | '?' | 'Offline' | 'Reconnect'>('?');
  const [online, setOnline] = useState<number | '?'>('?');
  const { t } = useTranslation();

  const { code, inLobbyPlayers, maxPlayers } = useTypedSelector((state) => state.lobby);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = Date.now();

      if (socket.connected) {
        socket.volatile.emit('SERVER_PING', () => {
          const latency = Date.now() - start;

          if (typeof latency !== 'number') {
            setLatency('?');
          } else {
            setLatency(latency);
          }
        });
      } else {
        setLatency('Offline');
      }
    }, 2500);
    socket.on('ONLINE_UPDATE', (usersCount) => {
      if (typeof usersCount === 'number') {
        setOnline(usersCount);
      } else {
        setOnline('?');
      }
    });
    socket.io.on('reconnect', (data) => {
      setLatency('Reconnect');
    })
    return () => {
      clearInterval(interval);
      socket.off('ONLINE_UPDATE');
      socket.off('SERVER_PING');
    };
  }, []);
  return (
    <div className="w-full h-12 fixed bottom-0 flex justify-center">
      <div className="panelWidth bg-gray-400 grid grid-cols-3">
        <div className="infoBlock flex">
          <Connection latency={latency} />
          <p className="ml-2">{latencyShow(latency, t)}</p>
        </div>
        {code.length === 6 ? (
          <p className="infoBlock">{inLobbyPlayers + '/' + maxPlayers}</p>
        ) : (
          <p className="infoBlock">{t('ONLINE') + ': ' + countUsers(online, t)}</p>
        )}
        {window.location.pathname === '/lobby' ? (
          <NavLink className="rounded-md px-2 m-2 font-bold flex items-center justify-center button-green" to={'/'}>
            {t('MAIN')}
          </NavLink>
        ) : code.length === 6 ? (
          <NavLink
            className="rounded-md px-2 m-2 font-bold flex items-center justify-center button-yellow"
            to={'/lobby'}
          >
            {t('LOBBY')}
          </NavLink>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Info;
