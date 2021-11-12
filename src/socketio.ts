import io from "socket.io-client";
require("dotenv").config();

const server = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "127.0.0.1:3000";
  } else {
    return process.env.REACT_APP_SERVER!;
  }
};

const socket = io(server());

export default socket;
