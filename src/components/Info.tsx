import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    socket.on('USERS_UPDATE', ({ usersCount }) => {
      if (typeof usersCount === 'number') {
        setOnline(usersCount);
      } else {
        setOnline('?');
      }
    });
    socket.on('LOBBY_UPDATE', ({ playingCount }) => {
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
  }, []);
  return (
    <div className="w-screen h-16 fixed bottom-0 flex justify-center">
      <div className="w-full lg:w-1/3 bg-gray-400 p-2 grid grid-cols-3 lg:rounded-tr-md lg:rounded-tl-md">
        <div className="bg-gray-200 hover:bg-gray-300 rounded-md p-2 m-2 font-bold flex">
          <Connection latency={latency} />
          <p className="ml-2">{latency >= 1000 ? latency + ' ' + t('S') : latency + ' ' + t('MS')}</p>
        </div>
        <p className="bg-gray-200 hover:bg-gray-300 rounded-md p-2 m-2 font-bold">
          {t('ONLINE') +
            ': ' +
            (typeof online === 'number' ? (online >= 10000 ? online / 1000 + t('k') : online) : '?')}
        </p>
        <p className="bg-gray-200 hover:bg-gray-300 rounded-md p-2 m-2 font-bold">
          {t('PLAYING') +
            ': ' +
            (typeof playing === 'number' ? (playing >= 10000 ? playing / 1000 + t('k') : playing) : '?')}
        </p>
      </div>
    </div>
  );
}

export default Info;
