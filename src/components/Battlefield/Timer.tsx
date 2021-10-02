import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { lobbySetStartsIn } from '../../redux/actions/lobbyActions';

const Timer = () => {
  const [timerStartsIn, setTimerStartsIn] = useState<number>(2);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timerStartsIn > 0) {
        setTimerStartsIn(timerStartsIn - 1);
      }
      if (timerStartsIn === 0) {
        console.warn('set timer to 10 seconds');
        dispatch(lobbySetStartsIn(0));
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div
      className="flex justify-center items-center text-center w-40 h-40 rounded-full"
      style={{ boxShadow: '0 0 128px 132px rgb(144 144 249)', backgroundColor: 'rgb(144 144 249)' }}
    >
      <p
        className="font-bold"
        style={{
          fontSize: '256px',
          color: 'rgb(136 156 255)',
          textShadow: '0 0 32px white',
          WebkitTextStroke: '8px #f5f6f7'
        }}
      >
        {timerStartsIn}
      </p>
    </div>
  );
};

export default Timer;
