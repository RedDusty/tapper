import io from 'socket.io-client';

const socket = io('https://tapper-server.vercel.app/');

export default socket;