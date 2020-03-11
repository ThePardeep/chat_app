function SocketEvent(socket, io) {
  socket.on("Chat", function(data) {
    io.emit(data.To, data);
  });

  socket.on("disconnect", () => {
    console.log("user dis", socket.id);
  });
}

module.exports = SocketEvent;
