import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 4001;

const app = express();
// app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://master--dainty-mooncake-d761cb.netlify.app",
  },
});

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
