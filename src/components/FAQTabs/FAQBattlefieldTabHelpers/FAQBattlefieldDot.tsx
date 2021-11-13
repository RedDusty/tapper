import { useTypedSelector } from '../../../redux/useTypedSelector';

const FAQBattlefieldDot = ({ isEnemy }: { isEnemy: boolean }) => {
  const skin = useTypedSelector((state) => state.user.skin);
  const skinWithBorder = () => {
    if (isEnemy === true && skin.only2Colors === true) {
      return 0;
    }
    if (isEnemy === true && skin.only2Colors === false) {
      return 8;
    }
    if (isEnemy === false && skin.only2Colors === true) {
      return 0;
    }
    if (isEnemy === false && skin.only2Colors === false && skin.withBorder) {
      return skin.borderWidth;
    }
    return 1;
  };
  const dotClass = () => {
    if (isEnemy === true && skin.only2Colors === true) {
      return ["bg-black"];
    }
    if (isEnemy === true && skin.only2Colors === false) {
      return ["bg-red-300 border-rose-600 border-double"];
    }
    if (isEnemy === false && skin.only2Colors === true) {
      return ["bg-gray-400"];
    }
    if (isEnemy === false && skin.only2Colors === false) {
      return [
        `bg-${skin.color} border-${skin.borderColor} border-${skin.borderStyle}`,
      ];
    }
    return [
      "bg-gray-200",
      "border-solid",
      "border-gray-400",
      "hover:bg-gray-300",
      "hover:border-gray-500",
    ];
  };
  return (
    <div
      className={dotClass().join(" ")}
      style={{
        width: `100%`,
        height: `100%`,
        borderWidth: skinWithBorder(),
      }}
    ></div>
  );
};

export default FAQBattlefieldDot;
