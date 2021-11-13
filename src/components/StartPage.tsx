import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { logOut, signInWithGoogle } from "../firebase";
import { useTypedSelector } from "../redux/useTypedSelector";
import { renderImage } from "./Lobby/Lobby";
import StartPageLogo from "./Helpers/StartPageLogo";
import { getServerID } from "../socketio";
import ErrorWindow from "./ErrorWindow";

function StartPage() {
  const [isError] = useState<boolean>(!("IntersectionObserver" in window));
  const [isVisibleError, setVisibilityError] = useState<boolean>(false);
  const { t } = useTranslation();

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
          <button className="button button-red" onClick={() => logOut()}>
            {t("LOG_OUT")}
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
          <p className="text-black">Your score:</p>
          <p className={`${color()} ml-2`}>{(user.score || 0).toFixed(3)}</p>
        </div>
      );
    }
    return (
      <div className="font-bold">
        <>{userScore}</>
        <p className="text-blue-900">Server: {"Tapper-" + getServerID()}</p>
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
          <Link to="/replays" className="button button-green">
            {t("REPLAYS")}
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
      <div className="flex mt-4">
        <Link to="/faq" className="button button-sky w-16 text-center">
          FAQ
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
      <ErrorWindow
        isError={isError}
        isVisibleError={isVisibleError}
        setVisibilityError={setVisibilityError}
      />
    </div>
  );
}

export default StartPage;
