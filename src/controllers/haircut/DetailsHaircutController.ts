import { Request, Response } from "express";
import { DetailsHaircutsService } from "../../services/haircut/DetailsHaircutsService";

class DetailsHaircutsController{
    async handle(request: Request, response:Response){

        const haircut_id = request.query.haircut_id as string;
        
        const DetailsService = new DetailsHaircutsService;

        const details = await DetailsService.execute({haircut_id})

        return response.json(details)

    }
}

export { DetailsHaircutsController }