import { userInfoType } from "../../redux/types";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { renderImage } from "../Lobby/Lobby";
import Timer from "./Timer";

function LoadingWindow({ canStart }: { canStart: boolean }) {
  const users = useTypedSelector((state) => state.lobby.users);
  return (
    <div className="w-screen h-screen fixed bg-black bg-opacity-25 flex justify-center items-center top-0 left-0">
      {canStart ? <Timer /> : usersLoading(users)}
    </div>
  );
}

const usersLoading = (users: userInfoType[]) => {
  return (
    <div className="bg-white rounded-md p-4">
      {users.map((user) => {
        const nickname = () => {
          if (user.nickname!.length > 16) {
            return <p>{user.nickname!.slice(0, 16) + "..."}</p>;
          } else if (user.nickname!.length === 0) {
            return <p>{user.uid!.slice(0, 16)}</p>;
          } else {
            return <p>{user.nickname}</p>;
          }
        };
        const loadingColor = () => {
          if (user.isLeft || user.id === "system") return "bg-blue-200";
          if (user.isLoaded) return "bg-green-200";
          return "userLoading";
        }
        return (
          <div
            className={`grid justify-center items-center gap-x-2 my-2 py-1 px-2 rounded-md ${loadingColor()}`}
            style={{ gridTemplateColumns: "32px 160px 70px" }}
            key={user.uid}
          >
            {renderImage(user.avatar)}
            {nickname()}
            <p>
              {(() => {
                if (user.isLoaded) {
                  if (user.isLeft) return "Left";
                  if (!user.isLeft) return "Done";
                } else {
                  return "Loading...";
                }
              })()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LoadingWindow;
