import { useTypedSelector } from "../../../redux/useTypedSelector";

const FAQBattlefieldDot = ({ isEnemy }: { isEnemy: boolean }) => {
  const skin = useTypedSelector((state) => state.user.skin);
  const skinWithBorder = () => {
    if (isEnemy === true) {
      return 8;
    }
    if (isEnemy === false && skin.withBorder === false) {
      return 0;
    }
    if (isEnemy === false && skin.withBorder === true) {
      return skin.borderWidth;
    }
    return 1;
  };
  const dotClass = () => {
    if (isEnemy === true) {
      return ["bg-red-300 border-rose-600 border-double"];
    }
    if (isEnemy === false && skin.withBorder === true) {
      return [
        `bg-${skin.color} border-${skin.borderColor} border-${skin.borderStyle}`,
      ];
    }
    if (isEnemy === false && skin.withBorder === false) {
      return [`bg-${skin.color}`];
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
