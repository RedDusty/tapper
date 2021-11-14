import { useEffect, useState } from "react";
import { userInfoType } from "../../redux/types";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { getSocket } from "../../socketio";

function Dot({
  index,
  user,
}: {
  index: number;
  user: userInfoType | undefined;
}) {
  const [tap, setTap] = useState<boolean>(false);
  const [isControlled, setController] = useState<boolean>(false);
  const { code, startsIn } = useTypedSelector((state) => state.lobby);
  const [dotClass, setDotClass] = useState<string[]>([
    "bg-gray-200",
    "border-solid",
    "border-gray-400",
    "hover:bg-gray-300",
    "hover:border-gray-500",
  ]);
  const userRedux = useTypedSelector((state) => state.user);
  useEffect(() => {
    if (startsIn <= 0) {
      setTap(true);
    }
    setController(() => {
      if (user) {
        const skin = user.skin;
        if (skin.color) {
          if (skin.withBorder) {
            setDotClass([
              "bg-" + skin.color,
              "border-" + skin.borderColor,
              `border-${skin.borderStyle}`,
            ]);
          } else {
            setDotClass(["bg-" + skin.color]);
          }
        } else {
          setDotClass(["bg-gray-300", "border-gray-900", "border-solid"]);
        }
        return true;
      } else {
        return false;
      }
    });
  }, [startsIn, user]);
  const skinWithBorder = () => {
    if (user) {
      if (user.skin.withBorder) {
        return user.skin.borderWidth;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  };
  return (
    <div
      className={
        dotClass.join(" ") +
        " focus:font-bold text-lg text-gray-600 flex justify-center items-center"
      }
      style={{
        width: `100%`,
        height: `100%`,
        borderWidth: skinWithBorder(),
      }}
      onClick={() => {
        if (tap && isControlled === false) {
          getSocket().emit("TAP_DOT", {
            user: userRedux,
            index,
            code,
          });
        }
      }}
    >
    </div>
  );
}

export default Dot;
