import { Request, Response } from "express";
import { ListClientService } from "../../services/haircut/listClienteService";


class ListClientController{
    async handle(request:Request, response:Response){

        const status = request.query.status as string;
        const user_id = request.query.user_id as string;

        const listhaircut = new ListClientService;

        const haircuts = await listhaircut.execute({
            user_id,
            status
        })

        return response.json(haircuts)

    }
}

export { ListClientController }