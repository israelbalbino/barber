import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import cors from "cors";
import { router } from "./routes";
import http from "http";
import { Server as IOServer } from "socket.io";

const app = express();

const serverHttp = http.createServer(app);

// 🔥 CORS EXPRESS
app.use(
  cors({
    origin: [
      "https://app.arabarber.pro",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use(router);

// 🔥 SOCKET.IO
const io = new IOServer(serverHttp, {
  cors: {
    origin: [
      "https://app.arabarber.pro",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },

  transports: ["websocket", "polling"],
});

// 🔥 injeta io
app.set("io", io);

// 🔥 conexão socket
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado:", socket.id);
  });
});

// 🔥 tratamento de erro
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

// 🔥 start server
serverHttp.listen(3333, () => {
  console.log("🚀 Server running on port 3333");
});