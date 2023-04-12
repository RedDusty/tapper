import io from "socket.io-client";
require("dotenv").config();

const isDEV = false;

let serverURL: string | "offline" = process.env.REACT_APP_SERVER || "";
let serverID: 0 | 1 = 0;
let isConnected: boolean = false;
export const getServerURL = () => serverURL;
export const getServerID = () => serverID;
export const getIsConnected = () => isConnected;

const socketConfig = {
  reconnection: true,
  reconnectionDelay: 250,
  reconnectionAttempts: 50,
};

let socket = io(serverURL, socketConfig);

export const getSocket = () => {
  return socket;
};

const server = async () => {
  if ((!process.env.NODE_ENV || process.env.NODE_ENV === "development") && isDEV) {
    socket = io("http://127.0.0.1:3000", socketConfig);
    socket.connect();
    serverURL = "http://127.0.0.1:3000";
  } else {
    const fetcher = await fetch(
      process.env.REACT_APP_SERVER + "/checker"
    );
    
    const data = await fetcher.json();
    
    if (data.message && data.message === "online") {
      serverURL = process.env.REACT_APP_SERVER!;
      isConnected = true;
      serverID = 1;
      socket.disconnect();
      socket = io(process.env.REACT_APP_SERVER!, socketConfig);
      socket.connect();
    } else {
      serverID = 0;
      serverURL = "Offline"
    }
  }
};

server();

export default socket;
