import { skinBorderStyleType } from "../../redux/types";

type SkinBorderStylesType = ({
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderStyle,
}: {
  color: string;
  border: boolean;
  borderColor: string;
  borderStyle: skinBorderStyleType;
  borderWidth: number;
  setSkinBorderStyle: React.Dispatch<React.SetStateAction<skinBorderStyleType>>;
}) => JSX.Element;

const SkinBorderStyle: SkinBorderStylesType = ({
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderStyle,
}) => {
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
