import { NavLink } from 'react-router-dom';
import { lobbyType } from '../redux/types';
import { useTypedSelector } from '../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import socket from '../socketio';
import { lobbySet } from '../redux/actions/lobbyActions';
import { useEffect, useState } from 'react';

function GamesList() {
  const { user } = useTypedSelector((state) => state);
  const [lobbyList, setLobbyList] = useState<lobbyType[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('LOBBY_GET', (lobbyListArray) => {
      setLobbyList(lobbyListArray);
    });
    return () => {
      socket.off('LOBBY_GET');
    };
  }, []);

  const renderLobbyList = lobbyList.map((lobby) => {
    let colorRounds = 'text-black';
    if (lobby.rounds > 1) colorRounds = 'text-green-800';
    if (lobby.rounds >= 3) colorRounds = 'text-blue-800';
    if (lobby.rounds >= 5) colorRounds = 'text-yellow-800';
    if (lobby.rounds >= 7) colorRounds = 'text-red-800';

    let colorField = 'text-black';
    let fieldNums = lobby.field.split('x');

    if (Number(fieldNums[0]) * Number(fieldNums[1]) > 25) colorField = 'text-green-800';
    if (Number(fieldNums[0]) * Number(fieldNums[1]) >= 49) colorField = 'text-blue-800';
    if (Number(fieldNums[0]) * Number(fieldNums[1]) >= 81) colorField = 'text-yellow-800';
    if (Number(fieldNums[0]) * Number(fieldNums[1]) >= 144) colorField = 'text-red-800';

    let colorPlayers = 'text-black';

    if (lobby.maxPlayers > 1) colorPlayers = 'text-green-800';
    if (lobby.maxPlayers >= 3) colorPlayers = 'text-blue-800';
    if (lobby.maxPlayers >= 5) colorPlayers = 'text-yellow-800';
    if (lobby.maxPlayers >= 7) colorPlayers = 'text-red-800';

    let shapeColor = 'text-green-800';

    if (lobby.shape === 'triangle') shapeColor = 'text-yellow-800';
    if (lobby.shape === 'circle') shapeColor = 'text-blue-800';
    if (lobby.shape === 'random') shapeColor = 'text-red-800';

    return (
      <div className="grid p-4 mx-4 my-2 grid-cols-5 font-bold hover:bg-gray-200">
        <p>{lobby.nickname}</p>
        <p className={shapeColor}>{lobby.shape[0].toUpperCase() + lobby.shape.slice(1)}</p>
        <p className={colorPlayers}>{lobby.inLobbyPlayers + '/' + lobby.maxPlayers}</p>
        <p className={colorRounds}>{lobby.rounds}</p>
        <p className={colorField}>{lobby.field + ` (${Number(fieldNums[0]) * Number(fieldNums[1])})`}</p>
      </div>
    );
  });
  return (
    <div className="w-full">
      <div className="max-w-full-xm my-0 mx-auto">
        <div className="flex justify-evenly mt-4">
          <NavLink to="/" className="button button-green">
            Main
          </NavLink>
          <NavLink
            to="/lobby"
            className="button button-yellow"
            onClick={() => {
              if (user.id) {
                dispatch(
                  lobbySet({
                    field: '3x3',
                    ownerID: user.id,
                    nickname: user.nickname,
                    inLobbyPlayers: 1,
                    maxPlayers: 2,
                    messages: [],
                    rounds: 1,
                    shape: 'square',
                    users: [user],
                    code: '',
                    isPrivate: true
                  })
                );
                socket.emit('LOBBY_CREATE', {
                  field: '3x3',
                  ownerID: user.id,
                  nickname: user.nickname,
                  inLobbyPlayers: 1,
                  maxPlayers: 2,
                  messages: [],
                  rounds: 1,
                  shape: 'square',
                  users: [user],
                  code: '',
                  isPrivate: true
                } as lobbyType);
              }
            }}
          >
            Create
          </NavLink>
        </div>
        <div>{renderLobbyList}</div>
      </div>
    </div>
  );
}

export default GamesList;
