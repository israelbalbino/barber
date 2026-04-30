import { Request, Response } from "express";
import { ListNotificationService } from "../../services/notification/NotificationService";

class ListNotificationController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const service = new ListNotificationService();

    const result = await service.execute({user_id});

    return res.json(result);
  }
}

export { ListNotificationController };