import { Link } from "react-router-dom";
import { lobbyType } from '../../redux/types';

const FAQOtherTab = (lobby: lobbyType) => {
  const renderConnectionLink = () => {
    if (lobby.code.length === 0) {
      return (
        <Link to="/games" className="text-green-700 underline">
          try connecting
        </Link>
      );
    } else {
      return <span>try connecting</span>;
    }
  };
  const renderLobbyLink = () => {
    if (lobby.code.length !== 0) {
      return (
        <Link to="/lobby" className="text-green-700 underline">
          lobby
        </Link>
      );
    } else {
      return <span>lobby</span>;
    }
  };
  return (
    <div className="text-sky-900 font-bold w-full">
      <div className="mt-4">
        <p className="mt-2">
          Only the top 25 players are shown in the{" "}
          <Link to="/score" className="text-green-700 underline">
            score tab
          </Link>
          .
        </p>
        <p className="mt-2">
          If you do not see some lobbies, check if it is public or if you are on
          the same server or {renderConnectionLink()} by code. {"("}On the{" "}
          <Link to="/" className="text-green-700 underline">
            main page
          </Link>
          , your current server is listed at the bottom.{")"}
        </p>
        <p className="mt-2">
          Copy text is available only in the {renderLobbyLink()}.
        </p>
      </div>
    </div>
  );
};

export default FAQOtherTab;
