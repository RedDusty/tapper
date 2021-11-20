import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { lobbyType } from "../../redux/types";

const FAQLobbyTab = (lobby: lobbyType) => {
  const { t, i18n } = useTranslation();
  const renderLobbyLink = () => {
    let lobbyText = t("LOBBY");
    if (i18n.language === "ru") {
      lobbyText = t("LOBBY_1");
    }
    if (lobby.code.length !== 0) {
      return (
        <Link to="/lobby" className="text-green-700 underline lowercase">
          {lobbyText}
        </Link>
      );
    } else {
      return <span className="lowercase">{lobbyText}</span>;
    }
  };
  const renderUsersCount = () => {
    if (lobby.code.length === 0) {
      return (
        <p className="mt-2">
          {t("FAQ_RATING_SYSTEM_CHECK_1")}.{" "}
          <span className="text-yellow-700">
            {t("FAQ_RATING_SYSTEM_CHECK_2")}.
          </span>
        </p>
      );
    }
    if (lobby.users.length > 1) {
      return (
        <p className="mt-2">
          {t("FAQ_RATING_SYSTEM_CHECK_3")} {lobby.users.length}{" "}
          {t("FAQ_RATING_SYSTEM_CHECK_4")}.{" "}
          <span className="text-green-700">
            {t("FAQ_RATING_SYSTEM_CHECK_5")}.
          </span>
        </p>
      );
    } else {
      return (
        <p className="mt-2">
          {t("FAQ_RATING_SYSTEM_CHECK_6")}.{" "}
          <span className="text-red-700">
            {t("FAQ_RATING_SYSTEM_CHECK_7")}.
          </span>
        </p>
      );
    }
  };
  return (
    <div className="text-sky-900 font-bold w-full">
      <div className="mt-4">
        <p className="mt-2">{t("FAQ_RATING_SYSTEM_CHECK_8")}.</p>
        {renderUsersCount()}
        <p className="mt-2">
          {t("FAQ_NOTIF_LOBBY_1")} {renderLobbyLink()} {t("FAQ_NOTIF_LOBBY_2")}.
        </p>
      </div>
    </div>
  );
};

export default FAQLobbyTab;
