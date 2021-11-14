import { useEffect, useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from 'redux';
import { fbGetUserScore } from "../../firebase";
import { gameSet } from "../../redux/actions/gameActions";
import { lobbySet } from "../../redux/actions/lobbyActions";
import { userSetScore } from "../../redux/actions/userActions";
import { initialGameReducer } from "../../redux/reducers/gameReducer";
import { initialLobbyState } from "../../redux/reducers/lobbyReducer";
import { useTypedSelector } from "../../redux/useTypedSelector";

function InfoButton() {
  const { pathname } = useLocation();
  const [render, setRender] = useState(<></>);
  const { t } = useTranslation();

  const gameEnd = useTypedSelector((state) => state.game.time.end);
  const visibility = useTypedSelector((state) => state.lobby.visibility);
  const userUID = useTypedSelector((state) => state.user.uid!);

  const dispatch = useDispatch();

  const clickHandler = () => {
    switch (pathname) {
      case "/game-score":
        dispatch(lobbySet(initialLobbyState));
        dispatch(gameSet(initialGameReducer));
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (
      pathname === "/skins" ||
      pathname === "/score" ||
      pathname === "/replays" ||
      pathname === "/games" ||
      pathname === "/game-score" ||
      pathname === "/faq"
    ) {
      setRender(toLocation(t, "", clickHandler, pathname, dispatch, userUID));
    } else if (gameEnd !== 0) {
      setRender(toLocation(t, "game-score", clickHandler, pathname, dispatch, userUID));
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
  pathname: string,
  dispatch: Dispatch<any>,
  userUID: string
) => JSX.Element = (t, location, clickHandler, pathname, dispatch, userUID) => {
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

  if (pathname === "/game-score") {
    const setScore = async () => {
      const newScore = await fbGetUserScore(userUID!);
      console.log(newScore);
      
      dispatch(userSetScore(newScore));
    };

    setScore();
  }

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
