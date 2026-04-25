import { Request, Response } from "express";
import { DetailsUserService } from "../../services/user/DetailsUserService";

class DetailsUserController{

    async handle(request: Request, response:Response){

        const user_id = request.user_id;

        const detailsUserService = new DetailsUserService()

        const detailsUser = await detailsUserService.execute(user_id)

        return response.json(detailsUser)
    }
}

export { DetailsUserController }