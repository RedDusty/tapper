import io from 'socket.io-client';
require('dotenv').config()

const socket = io(process.env.REACT_APP_SERVER || '127.0.0.1:3000');

export default socket;