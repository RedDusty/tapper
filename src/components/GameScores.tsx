import { dotType, scoreType, userInfoType } from "../redux/types";
import { useTypedSelector } from "../redux/useTypedSelector";
import { renderImage } from "./Lobby/Lobby";
import UserSkin from "./Helpers/UserSkin";
import { useTranslation } from 'react-i18next';

function GameScores() {
  const game = useTypedSelector((state) => state.game);
  const lobby = useTypedSelector((state) => state.lobby);
  const { t } = useTranslation()
  return (
    <div className="w-full">
      <div className="panelWidth mx-auto bg-gray-600 lg:rounded-bl-md lg:rounded-br-md text-gray-200 font-bold flex shadow">
        <div className="bg-gray-500 rounded-md w-full text-lg p-1 m-2 flex gap-x-2 justify-evenly">
          <p>
            {lobby.fieldX +
              "x" +
              lobby.fieldY +
              ` (${Number(lobby.fieldX) * Number(lobby.fieldY)})`}
          </p>
          <p>{lobby.inLobbyPlayers + " / " + lobby.maxPlayers}</p>
          <p>{convertDateDifference(game.timeStart, game.timeEnd)}</p>
        </div>
      </div>
      <div className="panelWidth mx-auto mt-4 bg-gray-100 lg:rounded-md flex shadow flex-wrap">
        {countPlayersDots(game.dots, lobby.users).map((player) => {
          const isRanked = game.addScore !== null;
          const userScore = isRanked
            ? playerGetScore(
                player.user.uid!,
                game.addScore!,
                game.decreaseScore!
              )
            : {};
          return (
            <div
              className={`bg-gray-200 p-2 m-2 rounded-md shadow font-bold ${
                player.user.isLeft
                  ? "opacity-50 duration-200 hover:opacity-100"
                  : ""
              }`}
              key={"score" + player.user.nickname + "" + player.user.id}
            >
              <div className="flex items-center gap-x-2">
                <PlayerBlockDots {...player} />
              </div>
              <div className="flex justify-between items-center mt-1">
                {isRanked ? (
                  <PlayerBlockScore
                    user={player.user}
                    score={userScore as scoreType}
                  />
                ) : (
                  <></>
                )}
                {player.user.isLeft ? (
                  <p className="text-blue-900 font-bold">{t("LEFT")}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameScores;

type onePlayerType = {
  user: userInfoType;
  dotsCount: number;
};

const PlayerBlockDots: (player: onePlayerType) => JSX.Element = (player) => {
  const { t } = useTranslation()
  return (
    <>
      {renderImage(player.user.avatar)}
      <p className="hidden sm:block">
        {player.user.id === "system" ? t("BOT") : (player.user.nickname || "").slice(0, 16)}
      </p>
      <UserSkin
        key={player.user.nickname + "skin" + player.user.id}
        {...player.user.skin}
      />
      <p>{player.dotsCount}</p>
    </>
  );
};

const PlayerBlockScore: ({
  user,
  score,
}: {
  user: userInfoType;
  score: scoreType;
}) => JSX.Element = ({ user, score }) => {
  const isPlus = score.scoreChange === "add" ? true : false;
  return (
    <div className="flex flex-col">
      <p className="block sm:hidden">{(user.nickname || "").slice(0, 16)}</p>
      <div className="flex justify-center">
        <p>{user.score?.toFixed(3)}</p>
        <p className={`ml-2 ${isPlus ? "text-green-500" : "text-red-500"}`}>
          {(isPlus ? "+" : "") + score.score.toFixed(0)}
        </p>
      </div>
    </div>
  );
};

function convertDateDifference(start: number, end: number) {
  const diff = new Date(end - start);
  const MM = ("0" + diff.getUTCMinutes()).slice(-2);
  const SS = ("0" + diff.getUTCSeconds()).slice(-2);

  return String(MM + ":" + SS);
}

function countPlayersDots(dots: dotType[], users: userInfoType[]) {
  const temp: onePlayerType[] = [];

  let onePlayer: onePlayerType;

  let count = 0;

  users.forEach((user) => {
    onePlayer = {
      user: user,
      dotsCount: 0,
    };
    dots.forEach((dot) => {
      if (dot.user?.uid === user.uid) {
        count++;
      }
    });
    onePlayer.dotsCount = count;
    temp.push(onePlayer);

    count = 0;
    onePlayer = {} as onePlayerType;
  });

  return temp;
}

function playerGetScore(
  userUID: string,
  addScore: scoreType[],
  decreaseScore: scoreType[]
) {
  let temp;

  temp = addScore.filter((score) => score.user.uid === userUID);

  if (temp[0]) {
    temp[0].scoreChange = "add";
    return temp[0];
  } else {
    temp = decreaseScore.filter((score) => score.user.uid === userUID);
    temp[0].scoreChange = "decrease";
    return temp[0];
  }
}
