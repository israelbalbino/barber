import { Request, Response } from "express";
import { CreateHaircutService } from "../../services/haircut/CreateHaircutService";

class CreateHaircutController{
    async handle(request:Request, response:Response){

        const {name, price} = request.body;

        const user_id = request.user_id;

        console.log({
            user_id: request.user_id,
            headers: request.headers.authorization,
          });

        const createHaircut = new CreateHaircutService;

        const haircut = await createHaircut.execute({
            user_id,
            name,
            price
        })

        return response.json(haircut);

    }
}

export { CreateHaircutController }