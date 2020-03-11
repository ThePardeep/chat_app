const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const session = require("express-session");
const sqlConn = require("./Config/DataBase");
const SocketEvent = require("./Socket/Socket.js");
const UserRoute = require("./Route/User.js");
const GroupRoute = require("./Route/Group");
const path = require("path");

//BODY PARSER
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session MiddleWare
var sessionMiddleWare = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 }
});
io.use((socket, next) => {
  sessionMiddleWare(socket.request, socket.request.res, next);
});
// io.use();
app.use(sessionMiddleWare);
//PORT
const PORT = process.env.PORT || 7000;

io.on("connection", socket => {
  var handshakeData = socket.handshake;
  // console.log(handshakeData);
  /*const OnlineUser = [];
  console.log(socket.handshake);

  if (socket.request.session.OnlineUser != undefined) {
    console.log(socket.request.session.OnlineUser);
  } else {
    console.log("ss");
    socket.request.session.OnlineUser = [
      {
        socketID: socket.id
      }
    ];
  }*/
  // OnlineUser = socket.session.OnlineUser;
  SocketEvent(socket, io);
});

if (process.env.NODE_ENV === "production") {
  // SET STATIC FOLDER
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Set Route
app.use("/user", UserRoute);
app.use("/group", GroupRoute);

//ENTRY POINT
app.get("/", (req, res, next) => {});
http.listen(PORT, () => console.log("Server Run"));
