import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { logOut, signInWithGoogle } from "../firebase";
import { useTypedSelector } from "../redux/useTypedSelector";
import { renderImage } from "./Lobby/Lobby";
import StartPageLogo from "./Helpers/StartPageLogo";
import { getServerID, getSocket } from "../socketio";
import ErrorWindow from "./ErrorWindow";

function StartPage({
  isKick,
  setKick,
}: {
  isKick: boolean;
  setKick: (v: boolean) => void;
}) {
  const [isError] = useState<boolean>(!("IntersectionObserver" in window));
  const [isVisibleError, setVisibilityError] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const { code } = useTypedSelector((state) => state.lobby);
  const user = useTypedSelector((state) => state.user);

  const renderGame = () => {
    if (
      code &&
      code.length === 6 &&
      user.uid &&
      user.uid !== null &&
      user.uid !== undefined &&
      isError === false
    ) {
      return (
        <Link to="/lobby" className="button button-yellow">
          {t("LOBBY")}
        </Link>
      );
    } else if (
      user.uid &&
      user.uid !== null &&
      user.uid !== undefined &&
      isError === false
    ) {
      return (
        <Link to="/games" className="button button-yellow">
          {t("PLAY")}
        </Link>
      );
    } else if (isError) {
      return <></>;
    } else {
      return <></>;
    }
  };

  const renderUser = () => {
    if (user.uid && user.uid !== null && user.uid !== undefined) {
      return (
        <>
          <div>
            <div className="flex items-center">
              {renderImage(user.avatar)}
              <p className="ml-2 font-bold">
                {(user.nickname || user.uid).slice(0, 16)}
              </p>
            </div>
          </div>
          <button
            className="button button-red"
            onClick={() => {
              logOut();
              getSocket().emit("USER_LOGOUT");
            }}
          >
            {t("LOGOUT")}
          </button>
        </>
      );
    } else {
      return (
        <button
          className="button button-green"
          onClick={() => signInWithGoogle()}
        >
          {t("LOGIN")}
        </button>
      );
    }
  };

  const renderOtherInfo = () => {
    let userScore = <></>;
    if (user.uid && user.uid !== null && user.uid !== undefined) {
      const color = () => {
        if (user.score && user.score > 0) return "text-green-600";
        if (user.score && user.score < 0) return "text-red-600";
        return "text-gray-600";
      };
      userScore = (
        <div className="flex items-center">
          <p className="text-black">{t("YOUR_SCORE")}</p>
          <p className={`${color()} ml-2`}>{(user.score || 0).toFixed(3)}</p>
        </div>
      );
    }
    return (
      <div className="font-bold">
        <>{userScore}</>
        <p className="text-blue-900">
          {t("SERVER")} {"Tapper-" + getServerID()}
        </p>
        <div className="flex gap-2 mt-2">
          <button
            className="button-sky rounded-md p-1 font-bold"
            onClick={() => {
              i18n.changeLanguage("ru");
            }}
          >
            Русский
          </button>
          <button
            className="button-sky rounded-md p-1 font-bold"
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          >
            English
          </button>
        </div>
      </div>
    );
  };

  const renderOptions = () => {
    if (user.uid && user.uid !== null && user.uid !== undefined) {
      return (
        <>
          <Link to="/skins" className="button button-green">
            {t("SKINS")}
          </Link>
          <Link to="/userGames" className="button button-green">
            {t("USER_GAMES")}
          </Link>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <StartPageLogo />
      <div className="flex mt-4 gap-4 items-center justify-center">
        <Link to="/faq" className="button button-sky text-center">
          {t("FAQ")}
        </Link>
        <Link to="/gChat" className="button button-sky text-center">
          {t("GLOBAL_CHAT")}
        </Link>
      </div>
      <div className="flex mt-4 gap-4">
        <Link to="/score" className="button button-yellow">
          {t("SCORE")}
        </Link>
        {renderGame()}
      </div>
      <div className="flex mt-4 gap-4 items-center justify-center">
        {renderOptions()}
      </div>
      <div className="flex mt-4 gap-4 items-center justify-center">
        {renderUser()}
      </div>
      <div className="flex mt-4 gap-4 items-center justify-center">
        {renderOtherInfo()}
      </div>
      {isKick ? (
        <div className="fixed w-screen h-screen z-10 flex items-center justify-center bg-red-300 bg-opacity-75">
          <div className="bg-red-100 text-red-900 font-bold w-min rounded-md gap-4 flex flex-col items-center justify-center p-8">
            <p className="w-36">{t("KICKED_OUT")}</p>
            <button
              className="button button-red"
              onClick={() => {
                setKick(false);
              }}
            >
              {t("CLOSE")}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <ErrorWindow
        isError={isError}
        isVisibleError={isVisibleError}
        setVisibilityError={setVisibilityError}
      />
    </div>
  );
}

export default StartPage;
