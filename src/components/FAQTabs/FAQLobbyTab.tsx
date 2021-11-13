import { Link } from "react-router-dom";
import { lobbyType } from '../../redux/types';

const FAQLobbyTab = (lobby: lobbyType) => {
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
  const renderUsersCount = () => {
    if (lobby.code.length === 0) {
      return (
        <p className="mt-2">
          You are not currently in the lobby.{" "}
          <span className="text-yellow-700">
            The rating system availability check is not available.
          </span>
        </p>
      );
    }
    if (lobby.users.length > 1) {
      return (
        <p className="mt-2">
          There are currently {lobby.users.length} people in the lobby.{" "}
          <span className="text-green-700">The rating system works.</span>
        </p>
      );
    } else {
      return (
        <p className="mt-2">
          At the moment, only you are in the lobby.{" "}
          <span className="text-red-700">The rating system does not work.</span>
        </p>
      );
    }
  };
  return (
    <div className="text-sky-900 font-bold w-full">
      <div className="mt-4">
        <p className="mt-2">
          The rating system does not work in single player mode.
        </p>
        {renderUsersCount()}
        <p className="mt-2">
          When the {renderLobbyLink()} settings are changed, a notification will
          be sent to the chat.
        </p>
      </div>
    </div>
  );
};

export default FAQLobbyTab;
