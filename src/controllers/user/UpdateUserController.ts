import { Request, Response } from "express";
import { UpdateUserServide } from "../../services/user/UpdateUserService";


class UpdateUserController{
    async handle(request:Request, response:Response){

        const { name, endereco } = request.body;

        const user_id = request.user_id;

        const updateUserService = new UpdateUserServide;

        const UserService = await updateUserService.execute({
            user_id,
            name,endereco
        })

        return response.json(UserService);



    }
}

export { UpdateUserController }