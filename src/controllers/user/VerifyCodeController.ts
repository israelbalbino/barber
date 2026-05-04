import { VerifyCodeService } from "../../services/user/VerifyCodeService";
import { Request, Response } from "express";

class VerifyCodeController {
    async handle(req: Request, res: Response) {
        
      const { email, token } = req.body;
  
      const service = new VerifyCodeService();
  
      const result = await service.execute({ email, token });
  
      return res.json(result);
    }
  }

  export { VerifyCodeController }