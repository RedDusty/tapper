import { skinBorderStyleType } from "../../redux/types";

type SkinBorderColorsType = ({
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderColor,
}: {
  color: string;
  border: boolean;
  borderColor: string;
  borderStyle: skinBorderStyleType;
  borderWidth: number;
  setSkinBorderColor: React.Dispatch<React.SetStateAction<string>>;
}) => JSX.Element;

const SkinBorderColors: SkinBorderColorsType = ({
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderColor,
}) => {
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

export default SkinBorderColors;
