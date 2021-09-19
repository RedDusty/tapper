import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Connection from '../icons/connection';
import socket from '../socketio';

function getLatency(setLatency: React.Dispatch<React.SetStateAction<number | '?'>>) {
  const start = Date.now();

  socket.volatile.emit('ping', () => {
    const latency = Date.now() - start;

    if (typeof latency !== 'number') {
      setLatency('?');
    } else {
      setLatency(latency);
    }
  });
  socket.emit('ping');
}

function Info() {
  const [latency, setLatency] = useState<number | '?'>('?');
  const [online, setOnline] = useState<number | '?'>('?');
  const [playing, setPlaying] = useState<number | '?'>('?');
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      getLatency(setLatency);
    }, 2500);
    socket.on('USERS_UPDATE', ({ usersCount }) => {
      console.log(usersCount);
      if (typeof usersCount === 'number') {
        setOnline(usersCount);
      } else {
        setOnline('?');
      }
    });
    socket.on('PLAYING_UPDATE', ({ playingCount }) => {
      if (typeof playingCount === 'number') {
        setPlaying(playingCount);
      } else {
        setPlaying('?');
      }
    });
    return () => {
      clearInterval(interval);
      socket.off('USERS_UPDATE');
      socket.off('PLAYING_UPDATE');
    };
  }, []);
  return (
    <div className="w-full h-16 p-2 lg:w-1/3 grid grid-cols-3 bg-gray-400 fixed bottom-0 lg:rounded-tr-md lg:rounded-tl-md">
      <div className="bg-gray-300 rounded-md p-2 m-2 font-bold flex">
        <Connection latency={latency} />
        <p className="ml-2">{latency >= 1000 ? latency + ' ' + t('S') : latency + ' ' + t('MS')}</p>
      </div>
      <p className="bg-gray-300 rounded-md p-2 m-2 font-bold">
        {t('ONLINE') + ': ' + (typeof online === 'number' ? (online >= 10000 ? online / 1000 + t('k') : online) : '?')}
      </p>
      <p className="bg-gray-300 rounded-md p-2 m-2 font-bold">
        {t('PLAYING') +
          ': ' +
          (typeof playing === 'number' ? (playing >= 10000 ? playing / 1000 + t('k') : playing) : '?')}
      </p>
    </div>
  );
}

export default Info;
