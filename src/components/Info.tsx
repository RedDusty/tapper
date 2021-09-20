import { useEffect, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import Connection from '../icons/connection';
import socket from '../socketio';

function getLatency(setLatency: React.Dispatch<React.SetStateAction<number | '?'>>) {
  const start = Date.now();

  socket.volatile.emit('SERVER_PING', () => {
    const latency = Date.now() - start;

    if (typeof latency !== 'number') {
      setLatency('?');
    } else {
      setLatency(latency);
    }
  });
}

function latencyShow(latency: number | '?', t: TFunction<'translation'>) {
  if (typeof latency === 'number') {
    if (latency >= 25000) {
      return `25 ${t('S')} >`;
    } else if (latency >= 1000 && latency < 25000) {
      return `${(latency / 1000).toFixed(1)} ${t('S')}`;
    } else if (latency < 1000) {
      return `${latency} ${t('MS')}`;
    } else {
      return `? ${t('MS')}`;
    }
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
  const [latency, setLatency] = useState<number | '?'>('?');
  const [online, setOnline] = useState<number | '?'>('?');
  const [playing, setPlaying] = useState<number | '?'>('?');
  const { t } = useTranslation();

  useEffect(() => {
    getLatency(setLatency);
    const interval = setInterval(() => {
      getLatency(setLatency);
    }, 2500);
    socket.on('USERS_UPDATE', (usersCount) => {
      if (typeof usersCount === 'number') {
        setOnline(usersCount);
      } else {
        setOnline('?');
      }
    });
    socket.on('LOBBY_UPDATE', (playingCount) => {
      if (typeof playingCount === 'number') {
        setPlaying(playingCount);
      } else {
        setPlaying('?');
      }
    });
    return () => {
      clearInterval(interval);
      socket.off('USERS_UPDATE');
      socket.off('LOBBY_UPDATE');
    };
  }, [window.location.pathname]);
  return (
    <div className="w-screen h-16 fixed bottom-0 flex justify-center">
      <div className="w-full lg:w-1/3 bg-gray-400 p-2 grid grid-cols-3 lg:rounded-tr-md lg:rounded-tl-md">
        <div className="infoBlock flex">
          <Connection latency={latency} />
          <p className="ml-2">{latencyShow(latency, t)}</p>
        </div>
        <p className="infoBlock">{t('ONLINE') + ': ' + countUsers(online, t)}</p>
        <p className="infoBlock">{t('PLAYING') + ': ' + countUsers(playing, t)}</p>
      </div>
    </div>
  );
}

export default Info;
