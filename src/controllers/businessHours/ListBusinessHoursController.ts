import { Request, Response } from "express";
import { ListBusinessHoursService } from "../../services/businesHours/ListBusinessHoursService";

class ListBusinessHoursController {
  async handle(req: Request, res: Response) {
    const barber_id = req.query.barber_id as string;

    const service =
      new ListBusinessHoursService();

    const result = await service.execute({
      barber_id,
    });

    return res.json(result);
  }
}

export { ListBusinessHoursController };