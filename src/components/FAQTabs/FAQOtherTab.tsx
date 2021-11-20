import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { lobbyType } from "../../redux/types";

const FAQOtherTab = (lobby: lobbyType) => {
  const { t, i18n } = useTranslation()
  const renderConnectionLink = () => {
    if (lobby.code.length === 0) {
      return (
        <Link to="/games" className="text-green-700 underline">
          {t("FAQ_TRY_CONNECTING")}
        </Link>
      );
    } else {
      return <span>{t("FAQ_TRY_CONNECTING")}</span>;
    }
  };
  const renderLobbyLink = () => {
    let lobbyText = t("LOBBY")
    if (i18n.language === "ru") {
      lobbyText = t("LOBBY_1")
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
  return (
    <div className="text-sky-900 font-bold w-full">
      <div className="mt-4">
        <p className="mt-2">
          {t("FAQ_SCORE_25_TOP")}{" "}
          <Link to="/score" className="text-green-700 underline">
            {t("FAQ_SCORE_TAB")}
          </Link>
          .
        </p>
        <p className="mt-2">
          {t("FAQ_LOBBIES_CANT_SEE_1")} {renderConnectionLink()} {t("FAQ_LOBBIES_CANT_SEE_2")}. {"("}{t("FAQ_LOBBIES_CANT_SEE_3")}{" "}
          <Link to="/" className="text-green-700 underline">
            {t("FAQ_MAIN_PAGE")}
          </Link>
          , {t("FAQ_CURRENT_SERVER")}{")"}
        </p>
        <p className="mt-2">
          {t("FAQ_CHAT_EVERYONE")}{" "}
          <Link to="/gChat" className="text-green-700 underline">
            {t("FAQ_GLOBAL_CHAT")}
          </Link>
          . {t("FAQ_MAXIMUM")}
        </p>
        <p className="mt-2">
          {t("FAQ_COPY_TEXT")} {renderLobbyLink()} {t("AND")}{" "}
          <Link to="/score" className="text-green-700 underline">
            {t("FAQ_SCORE_TAB")}
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default FAQOtherTab;
