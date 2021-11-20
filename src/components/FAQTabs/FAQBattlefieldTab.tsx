import { useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoType } from "../../redux/types";
import UserSkin from "../Helpers/UserSkin";
import { renderImage } from "../Lobby/Lobby";
import FAQBattlefieldRender from "./FAQBattlefieldTabHelpers/FAQBattlefieldRender";

const FAQBattlefieldTab = (user: userInfoType) => {
  const [dots, setDots] = useState<number>(0);
  const [enemyDots, setEnemyDots] = useState<number>(0);
  const { t } = useTranslation();
  return (
    <div className="text-sky-900 font-bold w-full">
      <div className="mt-4">
        <p className="mt-2">{t("FAQ_ALL_LOADED")}</p>
        <p className="mt-2">{t("FAQ_CLICK_SQUARES")}!</p>
        <div>
          <FAQBattlefieldRender setDots={setDots} setEnemyDots={setEnemyDots} />
        </div>
        <p className="mt-2">{t("FAQ_AFTER_GAME_SCORE")}.</p>
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
              <p className="hidden sm:block text-black">{t("FAQ_YOUR_ENEMY")}</p>
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
        <p className="mt-2 mb-4">
          {t("FAQ_BOT_1")}{" "}
          <span className="text-red-700">{t("FAQ_BOT_2")}</span>.{" "}
          {t("FAQ_BOT_3")}.{" "}
          <span className="text-orange-600">{t("FAQ_BOT_4")}</span>{" "}
          {t("FAQ_BOT_5")} <span className="text-black">{t("FAQ_BOT_SKIN")}</span> {t("FAQ_BOT_6")}{" "}
          <span className="text-gray-500">{t("FAQ_BOT_BORDER")}</span>!
          <span
            className="w-8 h-8 border-gray-500 bg-black border-double inline-block ml-2 relative top-3"
            style={{ borderWidth: 6 }}
          ></span>
        </p>
      </div>
    </div>
  );
};

export default FAQBattlefieldTab;
