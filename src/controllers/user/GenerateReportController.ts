import { Request, Response } from "express";
import { GenerateReportService } from "../../services/user/GenerateReportService";

class GenerateReportController {
  async handle(req: Request, res: Response) {

    const user_id = req.user_id; // vem do middleware
    const { datainicial, datafinal } = req.query;

    const service = new GenerateReportService();

    const pdfBuffer = await service.execute({
      user_id,
      datainicial: String(datainicial),
      datafinal: String(datafinal),
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=relatorio.pdf");

    return res.send(pdfBuffer);
  }
}

export { GenerateReportController };