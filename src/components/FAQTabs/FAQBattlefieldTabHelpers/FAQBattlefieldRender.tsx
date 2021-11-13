import { Dispatch } from "react";
import FAQBattlefieldDot from './FAQBattlefieldDot';

const FAQBattlefieldRender = ({
  setDots,
  setEnemyDots,
}: {
  setDots: Dispatch<React.SetStateAction<number>>;
  setEnemyDots: Dispatch<React.SetStateAction<number>>;
}) => {
  const htmlField = () => {
    const field = [];
    let enemies = 0
    for (let index = 0; index < 9; index++) {
      const isEnemy = Math.round(Math.random());
      enemies = enemies + isEnemy
      field.push(
        <FAQBattlefieldDot
          key={"dot" + index + "faq"}
          isEnemy={Boolean(isEnemy)}
        />
      );
    }
    setDots(9 - enemies)
    setEnemyDots(enemies);
    return field;
  };
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: "calc(100% - 48px)" }}
    >
      <div
        className="grid w-full h-full p-2 justify-center"
        style={{
          gridTemplateColumns: `repeat(3, 64px)`,
          gridTemplateRows: `repeat(3, 64px)`,
        }}
      >
        {htmlField()}
      </div>
    </div>
  );
};

export default FAQBattlefieldRender;
