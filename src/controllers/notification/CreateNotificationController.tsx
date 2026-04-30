import { Request, Response } from "express";
import { CreateNotificationService } from "../../services/notification/CreateNotificationService";
import { Server as IOServer } from "socket.io";

class CreateNotificationController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id, title, message } = req.body;

      const service = new CreateNotificationService();

      const notification = await service.execute({
        user_id,
        title,
        message,
      });

      // 🔥 dispara atualização em tempo real
      const io = req.app.get("io");

      io.emit("nova_notification", notification);


      return res.json(notification);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export { CreateNotificationController };