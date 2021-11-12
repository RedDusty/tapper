import { skinType } from "../redux/types";

const UserSkin = (skin: skinType) => {
  const { color, withBorder, borderColor, borderStyle, borderWidth } = skin;
  const skinStyle = () => {
    if (color) {
      let skinData = "bg-" + color;
      if (withBorder) {
        skinData =
          skinData + " border-" + borderColor + " border-" + borderStyle;
      }
      return skinData;
    } else {
      return "bg-gray-300 border-gray-900 border-solid";
    }
  };
  const skinWithBorder = () => {
    if (color) {
      if (withBorder) {
        return borderWidth;
      } else {
        return 0;
      }
    } else {
      return 2;
    }
  };
  return (
    <div
      className={`${skinStyle()} w-8 h-8 ml-2 font-bold text-lg text-gray-600 text-center`}
      style={{
        borderWidth: skinWithBorder(),
      }}
    >
      {color ? "" : "?"}
    </div>
  );
};

export default UserSkin;
