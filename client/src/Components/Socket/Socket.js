import io from "socket.io-client";

const Socket = User => {
  const socket = io(`http://localhost:7000`);
  return socket;
};

export default Socket;
