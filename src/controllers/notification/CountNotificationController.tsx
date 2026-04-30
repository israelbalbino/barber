import { Request, Response } from "express";
import { CountNotificationService } from "../../services/notification/CountNotificationService";

class CountNotificationController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const read = false;

    const service = new CountNotificationService();

    const result = await service.execute({user_id, read});

    return res.json(result);
  }
}

export { CountNotificationController };