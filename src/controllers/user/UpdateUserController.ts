import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";


class UpdateUserController{
    async handle(request:Request, response:Response){

        const { name, endereco, avatar, delete_avatar_url } = request.body;

        const user_id = request.user_id;

        const updateUserService = new UpdateUserService;

        const UserService = await updateUserService.execute({
            user_id,
            name,
            endereco,
            avatar,
            delete_avatar_url
        })

        console.log(user_id)

        return response.json(UserService);



    }
}

export { UpdateUserController }