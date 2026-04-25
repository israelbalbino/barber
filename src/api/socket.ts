// /pages/api/socket.ts

import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    res.socket.server.io = io;
    console.log("🔥 Socket rodando");
  }

  res.end();
}