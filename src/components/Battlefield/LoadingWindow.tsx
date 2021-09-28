import { userInfoType } from '../../redux/types';
import { renderImage } from '../Lobby/Lobby';

function LoadingWindow({ users, timer }: { users: userInfoType[]; timer: number }) {
  return (
    <div className="w-screen h-screen fixed bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white rounded-md p-4">
        {users.map((user) => {
          const nickname = () => {
            if (user.nickname!.length > 16) {
              return <p>{user.nickname!.slice(0, 16) + '...'}</p>;
            } else if (user.nickname!.length === 0) {
              return <p>{user.uid!.slice(0, 16)}</p>;
            } else {
              return <p>{user.nickname}</p>;
            }
          };
          return (
            <div
              className={`grid justify-center items-center gap-x-2 my-2 py-1 px-2 rounded-md ${
                user.isLoaded ? 'bg-green-200' : 'userLoading'
              }`}
              style={{ gridTemplateColumns: '32px 160px 70px' }}
            >
              {renderImage(user.avatar)}
              {nickname()}
              <p>{user.isLoaded ? 'Done' : 'Loading...'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LoadingWindow;
