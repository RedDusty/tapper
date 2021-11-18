import { UGScoreType, UGType, userInfoType } from "../../../redux/types";
import { renderImage } from "../../Lobby/Lobby";
import UserSkin from "../UserSkin";

type UserGameDetailsType = ({ userGame }: { userGame: UGType }) => JSX.Element;

const UserGameDetails: UserGameDetailsType = ({ userGame }) => {
  const isRanked = () => {
    const hasBot = userGame.users.filter((user) => user.uid === "system");
    if (userGame.users.length > 1 && hasBot.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="w-full">
      <div className="flex w-full">
        {countPlayersDots(userGame).map((user) => {
          const userScore = isRanked()
            ? playerGetScore(
                user.user.uid!,
                userGame.score.addScore,
                userGame.score.decreaseScore!,
                userGame
              )
            : {};
          return (
            <div
              className={`bg-white p-2 m-2 rounded-md shadow font-bold ${
                user.user.isLeft
                  ? "opacity-50 duration-200 hover:opacity-100"
                  : ""
              }`}
              key={"score" + user.user.nickname + "" + user.user.id}
            >
              <div className="flex items-center gap-x-2">
                <PlayerBlockDots {...user} />
              </div>
              <div className="flex justify-between items-center mt-1">
                {isRanked() ? (
                  <PlayerBlockScore
                    user={user.user}
                    score={userScore as UGScoreType}
                  />
                ) : (
                  <></>
                )}
                {user.user.isLeft ? (
                  <p className="text-blue-900 font-bold">Left</p>
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
};

type onePlayerType = {
  user: userInfoType;
  dotsCount: number;
};

const countPlayersDots = (userGame: UGType) => {
  const players: onePlayerType[] = [];

  userGame.users.forEach((user, index) => {
    let counter = 0;
    let player = {
      user: user,
      dotsCount: counter,
    };
    userGame.dots.forEach((dot) => {
      if (userGame.users[dot.user!].uid === user.uid) {
        counter++;
      }
    });
    player.dotsCount = counter;
    players.push(player);
  });

  return players;
};

const PlayerBlockDots: (player: onePlayerType) => JSX.Element = (player) => {
  return (
    <>
      {renderImage(player.user.avatar)}
      <p className="hidden sm:block">
        {(player.user.nickname || "").slice(0, 16)}
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
  score: UGScoreType;
}) => JSX.Element = ({ user, score }) => {
  return (
    <div className="flex flex-col">
      <p className="block sm:hidden">{(user.nickname || "").slice(0, 16)}</p>
      <div className="flex justify-center">
        <p>{user.score?.toFixed(3)}</p>
        <p
          className={`ml-2 ${
            score.score > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {(score.score > 0 ? "+" : "") + score.score.toFixed(0)}
        </p>
      </div>
    </div>
  );
};

function playerGetScore(
  userUID: string,
  addScore: UGScoreType[],
  decreaseScore: UGScoreType[],
  userGame: UGType
) {
  let temp;

  temp = addScore.filter((score) => userGame.users[score.user].uid === userUID);

  if (temp[0]) {
    return temp[0];
  } else {
    temp = decreaseScore.filter(
      (score) => userGame.users[score.user].uid === userUID
    );
    return temp[0];
  }
}

export default UserGameDetails;
