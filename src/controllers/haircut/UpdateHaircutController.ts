import { Request, Response } from "express";
import { UpdateHaircut } from "../../services/haircut/UpdateHaircutService";

class UpdateHaircutController{
    async handle(request:Request, response: Response){

        const user_id = request.user_id;

        const {haircut_id, status, name, price} = request.body;

        const updateHaircut = new UpdateHaircut;

        const haircut = await updateHaircut.execute({
            haircut_id,
            user_id,
            status,
            name,
            price
        })

        return response.json(haircut);

    }
}

export { UpdateHaircutController }