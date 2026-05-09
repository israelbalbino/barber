// controllers/dashboard/GetWeeklyRevenueController.ts

import { Request, Response } from "express";
import { DadosGraficService } from "../../services/shedule/DadosGraficService";

class DadosController {
  async handle(req: Request, res: Response) {

    const user_id = req.user_id;

    const service = new DadosGraficService();

    const revenues = await service.execute({
      user_id,
    });

    return res.json(revenues);
  }
}

export { DadosController };