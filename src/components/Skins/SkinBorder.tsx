import { skinBorderStyleType } from "../../redux/types";
import { colors } from "../Skins";
import SkinBorderColors from "./SkinBorderColors";
import SkinBorderStyle from "./SkinBorderStyle";
import SkinBorderWidth from "./SkinBorderWidth";

const skinBorderStyleArray = ["solid", "dashed", "dotted", "double"];

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

const SkinBorder: renderBorderType = (
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
          SkinBorderColors(
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
          SkinBorderStyle(
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
      {SkinBorderWidth(
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

export default SkinBorder;
