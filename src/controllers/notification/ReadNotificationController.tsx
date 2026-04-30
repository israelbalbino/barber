import { Request, Response } from "express";
import { ReadNotificationService } from "../../services/notification/ReadNotificationService";

class ReadNotificationController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const service = new ReadNotificationService();

    const result = await service.execute(id);

    return res.json(result);
  }
}

export { ReadNotificationController };