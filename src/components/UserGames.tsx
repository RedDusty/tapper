import React from "react";
import { useDispatch } from "react-redux";
import { GuserGamesSet } from "../redux/actions/globalActions";
import { useTypedSelector } from "../redux/useTypedSelector";
import { getSocket } from "../socketio";
import UserGameItem from "./Helpers/Global/UserGameItem";

const UserGames = () => {
  const dispatch = useDispatch();
  const userGames = useTypedSelector((state) => state.global.userGames);
  const userUID = useTypedSelector((state) => state.user.uid);
  React.useEffect(() => {
    getSocket().emit("USER_GAMES_LIST", userUID);
    getSocket().on("USER_GAMES_LIST_GET", (data) => {
      dispatch(GuserGamesSet(data));
    });
    return () => {
      getSocket().off("USER_GAMES_LIST_GET");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="flex flex-col items-center overflow-auto panelWidth mx-auto p-2"
      style={{ height: window.innerHeight - 48 }}
    >
      {userGames.map((g, index) => {
        return <UserGameItem userGame={g} userGameIndex={index} key={"userGame" + index} />;
      })}
    </div>
  );
};

export default UserGames;
