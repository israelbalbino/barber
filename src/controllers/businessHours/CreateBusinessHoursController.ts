import { Request, Response } from "express";
import { CreateBusinessHoursService } from "../../services/businesHours/CreateBusinesHoursService";

class CreateBusinessHoursController {
    async handle(req: Request, res: Response) {
        const { data } = req.body;
      
        const user_id = req.user_id;
      
        const createBusinessHoursService =
          new CreateBusinessHoursService();
      
        const businessHours =
          await createBusinessHoursService.execute({
            user_id,
            data,
          });
      
        return res.json(businessHours);
      }
}

export { CreateBusinessHoursController };