import { Request, Response } from "express";
import { ListHaircutsService } from "../../services/haircut/ListHaircutService";

class ListHaircutsController {
  async handle(req: Request, res: Response) {
    try {
      const { status, page = "1", limit = "4" } = req.query;
      const user_id = req.user_id;

      console.log("caui",{
        status,
        page,
        limit,
        user_id: req.user_id,
      });

      const parseBoolean = (value: any) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return undefined;
      };

      // 🔥 parse correto
      const statusParsed = parseBoolean(status);
      const listHaircutsService = new ListHaircutsService();

      const result = await listHaircutsService.execute({
        user_id,
        status: statusParsed, // ✅ aqui é variável, não função
        page: Number(page),
        limit: Number(limit),
      });

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Erro ao listar cortes",
      });
    }
  }
}

export {ListHaircutsController}