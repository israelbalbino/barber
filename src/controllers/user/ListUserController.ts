import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUserService";

class ListUserController{
    async handle(request:Request, response:Response){

        const user_id = request.user_id;

        const listUser = new ListUserService;

        const list =  await listUser.execute({
            user_id
        })

        return response.json(list);

    }
}

export { ListUserController }