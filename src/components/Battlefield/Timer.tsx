import { useEffect } from 'react';

const Timer = (startsIn: number, setStartsIn: React.Dispatch<React.SetStateAction<number>>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartsIn(startsIn - 1);
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
        {startsIn}
      </p>
    </div>
  );
};

export default Timer;
