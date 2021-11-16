import { skinBorderStyleType } from "../../redux/types";

type SkinBorderWidthType = ({
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderWidth,
}: {
  color: string;
  border: boolean;
  borderColor: string;
  borderStyle: skinBorderStyleType;
  borderWidth: number;
  setSkinBorderWidth: React.Dispatch<React.SetStateAction<number>>;
}) => JSX.Element;

const SkinBorderWidth: SkinBorderWidthType = ({
  color,
  border,
  borderColor,
  borderStyle,
  borderWidth,
  setSkinBorderWidth,
}) => {
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

export default SkinBorderWidth;
