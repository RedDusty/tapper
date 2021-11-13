import { renderSkinType } from "../Skins";

const SkinBorderStyle: renderSkinType = (
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
export default SkinBorderStyle;
