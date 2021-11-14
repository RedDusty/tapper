import io from "socket.io-client";
require("dotenv").config();

let serverURL: string | "offline" = "";
let serverID: -1 | 1 | 2 = -1;
let isConnected: boolean = false;
export const getServerURL = () => serverURL;
export const getServerID = () => serverID;
export const getIsConnected = () => isConnected;

const socketConfig = {
  reconnection: true,
  reconnectionDelay: 250,
  reconnectionAttempts: 50,
}

let socket = io(serverURL, socketConfig);

export const getSocket = () => {
  return socket;
}

const server = async () => {
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  if (false) {
  } else {
    const fetcher = await fetch(
      process.env.REACT_APP_SERVER_FIRST + "/checker"
    );
    const data = await fetcher.json();
    if (data.message && data.message === "online") {
      serverURL = process.env.REACT_APP_SERVER_FIRST!;
      isConnected = true;
      serverID = 1;
      socket.disconnect()
      socket = io(process.env.REACT_APP_SERVER_FIRST!, socketConfig);
      socket.connect()
      console.log(socket);
      
    } else {
      const secondFetcher = await fetch(
        process.env.REACT_APP_SERVER_SECOND + "/checker"
      );
      const data = await secondFetcher.json();

      if (data.message && data.message === "online") {
        serverURL = process.env.REACT_APP_SERVER_SECOND!;
        isConnected = true;
        serverID = 2;
        socket.disconnect()
        socket = io(process.env.REACT_APP_SERVER_SECOND!, socketConfig);
        socket.connect()
      } else {
        serverURL = "offline";
      }
    }
  }
  console.log(serverURL);
};

server();

export default socket;
