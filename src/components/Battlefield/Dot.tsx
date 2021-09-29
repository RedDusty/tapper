import { useTypedSelector } from '../../redux/useTypedSelector';
import socket from '../../socketio';

function Dot({ startsIn, index }: { startsIn: number; index: number }) {
  const user = useTypedSelector((state) => state.user);
  const { code } = useTypedSelector((state) => state.lobby);
  console.log(startsIn, index);
  return (
    <div
      className="bg-gray-200 border border-solid border-gray-400 hover:bg-gray-300 hover:border-gray-500"
      style={{ width: `100%`, height: `100%` }}
      onClick={() => {
        if (startsIn <= 0) {
          socket.emit('TAP_DOT', {
            user,
            index,
            code
          });
        }
      }}
    ></div>
  );
}

export default Dot;
