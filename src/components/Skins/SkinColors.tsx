import { skinBorderStyleType } from "../../redux/types";

type SkinColorsType = ({
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinColor,
}: {
  color: string;
  border: boolean;
  borderColor: string;
  borderStyle: skinBorderStyleType;
  borderWidth: number;
  setSkinColor: React.Dispatch<React.SetStateAction<string>>;
}) => JSX.Element;

const SkinColors: SkinColorsType = ({
  border,
  borderColor,
  borderStyle,
  borderWidth,
  color,
  setSkinColor,
}) => {
  const showBorder = border
    ? `border-${borderColor} border-${borderStyle}`
    : "";
  return (
    <>
      <button
        className={`bg-${color}-300 w-8 h-8 ${showBorder} focus:animate-pulse`}
        style={{ borderWidth: border ? borderWidth : 0 }}
        key={`skin-color-${color + "300"}`}
        onClick={() => {
          setSkinColor(color + "-300");
        }}
      ></button>
      <button
        className={`bg-${color}-600 w-8 h-8 ${showBorder} focus:animate-pulse`}
        style={{ borderWidth: border ? borderWidth : 0 }}
        key={`skin-color-${color + "600"}`}
        onClick={() => {
          setSkinColor(color + "-600");
        }}
      ></button>
      <button
        className={`bg-${color}-900 w-8 h-8 ${showBorder} focus:animate-pulse`}
        style={{ borderWidth: border ? borderWidth : 0 }}
        key={`skin-color-${color + "900"}`}
        onClick={() => {
          setSkinColor(color + "-900");
        }}
      ></button>
    </>
  );
};

export default SkinColors;
