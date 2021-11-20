import { useTranslation } from 'react-i18next';
import { skinBorderStyleType } from "../../redux/types";
import { colors } from "../Skins";
import SkinBorderColors from "./SkinBorderColors";
import SkinBorderStyle from "./SkinBorderStyle";
import SkinBorderWidth from "./SkinBorderWidth";

const skinBorderStyleArray: skinBorderStyleType[] = [
  "solid",
  "dashed",
  "dotted",
  "double",
];

type renderBorderType = ({
  skinColor,
  skinBorder,
  skinBorderColor,
  skinBorderStyle,
  skinBorderWidth,
  setSkinBorderColor,
  setSkinBorderStyle,
  setSkinBorderWidth,
}: {
  skinColor: string;
  skinBorder: boolean;
  skinBorderColor: string;
  skinBorderStyle: skinBorderStyleType;
  skinBorderWidth: number;
  setSkinBorderColor: React.Dispatch<React.SetStateAction<string>>;
  setSkinBorderStyle: React.Dispatch<React.SetStateAction<skinBorderStyleType>>;
  setSkinBorderWidth: React.Dispatch<React.SetStateAction<number>>;
}) => JSX.Element;

const SkinBorder: renderBorderType = ({
  skinColor,
  skinBorder,
  skinBorderColor,
  skinBorderStyle,
  skinBorderWidth,
  setSkinBorderColor,
  setSkinBorderStyle,
  setSkinBorderWidth,
}) => {
  const { t } = useTranslation()
  if (skinBorder === false) {
    return <></>;
  }
  return (
    <div className="w-full" key={skinColor + skinBorderColor}>
      <p className="text-lg font-bold text-center mt-4">{t("BORDER_COLOR")}</p>
      <div className="w-full flex flex-wrap gap-4 mt-2">
        {colors.map((borderColor, index) => {
          return (
            <SkinBorderColors
              color={skinColor}
              border={skinBorder}
              borderColor={borderColor}
              borderStyle={skinBorderStyle}
              borderWidth={skinBorderWidth}
              setSkinBorderColor={setSkinBorderColor}
              key={borderColor + index + "borderColor"}
            />
          );
        })}
      </div>
      <p className="text-lg font-bold text-center mt-4">{t("BORDER_STYLE")}</p>
      <div className="w-full flex flex-wrap gap-4 mt-2">
        {skinBorderStyleArray.map((borderStyle, index) => {
          return (
            <SkinBorderStyle
              color={skinColor}
              border={skinBorder}
              borderColor={skinBorderColor}
              borderStyle={borderStyle}
              borderWidth={skinBorderWidth}
              setSkinBorderStyle={setSkinBorderStyle}
              key={borderStyle + index + "borderStyle"}
            />
          );
        })}
      </div>
      <p className="text-lg font-bold text-center mt-4">{t("BORDER_WIDTH")}</p>
      <SkinBorderWidth
        border={skinBorder}
        borderColor={skinBorderColor}
        borderStyle={skinBorderStyle}
        borderWidth={skinBorderWidth}
        color={skinColor}
        setSkinBorderWidth={setSkinBorderWidth}
        key={"borderWidthSetterContainer"}
      />
    </div>
  );
};

export default SkinBorder;
