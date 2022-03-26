const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
const path = require("path");
http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connected...");
  //'message' is the event's name
  // fetching message from client
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
