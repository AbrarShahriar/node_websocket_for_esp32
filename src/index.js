// @ts-nocheck
const express = require("express");
const http = require("http");
const socket = require("socket.io");
// import cors from "cors";

const PORT = process.env.PORT || 4001;

const app = express();
// app.use(cors());
const httpServer = http.createServer(app);
const io = socket(httpServer);

let ledState = false;
const EVENTS = {
  LED_STATE_CHANGE: "ledState",
};

io.on("connection", (socket) => {
  console.log(`new connection: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnected: ${socket.id}`);
  });

  io.to(socket.id).emit(EVENTS.LED_STATE_CHANGE, ledState);

  socket.on(EVENTS.LED_STATE_CHANGE, (value) => {
    ledState = value;
    socket.broadcast.emit(EVENTS.LED_STATE_CHANGE, value);
    console.log(ledState);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
