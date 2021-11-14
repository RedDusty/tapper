import { GmessageType } from "../../../redux/types";
import { renderImage } from "../../Lobby/Lobby";

function getTime(time: number) {
  const hours = ("0" + new Date(time).getHours()).slice(-2);
  const minutes = ("0" + new Date(time).getMinutes()).slice(-2);
  const seconds = ("0" + new Date(time).getSeconds()).slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

const GChatMessage = (message: GmessageType) => {
  if (message.uid !== null && typeof message.uid === "string") {
    return (
      <div className="min-w-min max-w-max bg-blue-100 rounded-xl my-2">
        <div
          className="grid items-center p-1"
          style={{ gridTemplateColumns: "32px 1fr 80px" }}
        >
          {renderImage(message.avatar)}
          <p className="ml-2">{message.nickname!.substr(0, 25)}</p>
          <p className="ml-4 text-xs">{getTime(message.time)}</p>
        </div>
        <div className="p-1 -mt-2">
          <p className="break-all">{message.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-w-min max-w-max bg-blue-50 rounded-xl my-2">
      <div
        className="grid items-center p-1"
        style={{ gridTemplateColumns: "1fr 80px" }}
      >
        <p>{"Anon"}</p>
        <p className="ml-4 text-xs">{getTime(message.time)}</p>
      </div>
      <div className="p-1 -mt-2">
        <p className="break-all">{message.message}</p>
      </div>
    </div>
  );
};

export default GChatMessage;
