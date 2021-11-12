import { useEffect, useState } from "react";
import { userInfoType } from "../redux/types";
import socket from "../socketio";
import { renderImage } from "./Lobby/Lobby";
import UserSkin from "./UserSkin";

function Score() {
  const [users, setUsers] = useState<userInfoType[]>([]);

  useEffect(() => {
    socket.emit("SCORE_GET");
    socket.on("SCORE_RETURN", (users) => {
      setUsers(users);
    });
    return () => {
      socket.off("SCORE_RETURN");
    };
  }, []);

  return (
    <div className="panelWidth my-0 mx-auto">
      {users.map((user, index) => {
        return (
          <RenderUser
            user={user}
            key={user.firstLogin + index}
            index={index + 1}
          />
        );
      })}
    </div>
  );
}

export default Score;

const RenderUser: ({
  user,
  index,
}: {
  user: userInfoType;
  index: number;
}) => JSX.Element = ({ user, index }) => {
  const placeUnder = () => {
    if (index === 1) {
      return "bg-yellow-300 p-3";
    }
    if (index === 2) {
      return "bg-yellow-200 p-2";
    }
    if (index === 3) {
      return "bg-yellow-100 p-1";
    }

    return "bg-gray-200";
  };

  const placeUpper = () => {
    if (index === 1) {
      return "text-xl font-bold";
    }
    if (index === 2 || index === 3) {
      return "text-lg font-bold";
    }

    return "text-base";
  };

  return (
    <div
      className={`shadow-md rounded-xl m-2 min-w-min max-w-max mx-auto ${placeUpper()}`}
    >
      <div
        className={`w-full h-full rounded-xl p-2 flex items-center ${placeUnder()}`}
      >
        {renderImage(user.avatar)}
        <p className="ml-2">{(user.nickname || "").slice(0, 16)}</p>
        <UserSkin key={user.nickname + 'skin'} {...user.skin} />
        <p className="ml-2">{(user.score || 0).toFixed(3)}</p>
      </div>
    </div>
  );
};
