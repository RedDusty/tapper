import { messageType } from './LobbyChat';

function renderImage(avatar: string) {
  if (avatar.length !== 0) {
    return (
      <div className="bg-gray-500 w-8 h-8 animate-pulse rounded-full">
        <img
          src={avatar}
          alt={''}
          className="w-full h-full rounded-full"
          onLoad={(e) => {
            e.currentTarget.parentElement?.classList.remove('animate-pulse');
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.classList.remove('bg-gray-500');
            e.currentTarget.parentElement?.classList.remove('animate-pulse');
            e.currentTarget.parentElement?.classList.add('bg-red-500');
          }}
        />
      </div>
    );
  } else {
    return <div className="bg-blue-600 w-8 h-8 rounded-full"></div>;
  }
}

function getTime(time: number) {
  const hours = ('0' + new Date(time).getHours()).slice(-2);
  const minutes = ('0' + new Date(time).getMinutes()).slice(-2);
  const seconds = ('0' + new Date(time).getSeconds()).slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

function LobbyMessage(message: messageType) {
  return (
    <div className={`w-min max-w-full bg-white rounded-xl my-2`}>
      <div className="grid items-center p-1" style={{ gridTemplateColumns: '32px 1fr 80px' }}>
        {renderImage(message.avatar)}
        <p className="ml-2">{message.nickname.substr(0, 25)}</p>
        <p className="ml-4 text-xs">{getTime(message.time)}</p>
      </div>
      <div className="p-1 -mt-2">
        <p className="break-words">{message.message}</p>
      </div>
    </div>
  );
}

export default LobbyMessage;
