import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { lobbySetUsers } from "../redux/actions/lobbyActions";
import { userSetSkin } from "../redux/actions/userActions";
import { skinBorderStyleType, skinType } from "../redux/types";
import { useTypedSelector } from "../redux/useTypedSelector";
import socket from "../socketio";
import { renderImage } from "./Lobby/Lobby";
import UserSkin from './Helpers/UserSkin';

const colors = [
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

const skinBorderStyleArray = ["solid", "dashed", "dotted", "double"];

function Skins() {
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user);
  const code = useTypedSelector((state) => state.lobby.code);

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
    socket.emit("SKIN_CHANGE", {
      code,
      user,
      skinData,
    });
  };

  useEffect(() => {
    socket.on("SKIN_CHANGE_USERS", (data) => {
      dispatch(
        lobbySetUsers({
          lobby: data,
          type: "userSkinChange",
          value: data.users,
        })
      );
    });
    return () => {
      socket.off("SKIN_CHANGE_USERS");
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
        <UserSkin key={user.nickname + 'skin'} {...user.skin} />
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
            Toggle border
          </button>
          <button
            className="button button-yellow"
            onClick={() => confirmHandler()}
          >
            Confirm
          </button>
        </div>
        <p className="text-lg font-bold mt-4 text-center">Main color</p>
        <div className="w-full flex flex-wrap gap-4 mt-2">
          {colors.map((color) =>
            renderSkinColors(
              color,
              withBorder,
              skinBorderColor,
              skinBorderStyle,
              skinBorderWidth,
              setSkinColor
            )
          )}
        </div>
        {renderBorder(
          skinColor,
          withBorder,
          skinBorderColor,
          skinBorderStyle,
          skinBorderWidth,
          setSkinBorderColor,
          setSkinBorderStyle,
          setSkinBorderWidth
        )}
      </div>
    </div>
  );
}

export default Skins;

type renderSkinType = (
  color: string,
  border: boolean,
  borderColor: string,
  borderStyle: skinBorderStyleType,
  borderWidth: number,
  [key]: any
) => JSX.Element;

const renderSkinColors: renderSkinType = (
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinColor
) => {
  const showBorder = border ? `border-${borderColor} border-${borderStyle}` : "";
  return (
    <>
      <button
        className={`bg-${color}-300 w-8 h-8 ${showBorder} focus:animate-pulse`}
        style={{ borderWidth: border ? borderWidth : 0 }}
        key={`skin-color-${color + '300'}`}
        onClick={() => {
          setSkinColor(color + '-300');
        }}
      ></button>
      <button
        className={`bg-${color}-600 w-8 h-8 ${showBorder} focus:animate-pulse`}
        style={{ borderWidth: border ? borderWidth : 0 }}
        key={`skin-color-${color + '600'}`}
        onClick={() => {
          setSkinColor(color + '-600');
        }}
      ></button>
      <button
        className={`bg-${color}-900 w-8 h-8 ${showBorder} focus:animate-pulse`}
        style={{ borderWidth: border ? borderWidth : 0 }}
        key={`skin-color-${color + '900'}`}
        onClick={() => {
          setSkinColor(color + '-900');
        }}
      ></button>
    </>
  );
};

const renderSkinBorderColors: renderSkinType = (
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderColor
) => {
  return (
    <>
      <button
        className={`bg-${color} border-${borderColor}-300 border-${borderStyle} w-8 h-8 focus:animate-pulse`}
        style={{ borderWidth: borderWidth }}
        key={`skin-border-color-${borderColor + "300"}`}
        onClick={() => {
          setSkinBorderColor(borderColor + "-300");
        }}
      ></button>
      <button
        className={`bg-${color} border-${borderColor}-600 border-${borderStyle} w-8 h-8 focus:animate-pulse`}
        style={{ borderWidth: borderWidth }}
        key={`skin-border-color-${borderColor + "600"}`}
        onClick={() => {
          setSkinBorderColor(borderColor + "-600");
        }}
      ></button>
      <button
        className={`bg-${color} border-${borderColor}-900 border-${borderStyle} w-8 h-8 focus:animate-pulse`}
        style={{ borderWidth: borderWidth }}
        key={`skin-border-color-${borderColor + "900"}`}
        onClick={() => {
          setSkinBorderColor(borderColor + "-900");
        }}
      ></button>
    </>
  );
};

const renderSkinBorderStyle: renderSkinType = (
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderStyle
) => {
  return (
    <button
      className={`bg-${color} border-${borderColor} border-${borderStyle} w-8 h-8 focus:animate-pulse`}
      style={{ borderWidth: borderWidth }}
      key={`skin-border-style-${borderStyle}`}
      onClick={() => {
        setSkinBorderStyle(borderStyle);
      }}
    ></button>
  );
};

const renderSkinBorderWidth: renderSkinType = (
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderWidth
) => {
  let buttons: JSX.Element[] = [];
  for (let index = 1; index < 17; index++) {
    buttons.push(
      <button
        className={`bg-${color} border-${borderColor} border-${borderStyle} w-8 h-8 focus:animate-pulse`}
        style={{ borderWidth: index }}
        key={`skin-border-width-${index}`}
        onClick={() => {
          setSkinBorderWidth(index);
        }}
      ></button>
    );
  }
  return <div className="w-full flex flex-wrap gap-4 mt-2">{buttons}</div>;
};

type renderBorderType = (
  skinColor: string,
  skinBorder: boolean,
  skinBorderColor: string,
  skinBorderStyle: skinBorderStyleType,
  skinBorderWidth: number,
  setSkinBorderColor: React.Dispatch<React.SetStateAction<string>>,
  setSkinBorderStyle: React.Dispatch<React.SetStateAction<skinBorderStyleType>>,
  setSkinBorderWidth: React.Dispatch<React.SetStateAction<number>>
) => JSX.Element;

const renderBorder: renderBorderType = (
  skinColor,
  skinBorder,
  skinBorderColor,
  skinBorderStyle,
  skinBorderWidth,
  setSkinBorderColor,
  setSkinBorderStyle,
  setSkinBorderWidth
) => {
  if (skinBorder === false) {
    return <></>;
  }
  return (
    <div className="w-full">
      <p className="text-lg font-bold text-center mt-4">Border color</p>
      <div className="w-full flex flex-wrap gap-4 mt-2">
        {colors.map((borderColor) =>
          renderSkinBorderColors(
            skinColor,
            skinBorder,
            borderColor,
            skinBorderStyle,
            skinBorderWidth,
            setSkinBorderColor
          )
        )}
      </div>
      <p className="text-lg font-bold text-center mt-4">Border style</p>
      <div className="w-full flex flex-wrap gap-4 mt-2">
        {skinBorderStyleArray.map((borderStyle) =>
          renderSkinBorderStyle(
            skinColor,
            skinBorder,
            skinBorderColor,
            borderStyle as skinBorderStyleType,
            skinBorderWidth,
            setSkinBorderStyle
          )
        )}
      </div>
      <p className="text-lg font-bold text-center mt-4">Border width</p>
      {renderSkinBorderWidth(
        skinColor,
        skinBorder,
        skinBorderColor,
        skinBorderStyle,
        skinBorderWidth,
        setSkinBorderWidth
      )}
    </div>
  );
};
