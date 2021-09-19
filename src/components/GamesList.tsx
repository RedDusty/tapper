import { NavLink } from 'react-router-dom';
import { lobbyType } from '../redux/types';
import { useTypedSelector } from '../redux/useTypedSelector';
import { useDispatch } from 'react-redux';
import socket from '../socketio';
import { lobbySet } from '../redux/actions/lobbyActions';
const games = [
  {
    nickname: 'Aboba',
    shape: 'square',
    players: '1/2',
    rounds: 1,
    field: '5x5'
  },
  {
    nickname: 'Aarqqf',
    shape: 'square',
    players: '1/2',
    rounds: 1,
    field: '5x5'
  },
  {
    nickname: 'Chona',
    shape: 'square',
    players: '1/2',
    rounds: 1,
    field: '6x6'
  },
  {
    nickname: 'Igigig',
    shape: 'square',
    players: '1/2',
    rounds: 1,
    field: '3x3'
  },
  {
    nickname: 'Bibi',
    shape: 'square',
    players: '1/2',
    rounds: 1,
    field: '9x9'
  }
];

function GamesList() {
  const { user } = useTypedSelector((state) => state);

  const dispatch = useDispatch();

  const renderGames = games.map((game) => {
    let colorRounds = 'text-black';
    if (game.rounds > 1) colorRounds = 'text-green-800';
    if (game.rounds >= 3) colorRounds = 'text-blue-800';
    if (game.rounds >= 5) colorRounds = 'text-yellow-800';
    if (game.rounds >= 7) colorRounds = 'text-red-800';

    let colorField = 'text-black';
    let fieldNums = game.field.split('x');

    if (Number(fieldNums[0]) * Number(fieldNums[1]) > 25) colorField = 'text-green-800';
    if (Number(fieldNums[0]) * Number(fieldNums[1]) >= 49) colorField = 'text-blue-800';
    if (Number(fieldNums[0]) * Number(fieldNums[1]) >= 81) colorField = 'text-yellow-800';
    if (Number(fieldNums[0]) * Number(fieldNums[1]) >= 144) colorField = 'text-red-800';

    let colorPlayers = 'text-black';
    let playerNums = game.field.split('/');

    if (Number(playerNums[1]) > 1) colorPlayers = 'text-green-800';
    if (Number(playerNums[1]) >= 3) colorPlayers = 'text-blue-800';
    if (Number(playerNums[1]) >= 5) colorPlayers = 'text-yellow-800';
    if (Number(playerNums[1]) >= 7) colorPlayers = 'text-red-800';

    let shapeColor = 'text-green-800';

    if (game.shape === 'triangle') shapeColor = 'text-yellow-800';
    if (game.shape === 'circle') shapeColor = 'text-blue-800';
    if (game.shape === 'random') shapeColor = 'text-red-800';

    return (
      <div className="grid p-4 mx-4 my-2 grid-cols-5 font-bold hover:bg-gray-200">
        <p>{game.nickname}</p>
        <p className={shapeColor}>{game.shape[0].toUpperCase() + game.shape.slice(1)}</p>
        <p className={colorPlayers}>{game.players}</p>
        <p className={colorRounds}>{game.rounds}</p>
        <p className={colorField}>{game.field + ` (${Number(fieldNums[0]) * Number(fieldNums[1])})`}</p>
      </div>
    );
  });
  return (
    <div className="w-full">
      <div className="max-w-screen-xm my-0 mx-auto">
        <div className="flex justify-evenly mt-4">
          <NavLink to="/" className="button button-green">
            Main
          </NavLink>
          <NavLink
            to="/lobby"
            className="button button-yellow"
            onClick={() => {
              if (user.id) {
                console.log('create');

                dispatch(
                  lobbySet({
                    field: '3x3',
                    ownerID: user.id!,
                    nickname: user.nickname,
                    players: '1/2',
                    rounds: 1,
                    shape: 'square',
                    users: [user],
                    code: ''
                  })
                );
                socket.emit('LOBBY_CREATE', {
                  field: '3x3',
                  ownerID: user.id,
                  nickname: user.nickname,
                  players: '1/2',
                  rounds: 1,
                  shape: 'square',
                  users: [user]
                } as lobbyType);
              }
            }}
          >
            Create
          </NavLink>
        </div>
        <div>{renderGames}</div>
      </div>
    </div>
  );
}

export default GamesList;
