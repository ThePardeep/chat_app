import io from "socket.io-client";

const PORT = process.env.PORT || 7000;
//sheltered-dusk-68201.herokuapp.com/
 const Socket = User => {
  const socket = io(`https://sheltered-dusk-68201.herokuapp.com:${PORT}`);
  return socket;
};

export default Socket;
