import { messageType } from "../../../redux/types";
import { renderImage } from "../Lobby";

function getTime(time: number) {
  const hours = ("0" + new Date(time).getHours()).slice(-2);
  const minutes = ("0" + new Date(time).getMinutes()).slice(-2);
  const seconds = ("0" + new Date(time).getSeconds()).slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

function LobbyMessage(message: messageType) {
  if (message.id === "system") {
    return (
      <div className="flex items-center font-bold">
        <p className="text-blue-200">System: </p>
        <p className="text-white ml-2">{message.message}</p>
        <p className="ml-2 text-blue-200 font-normal text-xs">
          {getTime(message.time)}
        </p>
      </div>
    );
  } else {
    return (
      <div className="min-w-min max-w-max bg-blue-100 rounded-xl my-2">
        <div
          className="grid items-center p-1"
          style={{ gridTemplateColumns: "32px 1fr 80px" }}
        >
          {renderImage(message.avatar)}
          <p className="ml-2">{message.nickname.substr(0, 25)}</p>
          <p className="ml-4 text-xs">{getTime(message.time)}</p>
        </div>
        <div className="p-1 -mt-2">
          <p className="break-all">{message.message}</p>
        </div>
      </div>
    );
  }
}

export default LobbyMessage;
