import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { lobbyUsersType } from '../../redux/types';
import { useTypedSelector } from '../../redux/useTypedSelector';
import socket from '../../socketio';
import { lobbyShortType } from '../GamesList';
import { renderImage } from './Lobby';

function LobbyItem(lobby: lobbyShortType) {
  const user = useTypedSelector((state) => state.user);

  const { t } = useTranslation();

  let colorRounds = 'text-black';
  if (Number(lobby.rounds) > 1) colorRounds = 'text-green-800';
  if (Number(lobby.rounds) >= 3) colorRounds = 'text-blue-800';
  if (Number(lobby.rounds) >= 5) colorRounds = 'text-yellow-800';
  if (Number(lobby.rounds) >= 7) colorRounds = 'text-red-800';

  let colorField = 'text-black';

  if (Number(lobby.fieldX) * Number(lobby.fieldY) > 25) colorField = 'text-green-800';
  if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 49) colorField = 'text-blue-800';
  if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 81) colorField = 'text-yellow-800';
  if (Number(lobby.fieldX) * Number(lobby.fieldY) >= 144) colorField = 'text-red-800';

  let colorPlayers = 'text-black';

  if (Number(lobby.maxPlayers) > 1) colorPlayers = 'text-green-800';
  if (Number(lobby.maxPlayers) >= 3) colorPlayers = 'text-blue-800';
  if (Number(lobby.maxPlayers) >= 5) colorPlayers = 'text-yellow-800';
  if (Number(lobby.maxPlayers) >= 7) colorPlayers = 'text-red-800';

  let shapeColor = 'text-green-800';

  if (lobby.shape === 'triangle') shapeColor = 'text-yellow-800';
  if (lobby.shape === 'circle') shapeColor = 'text-blue-800';
  if (lobby.shape === 'random') shapeColor = 'text-red-800';

  return (
    <div className="p-2 m-2 grid grid-cols-4 items-center hover:bg-gray-200">
      <div className="flex items-center font-bold">
        {renderImage(lobby.avatar)}
        <p className="ml-1">{lobby.nickname}</p>
      </div>
      <div className="flex flex-col ml-4 text-sm">
        <div className="flex flex-row">
          <p className={`${colorRounds}`}>{lobby.rounds}</p>
          <p className={`ml-2 ${colorField}`}>
            {lobby.fieldX + 'x' + lobby.fieldY + ` (${Number(lobby.fieldX) * Number(lobby.fieldY)})`}
          </p>
        </div>
        <p className={`${shapeColor}`}>{t(`SHAPE_${lobby.shape.toUpperCase()}`)}</p>
      </div>
      <div className={`${colorPlayers} text-xl font-bold`}>{lobby.inLobbyPlayers + '/' + lobby.maxPlayers}</div>
      <Link
        to="/lobby"
        className="ml-2 button button-yellow"
        onClick={() => {
          if (lobby.inLobbyPlayers < lobby.maxPlayers) {
            // if (user.uid.length > 0 && user.id) {
              socket.emit('LOBBY_USERS', {
                action: 'userJoin',
                code: lobby.code,
                ownerUID: lobby.ownerUID,
                user: user
              } as lobbyUsersType);
            //}
          }
        }}
      >
        {lobby.code}
      </Link>
    </div>
  );
}

export default LobbyItem;
