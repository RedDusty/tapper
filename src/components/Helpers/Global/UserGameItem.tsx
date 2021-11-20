import React from "react";
import { useTranslation } from 'react-i18next';
import { UGType } from "../../../redux/types";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import UserGameDetails from "./UserGameDetails";

type UserGameItemType = ({
  userGame,
  userGameIndex,
}: {
  userGame: UGType;
  userGameIndex: number;
}) => JSX.Element;

const UserGameItem: UserGameItemType = ({ userGame, userGameIndex }) => {
  const userUIDRedux = useTypedSelector((s) => s.user.uid);
  const [showDetails, setShowDetails] = React.useState<boolean>(false);
  const { bot, field, score, timeStart, users } = userGame;
  const currentUserIndex = users.findIndex((user) => user.uid === userUIDRedux);
  const curUser = users[currentUserIndex];
  const RDate = new Date(timeStart);
  const { t } = useTranslation()

  const userScore = () => {
    let scoreFind = score.addScore.filter((s) => s.user === currentUserIndex);
    if (scoreFind.length !== 0) {
      return scoreFind[0];
    } else {
      scoreFind = score.decreaseScore.filter(
        (s) => s.user === currentUserIndex
      );
      return scoreFind[0];
    }
  };

  const RenderRanked = () => {
    if (users.length > 1 && bot.isTurned === false) {
      return (
        <div className="flex items-center text-base">
          <p>{curUser.score}</p>
          <p className="ml-1 text-sm">{"=>"}</p>
          <p className="ml-1">{(curUser.score || 0) + userScore().score}</p>
          <p
            className={`ml-2 ${
              userScore().score > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {"(" + (userScore().score > 0 ? "+" : "") + userScore().score + ")"}
          </p>
        </div>
      );
    } else return <p>{t("STANDARD_GAME")}</p>;
  };

  const RenderUsers = () => {
    if (bot.isTurned === false) {
      return <p>{t("PLAYERS") + ": " + users.length}</p>;
    } else {
      let showDiff: string = bot.difficulty;
      showDiff = showDiff.replace(/easy/, t("BOT_DIFFICULTY_EASY"))
      showDiff = showDiff.replace(/medium/, t("BOT_DIFFICULTY_MEDIUM"))
      showDiff = showDiff.replace(/hard/, t("BOT_DIFFICULTY_HARD"))
      showDiff = showDiff.replace(/extreme/, t("BOT_DIFFICULTY_EXTREME"))
      showDiff = showDiff.replace(/tapper/, t("BOT_DIFFICULTY_TAPPER"))
      showDiff = showDiff.replace(/cheater-1/, t("BOT_DIFFICULTY_CHEATER_1"))
      showDiff = showDiff.replace(/cheater-2/, t("BOT_DIFFICULTY_CHEATER_2"))
      showDiff = showDiff.replace(/cheater-3/, t("BOT_DIFFICULTY_CHEATER_3"))
      showDiff = showDiff.replace(/custom/, t("BOT_DIFFICULTY_CUSTOM"));
      return (
        <div>
          <p className={colorPlayers}>{t("PLAYERS") + ": " + users.length}</p>
          <p className={colorBot}>
            {t("BOT") + ": " +
              showDiff +
              (bot.difficulty === "custom" ? " (" + bot.speed + ")" : "")}
          </p>
        </div>
      );
    }
  };

  let colorField = "text-black";

  if (field.fieldX * field.fieldY > 25) colorField = "text-green-800";
  if (field.fieldX * field.fieldY >= 49) colorField = "text-blue-800";
  if (field.fieldX * field.fieldY >= 81) colorField = "text-yellow-800";
  if (field.fieldX * field.fieldY >= 144) colorField = "text-red-800";

  let colorPlayers = "text-black";

  if ((bot.isTurned ? users.length - 1 : users.length) > 1)
    colorPlayers = "text-green-800";
  if ((bot.isTurned ? users.length - 1 : users.length) >= 3)
    colorPlayers = "text-blue-800";
  if ((bot.isTurned ? users.length - 1 : users.length) >= 5)
    colorPlayers = "text-yellow-800";
  if ((bot.isTurned ? users.length - 1 : users.length) >= 7)
    colorPlayers = "text-red-800";

  let colorBot = "text-black";

  if (bot.difficulty === "easy") colorBot = "text-green-600";
  if (bot.difficulty === "medium") colorBot = "text-lime-600";
  if (bot.difficulty === "hard") colorBot = "text-yellow-600";
  if (bot.difficulty === "extreme") colorBot = "text-orange-600";
  if (bot.difficulty === "tapper") colorBot = "text-red-600";
  if (bot.difficulty === "cheater-1") colorBot = "text-pink-600";
  if (bot.difficulty === "cheater-2") colorBot = "text-violet-600";
  if (bot.difficulty === "cheater-3") colorBot = "text-sky-800";

  const UserGameItemClass = () => {
    const standardClasses = [
      "w-full",
      "my-2",
      "p-2",
      "rounded-lg",
      "font-bold",
      "cursor-pointer",
      "border",
      "duration-150",
    ];
    if (showDetails) {
      return standardClasses.concat([
        "border-sky-500",
        "bg-sky-100",
        "shadow-md",
      ]);
    } else {
      return standardClasses.concat([
        "bg-gray-200",
        "border-gray-600",
        "hover:bg-sky-100",
        "hover:border-sky-500",
        "hover:shadow-md",
      ]);
    }
  };

  return (
    <div
      className={UserGameItemClass().join(" ")}
      onClick={() => {
        setShowDetails(!showDetails);
      }}
    >
      <div className="grid grid-cols-4 items-center">
        <div className="leading-5">
          <p>{`${String(RDate.getFullYear()).slice(-2)}.${
            RDate.getMonth() + 1
          }.${RDate.getDate()}`}</p>
          <p>{`${RDate.getHours()}:${RDate.getMinutes()}:${RDate.getSeconds()}`}</p>
        </div>
        <div>
          <p className={colorField}>
            {field.fieldX +
              "x" +
              field.fieldY +
              ` (${field.fieldX * field.fieldY})`}
          </p>
        </div>
        <div>
          <RenderUsers />
        </div>
        <div>
          <RenderRanked />
        </div>
      </div>
      {showDetails ? (
        <UserGameDetails
          userGame={userGame}
          key={"UserGameDetails" + userGameIndex}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserGameItem;
