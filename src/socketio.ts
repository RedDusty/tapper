import io from "socket.io-client";
require("dotenv").config();

let serverURL = "";
let serverID = -1;
let isConnected = false;
export const getServerURL = () => serverURL;
export const getServerID = () => serverID;
export const getIsConnected = () => isConnected;

const server = async () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    serverURL = "http://127.0.0.1:3000";
  } else {
    const fetcher = await fetch(
      process.env.REACT_APP_SERVER_FIRST + "/checker"
    );
    const data = await fetcher.json();
    if (data.message && data.message === "online") {
      serverURL = process.env.REACT_APP_SERVER_FIRST!;
      isConnected = true;
      serverID = 1
    } else {
      const secondFetcher = await fetch(
        process.env.REACT_APP_SERVER_SECOND + "/checker"
      );
      const data = await secondFetcher.json();

      if (data.message && data.message === "online") {
        serverURL = process.env.REACT_APP_SERVER_SECOND!;
        isConnected = true;
        serverID = 2
      } else {
        serverURL = "offline";
      }
    }
  }
};

server();

const socket = io(serverURL);

export default socket;
