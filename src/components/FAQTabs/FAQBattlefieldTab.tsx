import { useState } from "react";
import { userInfoType } from '../../redux/types';
import UserSkin from '../Helpers/UserSkin';
import { renderImage } from '../Lobby/Lobby';
import FAQBattlefieldRender from "./FAQBattlefieldTabHelpers/FAQBattlefieldRender";

const FAQBattlefieldTab = (user: userInfoType) => {
  const [dots, setDots] = useState<number>(0);
  const [enemyDots, setEnemyDots] = useState<number>(0);
  return (
    <div className="text-sky-900 font-bold w-full">
      <div className="mt-4">
        <p className="mt-2">
          When all players are loaded, you will have 5 seconds before the game
          starts.
        </p>
        <p className="mt-2">
          When the game starts you will need to paint all the squares into yours
          as quickly as possible!
        </p>
        <div>
          <FAQBattlefieldRender setDots={setDots} setEnemyDots={setEnemyDots} />
        </div>
        <p>
          After the end of the game, you can see your statistics and rating
          changes.
        </p>
        <div>
          <div className="panelWidth mx-auto mt-4 bg-gray-100 lg:rounded-md flex shadow flex-wrap">
            <div className="bg-gray-200 p-2 m-2 rounded-md shadow font-bold flex items-center gap-4">
              {renderImage(user.avatar)}
              <p className="hidden sm:block text-black">
                {(user.nickname || "").slice(0, 16)}
              </p>
              <UserSkin key={user.nickname + "skin"} {...user.skin} />
              <p className="text-black">{dots}</p>
            </div>
            <div className="bg-gray-200 p-2 m-2 rounded-md shadow font-bold flex items-center gap-4">
              {renderImage("")}
              <p className="hidden sm:block text-black">{"Your enemy"}</p>
              <UserSkin
                key={user.nickname + "skin"}
                borderColor={"rose-600"}
                borderStyle={"double"}
                borderWidth={6}
                color={"red-300"}
                type={"standard"}
                withBorder={true}
              />
              <p className="text-black">{enemyDots}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQBattlefieldTab;
