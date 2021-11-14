import { useEffect, useState } from "react";
import { getServerURL } from "../../socketio";
import Loading from "./Loading";

const Connecting = ({
  setServerConnected,
  serverConnected,
}: {
  setServerConnected: (v: boolean) => void;
  serverConnected: boolean;
}) => {
  const [attempt, setAttempt] = useState(0);
  const [isFail, setFail] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (serverConnected === false && isFail === false) {
        const serverURL = getServerURL();
        setAttempt((prev) => {
          return prev + 1;
        });
        if (serverURL !== "" && serverURL !== "offline") {
          console.log(serverURL);
          
          setServerConnected(true);
        } else if (serverURL === "offline") {
          setFail(true);
        }
      }
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  });
  if (isFail) {
    return (
      <div className="failConnect">
        <p className="font-bold text-center flex justify-center items-center text-2xl md:text-9xl">
          Server offline
        </p>
      </div>
    );
  } else {
    return (
      <div className="fixed w-screen h-screen flex flex-col items-center justify-evenly bg-black bg-opacity-25">
        <div className="flex items-center justify-center p-12 bg-gray-300 bg-opacity-50 rounded-full">
          <Loading color="text-gray-600" />
        </div>
        <div>
          <p className="font-bold text-4xl">Connecting to server...</p>
          <p className="font-bold text-2xl">Attempt: {attempt}</p>
        </div>
      </div>
    );
  }
};

export default Connecting;
