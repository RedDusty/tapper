import { userInfoType } from '../../redux/types';
import { renderImage } from '../Lobby/Lobby';

function LoadingWindow({ users, timer }: { users: userInfoType[]; timer: number }) {
  return (
    <div className="w-screen h-screen fixed bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white rounded-md p-4">
        {users.map((user) => {
          return (
            <div
              className={`grid justify-center items-center gap-x-2 my-2 py-1 px-2 rounded-md ${
                user.isLoaded ? 'bg-green-200' : 'userLoading'
              }`}
              style={{ gridTemplateColumns: '32px 160px 70px' }}
            >
              {renderImage(user.avatar)}
              <p>{user.nickname.length > 16 ? user.nickname.slice(0, 16) + '...' : user.nickname}</p>
              <p>{user.isLoaded ? 'Done' : 'Loading...'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LoadingWindow;
