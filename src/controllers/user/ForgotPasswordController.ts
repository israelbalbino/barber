import { Request, Response } from "express";
import { ForgotPasswordService } from "../../services/user/ForgotPasswordService";

class ForgotPasswordController {
  async handle(req: Request, res: Response) {
    const {email}  = req.body;

    console.log("EMAIL RECEBIDO:", email);
    console.log("TIPO:", typeof email);

    const service = new ForgotPasswordService();

    const result = await service.execute({ email:email });

    return res.json(result);
  }
}

export { ForgotPasswordController };