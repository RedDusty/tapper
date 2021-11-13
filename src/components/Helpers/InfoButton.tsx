import { useEffect, useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { gameSet } from "../../redux/actions/gameActions";
import { lobbySet } from "../../redux/actions/lobbyActions";
import { gameReducerType, lobbyType } from "../../redux/types";
import { useTypedSelector } from "../../redux/useTypedSelector";

function InfoButton() {
  const { pathname } = useLocation();
  const [render, setRender] = useState(<></>);
  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  const user = useTypedSelector((state) => state.user);
  const gameEnd = useTypedSelector((state) => state.game.time.end);
  const visibility = useTypedSelector((state) => state.lobby.visibility);

  const dispatch = useDispatch();

  const clickHandler = () => {
    switch (pathname) {
      case "/game-score":
        dispatch(
          lobbySet({
            fieldX: "3",
            fieldY: "3",
            ownerUID: user.uid!,
            nickname:
              user.nickname?.slice(0, 16) ||
              user.uid?.slice(0, 16) ||
              user.id!.slice(0, 16),
            inLobbyPlayers: "1",
            maxPlayers: "2",
            messages: [
              {
                avatar: "system",
                code: "",
                id: "system",
                message:
                  "Score is only works in public games with other players.",
                nickname: "System",
                time: Date.now(),
                uid: "system",
              },
            ],
            users: [user],
            code: "",
            visibility: "private",
            isStarted: false,
            startsIn: 10,
          } as lobbyType)
        );
        dispatch(
          gameSet({
            addScore: null,
            decreaseScore: null,
            dots: [],
            replay: [],
            time: { end: 0, start: 0 },
          } as gameReducerType)
        );
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (
      pathname !== "/lobby" &&
      lobby.code &&
      lobby.code.length === 6 &&
      lobby.visibility !== "game" &&
      gameEnd === 0
    ) {
      setRender(toLocation(t, "lobby", clickHandler, pathname));
    } else if (pathname === "/lobby" && lobby.visibility !== "game") {
      setRender(toLocation(t, "", clickHandler, pathname));
    } else if (
      pathname === "/skins" ||
      pathname === "/score" ||
      pathname === "/replays" ||
      pathname === "/games" ||
      pathname === "/game-score" ||
      pathname === "/faq"
    ) {
      setRender(toLocation(t, "", clickHandler, pathname));
    } else if (gameEnd !== 0) {
      setRender(toLocation(t, "game-score", clickHandler, pathname));
    } else {
      setRender(<></>);
    }
    // eslint-disable-next-line
  }, [pathname, visibility, gameEnd]);
  return render;
}

export default InfoButton;

const toLocation: (
  t: TFunction<"translation">,
  location: string,
  clickHandler: () => void,
  pathname: string
) => JSX.Element = (t, location, clickHandler, pathname) => {
  const text = () => {
    switch (location) {
      case "lobby":
        return "LOBBY";
      case "":
        return "MAIN";
      case "game-score":
        return "GAME-SCORE";
      default:
        return "";
    }
  };
  
  return (
    <Link
      className={`rounded-md px-2 m-2 font-bold flex items-center justify-center ${
        pathname === "/faq" ? "button-sky" : "button-green"
      }`}
      to={"/" + location}
      onClick={clickHandler}
    >
      {t(text())}
    </Link>
  );
};
