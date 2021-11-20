import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { lobbySetUsers } from "../redux/actions/lobbyActions";
import { userSetSkin } from "../redux/actions/userActions";
import { skinBorderStyleType, skinType } from "../redux/types";
import { useTypedSelector } from "../redux/useTypedSelector";
import { getSocket } from "../socketio";
import { renderImage } from "./Lobby/Lobby";
import UserSkin from "./Helpers/UserSkin";
import SkinColors from "./Skins/SkinColors";
import SkinBorder from "./Skins/SkinBorder";
import { useTranslation } from 'react-i18next';

export const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

function Skins() {
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user);
  const code = useTypedSelector((state) => state.lobby.code);
  const { t } = useTranslation()

  const [skinColor, setSkinColor] = useState<string>(
    user.skin.color || "orange-600"
  );
  const [withBorder, setWithBorder] = useState<boolean>(
    user.skin.withBorder || true
  );
  const [skinBorderColor, setSkinBorderColor] = useState<string>(
    user.skin.borderColor || "lime-600"
  );
  const [skinBorderStyle, setSkinBorderStyle] = useState<skinBorderStyleType>(
    user.skin.borderStyle || "solid"
  );
  const [skinBorderWidth, setSkinBorderWidth] = useState<number>(
    user.skin.borderWidth || 2
  );

  const confirmHandler = () => {
    const skinData: skinType = {
      type: "standard",
      withBorder: withBorder,
      borderColor: skinBorderColor,
      borderStyle: skinBorderStyle,
      borderWidth: skinBorderWidth,
      color: skinColor,
    };

    dispatch(userSetSkin(skinData));
    getSocket().emit("SKIN_CHANGE", {
      code,
      user,
      skinData,
    });
  };

  useEffect(() => {
    getSocket().on("SKIN_CHANGE_USERS", (data) => {
      dispatch(lobbySetUsers(data.users));
    });
    return () => {
      getSocket().off("SKIN_CHANGE_USERS");
    };
    // eslint-disable-next-line
  }, []);

  const nextSkin = () => {
    let skinData = `bg-${skinColor}`;
    if (withBorder) {
      skinData =
        skinData + ` border-${skinBorderColor} border-${skinBorderStyle}`;
    }
    return skinData;
  };

  return (
    <div className="panelWidth h-full my-0 mx-auto">
      <div className="bg-gray-300 hover:bg-gray-200 w-full flex items-center justify-center gap-x-2 mx-auto p-4 rounded-bl-md rounded-br-md">
        {renderImage(user.avatar)}
        <p className="font-bold">{user.nickname}</p>
        <UserSkin key={user.nickname + "skin"} {...user.skin} />
        <p className="flex items-center font-bold text-black text-xl">{"=>"}</p>
        <div
          className={`${nextSkin()} w-8 h-8`}
          style={{
            borderWidth: withBorder ? skinBorderWidth : 0,
          }}
        ></div>
      </div>
      <div
        className="bg-gray-100 w-full rounded-md px-4 py-4 overflow-auto"
        style={{ height: "calc(100% - 112px)" }}
      >
        <div className="w-full flex justify-center items-center gap-x-2">
          <button
            className={`button ${
              withBorder === true ? "button-green" : "button-red"
            }`}
            onClick={() => {
              setWithBorder(!withBorder);
            }}
          >
            {t("TOGGLE_BORDER")}
          </button>
          <button
            className="button button-yellow"
            onClick={() => confirmHandler()}
          >
            {t("CONFIRM")}
          </button>
        </div>
        <p className="text-lg font-bold mt-4 text-center">{t("MAIN_COLOR")}</p>
        <div className="w-full flex flex-wrap gap-4 mt-2">
          {colors.map((color, index) => {
            return (
              <SkinColors
                key={color + index + "skinColor"}
                color={color}
                border={withBorder}
                borderColor={skinBorderColor}
                borderStyle={skinBorderStyle}
                borderWidth={skinBorderWidth}
                setSkinColor={setSkinColor}
              />
            );
          })}
        </div>
        <SkinBorder
          skinColor={skinColor}
          skinBorder={withBorder}
          skinBorderColor={skinBorderColor}
          skinBorderStyle={skinBorderStyle}
          skinBorderWidth={skinBorderWidth}
          setSkinBorderColor={setSkinBorderColor}
          setSkinBorderStyle={setSkinBorderStyle}
          setSkinBorderWidth={setSkinBorderWidth}
        />
      </div>
    </div>
  );
}

export default Skins;
