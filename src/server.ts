import express,{Request, Response,NextFunction} from 'express';
import 'dotenv/config';
import cors from 'cors';
import {router} from './routes';
import http from "http";
import { Server as IOServer } from "socket.io";

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

const serverHttp = http.createServer(app);

const io = new IOServer(serverHttp, {
  cors: {
    origin: "*"
  }
});

// 🔥 injeta o io no app
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

serverHttp.listen(3333, () => {
    console.log('Server is running on port 3333');
});