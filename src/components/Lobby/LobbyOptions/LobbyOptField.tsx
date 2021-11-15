import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  lobbySetFieldX,
  lobbySetFieldY,
} from "../../../redux/actions/lobbyActions";
import { lobbyOptionsType } from "../../../redux/types";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import { getSocket } from "../../../socketio";

function LobbyOptField() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const lobby = useTypedSelector((state) => state.lobby);
  const user = useTypedSelector((state) => state.user);
  return (
    <>
      <p className="text-lg my-1">{t("FIELD")}</p>
      <div className="w-full px-2">
        <div className="flex items-center">
          <p>{t("FIELD")}</p>
          <div className="flex ml-2 items-center">
            <p>x:</p>
            <input
              type="text"
              pattern="[0-9]"
              maxLength={2}
              className="ml-1 mr-4 w-16 lobbyOptInput"
              readOnly={user.uid !== lobby.ownerUID}
              onChange={(e) => {
                if (user.uid !== lobby.ownerUID) return 0;
                const nums = e.target.value.match(/\d/g);
                const num = nums?.join("").substr(0, 2);
                if (num !== lobby.fieldX) {
                  dispatch(lobbySetFieldX(num || ""));
                  if ((num || "").length !== 0) {
                    const emmitedNumber = () => {
                      if (num && Number(num) > 0) {
                        if (Number(num) > 16) {
                          return 16;
                        } else {
                          return num;
                        }
                      } else {
                        return String(1);
                      }
                    };
                    getSocket().emit("LOBBY_OPTIONS", {
                      code: lobby.code,
                      option: "setFieldX",
                      ownerUID: lobby.ownerUID,
                      fieldX: emmitedNumber(),
                    } as lobbyOptionsType);
                  }
                }
              }}
              value={lobby.fieldX}
            />
            <p>y:</p>
            <input
              type="text"
              pattern="[0-9]"
              maxLength={2}
              className="ml-1 mr-4 w-16 lobbyOptInput"
              readOnly={user.uid !== lobby.ownerUID}
              onChange={(e) => {
                if (user.uid !== lobby.ownerUID) return 0;
                const nums = e.target.value.match(/\d/g);
                const num = nums?.join("").substr(0, 2);
                if (num !== lobby.fieldY) {
                  dispatch(lobbySetFieldY(num || ""));
                  if ((num || "").length !== 0) {
                    const emmitedNumber = () => {
                      if (num && Number(num) > 0) {
                        if (Number(num) > 16) {
                          return 16;
                        } else {
                          return num;
                        }
                      } else {
                        return String(1);
                      }
                    };
                    getSocket().emit("LOBBY_OPTIONS", {
                      code: lobby.code,
                      option: "setFieldY",
                      ownerUID: lobby.ownerUID,
                      fieldY: emmitedNumber(),
                    } as lobbyOptionsType);
                  }
                }
              }}
              value={lobby.fieldY}
            />
          </div>
          <p className="ml-2">
            ({Number(lobby.fieldX || 1) * Number(lobby.fieldY || 1)})
          </p>
        </div>
      </div>
    </>
  );
}

export default LobbyOptField;
