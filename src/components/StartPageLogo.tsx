import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function getRandomInt(min: number = 0, max: number = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function StartPageLogo() {
  const { t } = useTranslation();
  const [gamename, setGamename] = useState<number[]>([0, 0, 207]);
  const [mpgname, setMpgname] = useState<number[]>([189, 177, 0]);
  useEffect(() => {
    let timer = setTimeout(() => {
      setGamename([getRandomInt(0, 256), getRandomInt(0, 256), getRandomInt(0, 256)]);
      setMpgname([getRandomInt(0, 256), getRandomInt(0, 256), getRandomInt(0, 256)]);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div className="font-bold flex flex-col items-center">
      <h1 className="text-4xl mt-4" style={{ color: `rgba(${gamename[0]}, ${gamename[1]}, ${gamename[2]}, 1)` }}>
        Tapper!
      </h1>
      <h2 className="text-2xl mt-4" style={{ color: `rgba(${mpgname[0]}, ${mpgname[1]}, ${mpgname[2]}, 1)` }}>
        {t('MULTIPLAYER_GAME')}
      </h2>
    </div>
  );
}

export default StartPageLogo;
