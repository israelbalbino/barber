import { Request, Response } from "express";
import { ResetPasswordService } from "../../services/user/ResetPasswordService";

class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { token, password } = req.body;

    const service = new ResetPasswordService();

    const result = await service.execute({ token, password });

    return res.json(result);
  }
}

export { ResetPasswordController };